/**
 * @fileoverview Utility for executing npm commands.
 * @author Ian VanSchooten
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import fs from 'node:fs'
import spawn from 'cross-spawn'
import path from 'node:path'
import process from 'node:process'
import console from 'node:console'

// ------------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------------

interface PackageNameParsed {
    name: string
    version: string
}

interface CheckOptions {
    dependencies?: boolean
    devDependencies?: boolean
    startDir?: string
}

interface PackageJson {
    name?: string
    version?: string
    type?: 'module' | 'commonjs'
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    [key: string]: any
}

interface SpawnError extends Error {
    code?: string
}

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Find the closest package.json file, starting at process.cwd (by default),
 * and working up to root.
 * @param startDir Starting directory
 * @returns Absolute path to closest package.json file
 */
function findPackageJson(startDir?: string): string | null {
    let dir = path.resolve(startDir || process.cwd())

    do {
        const pkgFile = path.join(dir, 'package.json')

        if (!fs.existsSync(pkgFile) || !fs.statSync(pkgFile).isFile()) {
            dir = path.join(dir, '..')
            continue
        }
        return pkgFile
    } while (dir !== path.resolve(dir, '..'))
    return null
}

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/**
 * Install node modules synchronously and save to devDependencies in package.json
 * @param packages Node module or modules to install
 * @param packageManager Package manager to use for installation.
 * @param cwd Current working directory for installation
 * @param installFlags Flags to pass to the package manager.
 * @returns void
 */
function installSyncSaveDev(
    packages: string | string[],
    packageManager = 'npm',
    cwd?: string,
    installFlags: string[] = ['-D']
): void {
    const packageList = Array.isArray(packages) ? packages : [packages]
    const installCmd = packageManager === 'yarn' ? 'add' : 'install'
    const installProcess = spawn.sync(
        packageManager,
        [installCmd, ...installFlags].concat(packageList),
        { stdio: 'inherit', cwd }
    )
    const error = installProcess.error as SpawnError

    if (error && error.code === 'ENOENT') {
        const pluralS = packageList.length > 1 ? 's' : ''

        console.error(`Could not execute ${packageManager}. Please install the following package${pluralS} with a package manager of your choice: ${packageList.join(', ')}`)
    }
}

/**
 * Parses a package name string into its name and version components.
 * @param packageName The package name to parse.
 * @returns An object with 'name' and 'version' properties.
 */
function parsePackageName(packageName: string): PackageNameParsed {
    const atIndex = packageName.lastIndexOf('@')

    if (atIndex > 0) {
        const name = packageName.slice(0, atIndex)
        const version = packageName.slice(atIndex + 1) || 'latest'

        return { name, version }
    }
    return { name: packageName, version: 'latest' }
}

/**
 * Fetch `peerDependencies` of the given package by `npm show` command.
 * @param packageName The package name to fetch peerDependencies.
 * @returns Gotten peerDependencies. Returns null if npm was not found.
 */
async function fetchPeerDependencies(packageName: string): Promise<string[] | null> {
    const npmProcess = spawn.sync(
        'npm',
        ['show', '--json', packageName, 'peerDependencies'],
        { encoding: 'utf8' }
    )

    const error = npmProcess.error as SpawnError

    if (error && error.code === 'ENOENT') {
        // Fallback to using the npm registry API directly when npm is not available.
        const { name, version } = parsePackageName(packageName)

        try {
            // Fetch package data from npm registry
            const response = await globalThis.fetch(`https://registry.npmjs.org/${name}`)
            const data = await response.json()

            const resolvedVersion =
                version === 'latest' ? data['dist-tags']?.latest : version
            const packageVersion = data.versions[resolvedVersion]

            if (!packageVersion) {
                throw new Error(
                    `Version "${version}" not found for package "${name}".`
                )
            }
            return Object.entries(packageVersion.peerDependencies || {}).map(
                ([pkgName, pkgVersion]) => `${pkgName}@${pkgVersion}`
            )
        } catch {
            // TODO: should throw an error instead of returning null
            return null
        }
    }

    const fetchedText = npmProcess.stdout?.trim() || ''
    const peers = JSON.parse(fetchedText || '{}')
    const dependencies: string[] = []

    Object.keys(peers).forEach(pkgName => {
        dependencies.push(`${pkgName}@${peers[pkgName]}`)
    })

    return dependencies
}

/**
 * Check whether node modules are include in a project's package.json.
 * @param packages Array of node module names
 * @param opt Options Object
 * @throws {Error} If cannot find valid `package.json` file.
 * @returns An object whose keys are the module names and values are booleans indicating installation.
 */
function check(packages: string[], opt?: CheckOptions): Record<string, boolean> {
    const deps = new Set<string>()
    const pkgJson = opt?.startDir ? findPackageJson(opt.startDir) : findPackageJson()

    if (!pkgJson) {
        throw new Error("Could not find a package.json file. Run 'npm init' to create one.")
    }

    const fileJson: PackageJson = JSON.parse(fs.readFileSync(pkgJson, 'utf8'))

        ; (['dependencies', 'devDependencies'] as const).forEach(key => {
            if (opt?.[key] && typeof fileJson[key] === 'object') {
                Object.keys(fileJson[key] || {}).forEach(dep => deps.add(dep))
            }
        })

    return packages.reduce((status: Record<string, boolean>, pkg) => {
        status[pkg] = deps.has(pkg)
        return status
    }, {})
}

/**
 * Check whether node modules are included in the dependencies of a project's
 * package.json.
 *
 * Convenience wrapper around check().
 * @param packages Array of node modules to check.
 * @param rootDir The directory containing a package.json
 * @returns An object whose keys are the module names and values are booleans indicating installation.
 */
function checkDeps(packages: string[], rootDir?: string): Record<string, boolean> {
    return check(packages, { dependencies: true, startDir: rootDir })
}

/**
 * Check whether node modules are included in the devDependencies of a project's
 * package.json.
 *
 * Convenience wrapper around check().
 * @param packages Array of node modules to check.
 * @returns An object whose keys are the module names and values are booleans indicating installation.
 */
function checkDevDeps(packages: string[]): Record<string, boolean> {
    return check(packages, { devDependencies: true })
}

/**
 * Check whether package.json is found in current path.
 * @param startDir Starting directory
 * @returns Whether a package.json is found in current path.
 */
function checkPackageJson(startDir?: string): boolean {
    return !!findPackageJson(startDir)
}

/**
 * check if the package.type === "module"
 * @param pkgJSONPath path to package.json
 * @returns return true if the package.type === "module"
 */
function isPackageTypeModule(pkgJSONPath?: string): boolean {
    if (pkgJSONPath) {
        const pkgJSONContents: PackageJson = JSON.parse(fs.readFileSync(pkgJSONPath, 'utf8'))

        if (pkgJSONContents.type === 'module') {
            return true
        }
    }

    return false
}

/**
 * Reads the content of a file at the specified path and returns it as a string.
 * @param filePath The path to the file to be read.
 */
export function getPkgs(filePath: fs.PathOrFileDescriptor): PackageJson {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

// ------------------------------------------------------------------------------
// Public Interface
// ------------------------------------------------------------------------------

export {
    installSyncSaveDev,
    parsePackageName,
    fetchPeerDependencies,
    findPackageJson,
    checkDeps,
    checkDevDeps,
    checkPackageJson,
    isPackageTypeModule
}

export type {
    PackageNameParsed,
    CheckOptions,
    PackageJson
}

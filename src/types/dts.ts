export type TypeProject = 'npmjs' | 'monorepo'

export enum TypeInstall {
    npm = 'npm',
    yarn = 'yarn',
    pnpm = 'pnpm',
    bun = 'bun'
}

export interface Answers {
    projectType: TypeProject
    projectName: string
    projectInstall: boolean
    projectPackageManager: keyof typeof TypeInstall;
}

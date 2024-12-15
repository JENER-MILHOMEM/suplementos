export type MutationRes = {
    message: string
    status: 'ok' | 'error'
    error?: unknown
}
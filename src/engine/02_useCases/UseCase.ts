export interface UseCaseExecutionResult {
    success: boolean,
    message: string
}

export abstract class UseCase {
    public abstract execute(args?: any): UseCaseExecutionResult
}
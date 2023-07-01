export enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export interface ITasks {
    id: string,
    title: string,
    description: string,
    status: string
}
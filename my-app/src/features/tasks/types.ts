export interface ITask {
    id: string
    text: string
    status: string
    date: string
}

export interface IState {
    list: ITask[]
}

export type InputTask = Omit<ITask, 'id'>
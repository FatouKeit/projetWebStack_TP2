export interface QuestionData {
    id: string
    content: string
    author: string

    votes: number
}

export interface PublicEvent {
    id: string
    title: string
    questions: QuestionData[]
}

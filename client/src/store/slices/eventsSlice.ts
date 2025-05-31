import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Question {
    id: string
    content: string
    author: string
    votes: number
}

export interface Event {
    id: string
    title: string
    questions: Question[]
}

interface EventsState {
    events: Event[]
    currentEvent: Event | null
    currentQuestion: Question | null
}

const initialState: EventsState = {
    events: [],
    currentEvent: null,
    currentQuestion: null,
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setCurrentEvent: {
            reducer: (state, action: PayloadAction<Event>) => {
                state.currentEvent = action.payload
            },
            prepare: (event: Event) => ({
                payload: event,
                meta: { remote: false },
            }),
        },

        setCurrentQuestion: {
            reducer: (state, action: PayloadAction<Question | null>) => {
                state.currentQuestion = action.payload
            },
            prepare: (question: Question | null) => ({
                payload: question,
                meta: { remote: false },
            }),
        },

        createQuestion: {
            reducer: (
                state,
                action: PayloadAction<{ eventId: string; question: Question }>
            ) => {
                const event = state.events.find(
                    (e) => e.id === action.payload.eventId
                )
                if (event) {
                    event.questions.push(action.payload.question)
                }
            },
            prepare: (payload: { eventId: string; question: Question }) => ({
                payload,
                meta: { remote: false },
            }),
        },

        upvoteQuestion: {
            reducer: (
                state,
                action: PayloadAction<{ eventId: string; questionId: string }>
            ) => {
                const event = state.events.find(
                    (e) => e.id === action.payload.eventId
                )
                if (!event) return

                const question = event.questions.find(
                    (q) => q.id === action.payload.questionId
                )
                if (question) {
                    question.votes += 1
                }
            },
            prepare: (payload: { eventId: string; questionId: string }) => ({
                payload,
                meta: { remote: false },
            }),
        },

        deleteQuestion: {
            reducer: (
                state,
                action: PayloadAction<{ eventId: string; questionId: string }>
            ) => {
                const { eventId, questionId } = action.payload
                const event = state.events.find((e) => e.id === eventId)
                if (event) {
                    event.questions = event.questions.filter(
                        (q) => q.id !== questionId
                    )
                }

                if (
                    state.currentQuestion &&
                    state.currentQuestion.id === questionId
                ) {
                    state.currentQuestion = null
                }
            },
            prepare: (payload: { eventId: string; questionId: string }) => ({
                payload,
                meta: { remote: false },
            }),
        },

        setEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload
        },
    },
})

export const {
    setCurrentEvent,
    setCurrentQuestion,
    createQuestion,
    upvoteQuestion,
    deleteQuestion,
    setEvents,
} = eventsSlice.actions

export default eventsSlice.reducer

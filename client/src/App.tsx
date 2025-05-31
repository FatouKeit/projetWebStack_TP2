import './App.css'
//import { useState } from 'react'
import {
    Routes,
    Route,
    useParams,
    useNavigate,
    useLocation,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import AppToolbar from '@/components/AppToolbar'
import EventPanel from '@/components/EventPanel'
import QuestionList from '@/components/QuestionList'
import PageQuestionUnique from '@/components/PageQuestionUnique'
import WriteQuestion from '@/components/WriteQuestion'
import { MockEventLoader } from './components/MockEventLoader'

import {
    createQuestion,
    setCurrentEvent,
    setCurrentQuestion,
} from '@/store/slices/eventsSlice'
import type { RootState } from './store'
import { useIsMobile } from './hooks/useIsMobile'
import React, { useEffect } from 'react'

const EventPage: React.FC = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const isMobileDevice = useIsMobile()
    const isAdminRoute = location.pathname.includes('/admin')

    const [forceMobile, setForceMobile] = React.useState(false)

    const isMobile = isMobileDevice || forceMobile

    const { events, currentEvent, currentQuestion } = useSelector(
        (state: RootState) => state.events
    )
    const { questionId } = useParams<{ eventId: string; questionId?: string }>()

    const canDeleteQuestion = isAdminRoute && isMobile

    const deleteQuestion = (questionId: string) => {
        if (!eventId) return

        dispatch({
            type: 'events/deleteQuestion',
            payload: { eventId, questionId },
        })
    }

    useEffect(() => {
        if (eventId) {
            const foundEvent = events.find((e) => e.id === eventId)
            if (foundEvent) {
                dispatch(setCurrentEvent(foundEvent))
            }
        }

        if (questionId && eventId) {
            const foundEvent = events.find((e) => e.id === eventId)
            if (foundEvent) {
                const foundQuestion = foundEvent.questions.find(
                    (q) => q.id === questionId
                )
                if (foundQuestion) {
                    dispatch(setCurrentQuestion(foundQuestion))
                } else {
                    dispatch(setCurrentQuestion(null))
                }
            } else {
                dispatch(setCurrentQuestion(null))
            }
        } else {
            dispatch(setCurrentQuestion(null))
        }
    }, [eventId, questionId, events, dispatch])

    const handleEventChange = (id: string) => {
        const mode = location.pathname.includes('admin')
            ? 'admin'
            : 'participant'
        navigate(`/${mode}/event/${id}`)
    }

    const addQuestion = (content: string) => {
        if (!eventId) return
        const newQuestion = {
            id: uuidv4(),
            content,
            author: 'MobileUser',
            votes: 0,
        }
        dispatch(createQuestion({ eventId, question: newQuestion }))
    }
    const selectedEvent = events.find((e) => e.id === eventId)

    if (!selectedEvent) return <div>Événement introuvable</div>

    if (!currentEvent) return <div>Événement introuvable</div>

    return (
        <div
            className={`flex flex-col min-h-screen bg-gray-100 ${
                forceMobile
                    ? 'max-w-[420px] mx-auto border border-dashed border-gray-400'
                    : ''
            }`}
        >
            <AppToolbar
                events={events}
                onSelectEvent={handleEventChange}
                currentEvent={currentEvent}
                isMobile={isMobile}
                toggleMobile={() => setForceMobile((prev) => !prev)}
            />

            {isMobile && (
                <div className="mb-4">
                    <WriteQuestion onAdd={addQuestion} />
                </div>
            )}

            <main className="p-4 space-y-4">
                {currentQuestion ? (
                    <div className="bg-white p-4 rounded shadow-md border-l-4 border-blue-500">
                        <h2 className="font-bold">Question sélectionnée :</h2>
                        <p className="mt-2">{currentQuestion.content}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Auteur : {currentQuestion.author}
                        </p>
                    </div>
                ) : (
                    <QuestionList
                        eventId={selectedEvent.id}
                        isMobile={isMobile}
                        canDeleteQuestion={canDeleteQuestion}
                        onDeleteQuestion={deleteQuestion}
                    />
                )}

                <EventPanel eventId={currentEvent.id} />
            </main>
        </div>
    )
}

function App() {
    return (
        <>
            <MockEventLoader />
            <Routes>
                <Route path="/event/:eventId" element={<EventPage />} />
                <Route path="/admin/event/:eventId" element={<EventPage />} />
                <Route
                    path="/participant/event/:eventId"
                    element={<EventPage />}
                />
                <Route
                    path="/event/:eventId/question/:questionId"
                    element={<PageQuestionUnique />}
                />
            </Routes>
        </>
    )
}

export default App

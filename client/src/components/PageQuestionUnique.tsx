import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

const PageQuestionUnique: React.FC = () => {
    const { eventId, questionId } = useParams()
    const navigate = useNavigate()

    const selectedEvent = useSelector((state: RootState) =>
        state.events.events.find((e) => e.id === eventId)
    )

    if (!selectedEvent) return <div>Événement non trouvé</div>

    const questions = selectedEvent.questions
    const currentIndex = questions.findIndex((q) => q.id === questionId)
    const selectedQuestion = questions[currentIndex]

    if (!selectedQuestion) return <div>Question non trouvée</div>

    const goToPrev = () => {
        if (currentIndex > 0) {
            const prevId = questions[currentIndex - 1].id
            navigate(`/event/${eventId}/question/${prevId}`)
        }
    }

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            const nextId = questions[currentIndex + 1].id
            navigate(`/event/${eventId}/question/${nextId}`)
        }
    }

    return (
        <div className="text-center p-4">
            <h1 className="text-xl font-bold mb-4">{selectedEvent.title}</h1>
            <p className="text-lg">{selectedQuestion.content}</p>
            <p className="text-sm italic mt-2">Par {selectedQuestion.author}</p>

            <div className="flex justify-center items-center gap-6 mt-6 text-3xl">
                <span
                    onClick={goToPrev}
                    className={`cursor-pointer ${currentIndex === 0 ? 'opacity-30 pointer-events-none' : ''}`}
                >
                    ←
                </span>
                <span
                    onClick={goToNext}
                    className={`cursor-pointer ${currentIndex === questions.length - 1 ? 'opacity-30 pointer-events-none' : ''}`}
                >
                    →
                </span>
            </div>
        </div>
    )
}

export default PageQuestionUnique

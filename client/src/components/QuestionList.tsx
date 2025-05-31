import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import { upvoteQuestion } from '@/store/slices/eventsSlice'
import { FaThumbsUp, FaTrash } from 'react-icons/fa'

interface Props {
    eventId: string
    isMobile: boolean
    canDeleteQuestion?: boolean
    onDeleteQuestion?: (questionId: string) => void
}

const QuestionList: React.FC<Props> = ({
    eventId,
    isMobile,
    canDeleteQuestion = false,
    onDeleteQuestion,
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const event = useSelector((state: RootState) =>
        state.events.events.find((e) => e.id === eventId)
    )

    if (!event) return null

    const handleNameClick = (questionId: string) => {
        navigate(`/event/${eventId}/question/${questionId}`)
    }

    const handleVoteClick = (questionId: string) => {
        dispatch(upvoteQuestion({ eventId, questionId }))
    }

    const handleDeleteClick = (questionId: string) => {
        if (onDeleteQuestion) {
            onDeleteQuestion(questionId)
        }
    }

    return (
        <div className="space-y-3">
            {event.questions.map((q) => (
                <div
                    key={q.id}
                    className="bg-white shadow rounded p-4 flex flex-col"
                >
                    <p className="text-xs text-gray-500 mb-1">{q.author}</p>

                    <div className="flex justify-between items-center">
                        <p
                            onClick={() => handleNameClick(q.id)}
                            className="cursor-pointer font-medium text-base hover:underline"
                        >
                            {q.content}
                        </p>

                        <div className="flex items-center gap-3">
                            {isMobile ? (
                                <button
                                    onClick={() => handleVoteClick(q.id)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                    aria-label={`Voter pour la question: ${q.content}`}
                                >
                                    <FaThumbsUp />
                                    <span>{q.votes}</span>
                                </button>
                            ) : (
                                <div className="flex items-center gap-1 text-gray-400">
                                    <FaThumbsUp />
                                    <span>{q.votes}</span>
                                </div>
                            )}

                            {canDeleteQuestion && (
                                <button
                                    onClick={() => handleDeleteClick(q.id)}
                                    className="text-red-600 hover:text-red-800"
                                    aria-label={`Supprimer la question: ${q.content}`}
                                    title="Supprimer la question"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionList

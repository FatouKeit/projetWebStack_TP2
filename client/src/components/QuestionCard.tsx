import React from 'react'
import type { QuestionData } from '../models'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'
import { upvoteQuestion } from '../store/slices/eventsSlice'

interface Props {
    question: QuestionData
    eventId: string
}

const QuestionCard: React.FC<Props> = ({ question, eventId }) => {
    const dispatch = useDispatch<AppDispatch>()

    const handleUpvote = () => {
        dispatch(upvoteQuestion({ eventId, questionId: question.id }))
    }

    return (
        <div className="p-4 mb-4 rounded shadow">
            <div className="text-sm font-semibold mb-1 text-white">
                {question.author}
            </div>
            <div className="text-white">{question.content}</div>
            <button
                onClick={handleUpvote}
                className="mt-2 px-3 py-1 bg-white text-black text-sm rounded hover:bg-gray-200"
            >
                👍 {question.votes}
            </button>
        </div>
    )
}

export default QuestionCard

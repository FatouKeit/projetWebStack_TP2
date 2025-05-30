import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

interface Props {
    eventId: string
}

const EventPanel: React.FC<Props> = ({ eventId }) => {
    const questions = useSelector(
        (state: RootState) =>
            state.events.events.find((e) => e.id === eventId)?.questions || []
    )

    const remainingQuestions = questions.slice(10)

    return (
        <div className="rounded shadow p-4 bg-white">
            <h2 className="text-lg font-semibold mb-4">Autres Questions</h2>
            <ul className="space-y-2">
                {remainingQuestions.map((q) => (
                    <li key={q.id} className="border p-2 rounded">
                        <div className="font-bold">{q.author}</div>
                        <div>{q.content}</div>
                        <div className="text-gray-500 text-xs">
                            Votes: {q.votes}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EventPanel

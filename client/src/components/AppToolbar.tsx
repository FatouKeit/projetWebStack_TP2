import React from 'react'
import type { PublicEvent } from '../models'
import { FaMobileAlt, FaDesktop } from 'react-icons/fa'

interface Props {
    events: PublicEvent[]
    onSelectEvent: (id: string) => void
    currentEvent: PublicEvent
    isMobile: boolean
    toggleMobile: () => void
}

const AppToolbar: React.FC<Props> = ({
    events,
    onSelectEvent,
    currentEvent,
    isMobile,
    toggleMobile,
}) => {
    return (
        <div className="flex justify-between items-center p-4 bg-cyan-600 text-white">
            <div className="text-lg font-semibold">
                Top questions ({currentEvent.questions.length})
            </div>

            <div className="flex items-center gap-4">
                <select
                    className="bg-cyan-700 text-white rounded px-2 py-1"
                    value={currentEvent.id}
                    onChange={(e) => onSelectEvent(e.target.value)}
                >
                    {events.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.title}
                        </option>
                    ))}
                </select>

                <button onClick={toggleMobile} className="text-black text-xl">
                    {isMobile ? (
                        <FaDesktop title="Passer en mode bureau" />
                    ) : (
                        <FaMobileAlt title="Passer en mode mobile" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default AppToolbar

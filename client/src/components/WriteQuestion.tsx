import React, { useState } from 'react'

interface WriteQuestionProps {
    onAdd: (questionContent: string) => void
}

const WriteQuestion: React.FC<WriteQuestionProps> = ({ onAdd }) => {
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() === '') return
        onAdd(input.trim())
        setInput('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                padding: 10,
                border: '1px solid gray',
                borderRadius: 4,
                backgroundColor: 'white',
            }}
        >
            <h3>Écrire une nouvelle question</h3>
            <textarea
                placeholder="Tape ta question ici..."
                rows={1}
                style={{ width: '100%', padding: 5, fontSize: 15 }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                style={{ fontSize: 14, cursor: 'pointer', marginTop: 8 }}
            >
                Publier
            </button>
        </form>
    )
}

export default WriteQuestion

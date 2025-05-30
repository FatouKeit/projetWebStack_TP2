import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setEvents } from '../store/slices/eventsSlice'

export const MockEventLoader = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            setEvents([
                {
                    id: '1',
                    title: 'Événement Test',
                    questions: [
                        {
                            id: 'q1',
                            content: 'Quelle est la date de l’événement ?',
                            author: 'Alice',
                            votes: 3,
                        },
                        {
                            id: 'q2',
                            content: 'Est-ce que le replay sera disponible ?',
                            author: 'Bob',
                            votes: 11,
                        },
                    ],
                },

                {
                    id: '2',
                    title: 'Autre Événement',
                    questions: [
                        {
                            id: 'q1',
                            content:
                                'Quels sont les avantages et inconvénients de cette méthode ?',
                            author: 'Fatou',
                            votes: 2,
                        },
                        {
                            id: 'q2',
                            content:
                                'Quelle a été votre plus grande réussite dans ce domaine ?',
                            author: 'Amina',
                            votes: 6,
                        },
                        {
                            id: 'q3',
                            content:
                                'Comment voyez-vous l’évolution de ce secteur ?',
                            author: 'Baba',
                            votes: 1,
                        },
                    ],
                },
            ])
        )
    }, [dispatch])

    return null
}

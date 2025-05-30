import type { PublicEvent } from '../models'

export const eventsMock: PublicEvent[] = [
    {
        id: '1',
        title: 'Événement A',
        questions: [
            {
                id: 'q1',
                content:
                    'Avez-vous déjà rencontré cette situation dans votre expérience ?',
                author: 'Amina',
                votes: 3,
            },
            {
                id: 'q2',
                content:
                    'Quelles sont, selon vous, les principales difficultés ?',
                author: 'Fatou',
                votes: 6,
            },
        ],
    },
    {
        id: '2',
        title: 'Événement B',
        questions: [
            {
                id: 'q1',
                content:
                    'Quels sont les avantages et inconvénients de cette méthode ?',
                author: 'Ali',
                votes: 10,
            },
        ],
    },
]

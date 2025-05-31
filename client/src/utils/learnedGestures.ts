export type Gesture = {
    name: string
    points: Array<[number, number]>
}

export const learnedGestures: Gesture[] = [
    {
        name: 'Chevron Gauche', // <
        points: [
            [0.8, 0.1],
            [0.4, 0.5],
            [0.8, 0.9],
        ],
    },
    {
        name: 'Chevron Droit', // >
        points: [
            [0.2, 0.1],
            [0.6, 0.5],
            [0.2, 0.9],
        ],
    },
    {
        name: 'Ligne horizontale',
        points: [
            [0.1, 0.5],
            [0.2, 0.5],
            [0.3, 0.5],
            [0.4, 0.5],
            [0.5, 0.5],
            [0.6, 0.5],
            [0.7, 0.5],
            [0.8, 0.5],
            [0.9, 0.5],
        ],
    },
    {
        name: 'Ligne verticale',
        points: [
            [0.5, 0.1],
            [0.5, 0.2],
            [0.5, 0.3],
            [0.5, 0.4],
            [0.5, 0.5],
            [0.5, 0.6],
            [0.5, 0.7],
            [0.5, 0.8],
            [0.5, 0.9],
        ],
    },
]

import { learnedGestures } from './learnedGestures'

type Point = [number, number]

function resample(points: Point[], n: number): Point[] {
    const totalLength = points.reduce((acc, _, i) => {
        if (i === 0) return acc
        const dx = points[i][0] - points[i - 1][0]
        const dy = points[i][1] - points[i - 1][1]
        return acc + Math.sqrt(dx * dx + dy * dy)
    }, 0)

    const interval = totalLength / (n - 1)
    const newPoints: Point[] = [points[0]]
    let d = 0

    for (let i = 1; i < points.length; i++) {
        const [x1, y1] = points[i - 1]
        const [x2, y2] = points[i]
        const dx = x2 - x1
        const dy = y2 - y1
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (d + dist >= interval) {
            const t = (interval - d) / dist
            const newX = x1 + t * dx
            const newY = y1 + t * dy
            newPoints.push([newX, newY])
            points.splice(i, 0, [newX, newY])
            d = 0
        } else {
            d += dist
        }
    }

    while (newPoints.length < n) {
        newPoints.push(points[points.length - 1])
    }

    return newPoints
}

export function recognizeGesture(clickX: number[], clickY: number[]): string {
    if (clickX.length === 0 || clickY.length === 0) {
        return 'Forme non reconnue'
    }

    // Normalisation entre 0 et 1
    const minX = Math.min(...clickX)
    const maxX = Math.max(...clickX)
    const minY = Math.min(...clickY)
    const maxY = Math.max(...clickY)

    const rawPoints: Point[] = clickX.map((x, i) => [
        (x - minX) / (maxX - minX || 1),
        (clickY[i] - minY) / (maxY - minY || 1),
    ])

    const normPoints = resample(rawPoints, 32)

    let bestMatch = 'Forme non reconnue'
    let bestScore = Infinity

    for (const gesture of learnedGestures) {
        const modelPoints = resample(gesture.points, 32)

        let score = 0
        for (let i = 0; i < 32; i++) {
            const dx = normPoints[i][0] - modelPoints[i][0]
            const dy = normPoints[i][1] - modelPoints[i][1]
            score += dx * dx + dy * dy
        }

        if (score < bestScore) {
            bestScore = score
            bestMatch = gesture.name
        }
    }

    return bestMatch
}

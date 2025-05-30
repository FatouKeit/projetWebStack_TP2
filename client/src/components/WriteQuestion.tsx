import React, { useState, useRef, useEffect } from 'react'
import { recognizeGesture } from '../utils/recognizer' // 🔄 Assure-toi que le chemin est correct

interface WriteQuestionProps {
  onAdd: (questionContent: string) => void
}

const WriteQuestion: React.FC<WriteQuestionProps> = ({ onAdd }) => {
  const [input, setInput] = useState('')
  const [recognizedShape, setRecognizedShape] = useState<string | null>(null)
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  const clickX = useRef<number[]>([])
  const clickY = useRef<number[]>([])
  const clickDrag = useRef<boolean[]>([])
  const paint = useRef<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return
    onAdd(input.trim())
    setInput('')
  }

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const addClick = (x: number, y: number, dragging: boolean) => {
      clickX.current.push(x)
      clickY.current.push(y)
      clickDrag.current.push(dragging)
    }

    const redraw = () => {
      if (!canvas || !context) return

      const width = canvas.getBoundingClientRect().width
      const height = canvas.getBoundingClientRect().height

      canvas.width = width
      canvas.height = height
      context.clearRect(0, 0, width, height)
      context.strokeStyle = '#df4b26'
      context.lineJoin = 'round'
      context.lineWidth = 2

      for (let i = 0; i < clickX.current.length; i++) {
        context.beginPath()
        if (clickDrag.current[i] && i) {
          context.moveTo(clickX.current[i - 1] * width, clickY.current[i - 1] * height)
        } else {
          context.moveTo(clickX.current[i] * width - 1, clickY.current[i] * height)
        }
        context.lineTo(clickX.current[i] * width, clickY.current[i] * height)
        context.stroke()
      }
    }

    const pointerDownHandler = (ev: PointerEvent) => {
      if (ev.pointerType !== 'mouse' && ev.pointerType !== 'touch') return
      const rect = canvas.getBoundingClientRect()
      const mouseX = (ev.clientX - rect.left) / rect.width
      const mouseY = (ev.clientY - rect.top) / rect.height

      paint.current = true
      clickX.current = []
      clickY.current = []
      clickDrag.current = []
      addClick(mouseX, mouseY, false)
      redraw()
    }

    const pointerMoveHandler = (ev: PointerEvent) => {
      if (!paint.current || (ev.pointerType !== 'mouse' && ev.pointerType !== 'touch')) return
      const rect = canvas.getBoundingClientRect()
      const mouseX = (ev.clientX - rect.left) / rect.width
      const mouseY = (ev.clientY - rect.top) / rect.height

      addClick(mouseX, mouseY, true)
      redraw()
    }

    const pointerUpHandler = () => {
      paint.current = false
      const shape = recognizeGesture(clickX.current, clickY.current) // ✅ Appel de ta fonction externe
      setRecognizedShape(shape)
    }

    canvas.addEventListener('pointerdown', pointerDownHandler)
    canvas.addEventListener('pointermove', pointerMoveHandler)
    canvas.addEventListener('pointerup', pointerUpHandler)
    canvas.addEventListener('pointerleave', pointerUpHandler)

    return () => {
      canvas.removeEventListener('pointerdown', pointerDownHandler)
      canvas.removeEventListener('pointermove', pointerMoveHandler)
      canvas.removeEventListener('pointerup', pointerUpHandler)
      canvas.removeEventListener('pointerleave', pointerUpHandler)
    }
  }, [])

  return (
    <div>
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

      <canvas
        className="stroke"
        ref={refCanvas}
        style={{
          touchAction: 'none',
          marginTop: 20,
          width: '100%',
          height: 200,
          border: '1px solid #ccc',
        }}
      />

      <div style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>
        {recognizedShape && recognizedShape !== 'Forme non reconnue' && (
          <div>
            Forme reconnue : <strong>{recognizedShape}</strong>
          </div>
        )}

        {recognizedShape === 'Forme non reconnue' && (
          <div style={{ color: 'red' }}>
            Forme non reconnue, essaie encore !
          </div>
        )}
      </div>
    </div>
  )
}

export default WriteQuestion

import React, { useEffect, useRef, useState } from 'react'
import Piece from './Piece'

export interface Move {
  from: string
  to: string
  piece: string
  captured?: string
}

interface Props {
  initialFen: string
  /** Squares to highlight as the last move, e.g. ['f8', 'c5'] */
  lastMove?: [string, string]
  /** Any CSS colour, including var(--my-token) */
  lightSquareColor?: string
  darkSquareColor?: string
  highlightColor?: string
  onMove?: (move: Move) => void
}

interface BoardPiece {
  id: number
  char: string
  x: number
  y: number
}

interface Drag {
  id: number
  x: number
  y: number
  offsetX: number
  offsetY: number
}

const FILES = 'abcdefgh'
const EIGHT = Array.from({ length: 8 }, (_, i) => i)

function squareName(x: number, y: number) {
  return `${FILES[x]}${8 - y}`
}

function squareCoords(name: string): [number, number] | null {
  const x = FILES.indexOf(name[0])
  const rank = parseInt(name[1])
  if (x === -1 || !(rank >= 1 && rank <= 8)) return null
  return [x, 8 - rank]
}

function isWhite(char: string) {
  return char === char.toUpperCase()
}

function fen2pieces(fen: string): BoardPiece[] {
  const pieces: BoardPiece[] = []
  fen
    .split(' ')[0]
    .split('/')
    .forEach((row, y) => {
      let x = 0
      for (const char of row) {
        const empty = parseInt(char)
        if (isNaN(empty)) {
          pieces.push({ id: pieces.length, char, x, y })
          x++
        } else {
          x += empty
        }
      }
    })
  return pieces
}

export const ChessBoard = ({
  initialFen,
  lastMove: initialLastMove,
  lightSquareColor = '#f0d9b5',
  darkSquareColor = '#b58863',
  highlightColor = 'rgba(155, 199, 0, 0.41)',
  onMove
}: Props) => {
  const boardRef = useRef<SVGSVGElement>(null)
  const [pieces, setPieces] = useState(() => fen2pieces(initialFen))
  const [drag, setDrag] = useState<Drag | null>(null)
  const [lastMove, setLastMove] = useState<string[]>(initialLastMove || [])

  useEffect(() => {
    setPieces(fen2pieces(initialFen))
    setDrag(null)
  }, [initialFen])

  useEffect(() => {
    setLastMove(initialLastMove || [])
  }, [initialLastMove && initialLastMove.join()])

  // pointer position in board units (one square = 1)
  const boardPoint = (evt: React.PointerEvent) => {
    const svg = boardRef.current
    const ctm = svg && svg.getScreenCTM()
    if (!svg || !ctm) return { x: 0, y: 0 }
    const point = svg.createSVGPoint()
    point.x = evt.clientX
    point.y = evt.clientY
    const { x, y } = point.matrixTransform(ctm.inverse())
    return { x, y }
  }

  const startDrag = (piece: BoardPiece) => (evt: React.PointerEvent) => {
    if (evt.button !== 0) return
    evt.preventDefault()
    boardRef.current?.setPointerCapture(evt.pointerId)
    const { x, y } = boardPoint(evt)
    setDrag({
      id: piece.id,
      x: piece.x,
      y: piece.y,
      offsetX: x - piece.x,
      offsetY: y - piece.y
    })
  }

  const moveDrag = (evt: React.PointerEvent) => {
    if (!drag) return
    const { x, y } = boardPoint(evt)
    setDrag({ ...drag, x: x - drag.offsetX, y: y - drag.offsetY })
  }

  const endDrag = () => {
    if (!drag) return
    setDrag(null)
    const piece = pieces.find((p) => p.id === drag.id)
    if (!piece) return
    // the square under the middle of the piece
    const toX = Math.floor(drag.x + 0.5)
    const toY = Math.floor(drag.y + 0.5)
    if (toX < 0 || toX > 7 || toY < 0 || toY > 7) return
    if (toX === piece.x && toY === piece.y) return
    const target = pieces.find((p) => p.x === toX && p.y === toY)
    if (target && isWhite(target.char) === isWhite(piece.char)) return

    setPieces(
      pieces
        .filter((p) => p !== target)
        .map((p) => (p === piece ? { ...p, x: toX, y: toY } : p))
    )
    const move: Move = {
      from: squareName(piece.x, piece.y),
      to: squareName(toX, toY),
      piece: piece.char
    }
    if (target) move.captured = target.char
    setLastMove([move.from, move.to])
    if (onMove) onMove(move)
  }

  // the dragged piece is drawn last so it stays on top
  const ordered = drag
    ? [
        ...pieces.filter((p) => p.id !== drag.id),
        ...pieces.filter((p) => p.id === drag.id)
      ]
    : pieces

  return (
    <svg
      viewBox='0 0 8 8'
      ref={boardRef}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={() => setDrag(null)}
      style={{ display: 'block', width: '100%', touchAction: 'none' }}
    >
      {EIGHT.map((x) =>
        EIGHT.map((y) => (
          <rect
            key={`${x}${y}`}
            x={x}
            y={y}
            width='1'
            height='1'
            shapeRendering='crispEdges'
            style={{
              fill: (x + y) % 2 === 0 ? lightSquareColor : darkSquareColor
            }}
          />
        ))
      )}
      {lastMove.map((name) => {
        const coords = squareCoords(name)
        return (
          coords && (
            <rect
              key={`last-${name}`}
              x={coords[0]}
              y={coords[1]}
              width='1'
              height='1'
              shapeRendering='crispEdges'
              style={{ fill: highlightColor }}
            />
          )
        )
      })}
      {ordered.map((piece) => {
        const dragged = drag !== null && drag.id === piece.id
        return (
          <Piece
            key={piece.id}
            pieceChar={piece.char}
            x={dragged && drag ? drag.x : piece.x}
            y={dragged && drag ? drag.y : piece.y}
            dragging={dragged}
            onPointerDown={startDrag(piece)}
          />
        )
      })}
    </svg>
  )
}

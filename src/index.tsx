import React, { useRef } from 'react'
import Piece from './Piece'
import useDraggable from './useDraggable'
import type { Coords } from './useDraggable'

interface Props {
  initialFen: string
  onMove: (from: string, to: string) => void
}

function coordsToUci({ x, y }: Coords) {
  x = Math.floor(x)
  y = Math.floor(y)
  const codeOfA = 'a'.charCodeAt(0)
  const resCode = codeOfA + x
  const result = `${String.fromCharCode(resCode)}${8 - y}`
  return result
}

function fen2array(fen: string): Array<string> {
  var result: Array<string> = []
  fen.split('/').forEach(function (row) {
    row.split('').forEach(function (char) {
      if (isNaN(parseInt(char))) {
        result.push(char)
      } else {
        var emptySquares = parseInt(char)
        for (var i = 0; i < emptySquares; i++) {
          result.push('')
        }
      }
    })
  })
  return result
}

export const ChessBoard = ({ initialFen, onMove }: Props) => {
  const fenPieces = initialFen.split(' ')[0]
  const boardArr = fen2array(fenPieces)
  const boardRef = useRef<any>()
  const { startDrag } = useDraggable({
    containerRef: boardRef,
    onDragEnd
  })

  function onDragEnd({ from, to }: { from: Coords; to: Coords }) {
    onMove(
      coordsToUci(from),
      coordsToUci({ x: Math.round(to.x), y: Math.round(to.y) })
    )
  }

  return (
    <svg viewBox='0 0 8 8' shapeRendering='crispEdges' ref={boardRef}>
      {[...Array(8).keys()].map((x) =>
        [...Array(8).keys()].map((y) => (
          <rect
            x={x}
            y={y}
            width='1'
            height='1'
            fill={(x + y) % 2 === 0 ? '#f0d9b5' : '#b58863'}
            key={`${x}${y}`}
          />
        ))
      )}
      {boardArr.map(
        (pieceChar, i) =>
          pieceChar && (
            <Piece
              pieceChar={pieceChar}
              x={i % 8}
              y={Math.floor(i / 8)}
              key={i}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            />
          )
      )}
    </svg>
  )
}

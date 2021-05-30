import React, { useRef, RefObject } from 'react'
import styles from './styles.module.css'
import Piece from './Piece'
import useDraggable from './useDraggable'

interface Props {
  initialFen: string
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

export const ChessBoard = ({ initialFen }: Props) => {
  console.log(initialFen)
  const fenPieces = initialFen.split(' ')[0]
  const boardArr = fen2array(fenPieces)
  const boardRef = useRef<any>()
  console.log(boardArr)
  const { startDrag, endDrag, drag } = useDraggable(boardRef)

  return (
    <svg
      viewBox='0 0 8 8'
      shapeRendering='crispEdges'
      onMouseMove={drag}
      onMouseUp={endDrag}
      ref={boardRef}
    >
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
            />
          )
      )}
    </svg>
  )
}

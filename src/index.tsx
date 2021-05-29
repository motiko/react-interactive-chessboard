import React from 'react'
import styles from './styles.module.css'
import Piece from './Piece'
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
  console.log(boardArr)
  return (
    <div className={styles.wrap}>
      <div className={styles.board}>
        {boardArr.map((pieceChar, i) => (
          <Piece pieceChar={pieceChar} key={i} />
        ))}
      </div>
    </div>
  )
}

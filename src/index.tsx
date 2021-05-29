import * as React from 'react'
import styles from './styles.module.css'
import BlackQ from './pieces/black/Q'
import BlackK from './pieces/black/K'
import BlackN from './pieces/black/N'
import BlackP from './pieces/black/P'
import BlackR from './pieces/black/R'
import BlackB from './pieces/black/B'

import WhiteB from './pieces/white/B'
import WhiteR from './pieces/white/R'
import WhiteP from './pieces/white/P'
import WhiteN from './pieces/white/N'
import WhiteK from './pieces/white/K'
import WhiteQ from './pieces/white/Q'

interface Props {
  fen: string
}

const charToSvg = {
  q: BlackQ,
  k: BlackK,
  n: BlackN,
  p: BlackP,
  r: BlackR,
  b: BlackB,
  Q: WhiteQ,
  K: WhiteK,
  N: WhiteN,
  P: WhiteP,
  R: WhiteR,
  B: WhiteB
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

function Piece({ pieceChar }: { pieceChar: string }) {
  const PieceSvg = charToSvg[pieceChar]
  if (!PieceSvg) return <span className={styles.cell} />
  return (
    <div className={styles.cell}>
      {' '}
      <div draggable style={{ width: '60%', height: '60%' }}>
        <PieceSvg style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}

export const ChessBoard = ({ fen }: Props) => {
  console.log(fen)
  const fenPieces = fen.split(' ')[0]
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

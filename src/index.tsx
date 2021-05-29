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

export const ChessBoard = ({ fen }: Props) => {
  console.log(fen)
  const fenPieces = fen.split(' ')[0]
  const piecesArr = fen2array(fenPieces)
  console.log(piecesArr)
  return (
    <div className={styles.wrap}>
      <div className={styles.board}>
        {piecesArr.map((piece, i) => (
          <span className={styles.cell} key={i}>
            {charToSvg[piece]?.()}
          </span>
        ))}
      </div>
    </div>
  )
}

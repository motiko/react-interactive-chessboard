import React from 'react'
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
import styles from './styles.module.css'

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

export default function Piece({ pieceChar }: { pieceChar: string }) {
  const PieceSvg = charToSvg[pieceChar]
  if (!PieceSvg) return null
  return (
    <div className={styles.cell}>
      {' '}
      <div style={{ width: '50%', height: '50%' }}>
        <WhiteP style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}

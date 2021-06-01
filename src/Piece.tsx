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

interface Props {
  pieceChar: string
  x: number
  y: number
  onMouseDown: (evt: Event) => void
  onTouchStart: (evt: Event) => void
}

export default function Piece({
  pieceChar,
  x,
  y,
  onMouseDown,
  onTouchStart
}: Props) {
  const PieceSvg = charToSvg[pieceChar]
  if (!PieceSvg) return null
  return (
    <PieceSvg
      x={x}
      y={y}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={styles.piece}
      viewBox='-2 -2 400 400'
      shapeRendering='crispEdges'
    />
  )
}

const transform = 'scale(0.015) translate(10 10)'
export { transform }

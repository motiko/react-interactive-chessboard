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
  onMouseDown: (Event) => void
}

export default function Piece({ pieceChar, x, y, onMouseDown }: Props) {
  const PieceSvg = charToSvg[pieceChar]
  if (!PieceSvg) return null
  return <PieceSvg x={x} y={y} onMouseDown={onMouseDown} />
}

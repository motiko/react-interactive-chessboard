import React from 'react'

import { ChessBoard } from 'react-interactive-chessboard'
import 'react-interactive-chessboard/dist/index.css'

const App = () => {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <ChessBoard fen={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}/>
    </div>
  )
}

export default App

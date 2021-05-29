import React from 'react'

import { ChessBoard } from 'react-interactive-chessboard'
import 'react-interactive-chessboard/dist/index.css'

const App = () => {
  return (
    <div style={{ width: '100vh', height: '100vh' }}>
      <ChessBoard
        initialFen={'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
      />
    </div>
  )
}

export default App

# react-interactive-chessboard

> Interactive chessboard for collaboration

[![NPM](https://img.shields.io/npm/v/@motiko/react-interactive-chessboard.svg)](https://www.npmjs.com/package/@motiko/react-interactive-chessboard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A chessboard drawn as a single SVG. Pieces can be dragged with a mouse, pen
or finger; dropping on an opponent's piece captures it, dropping on your own
piece or off the board puts the piece back. Moves are not checked against the
rules of chess, so it works for analysis and for setting up positions.

## Install

```bash
npm install --save @motiko/react-interactive-chessboard
```

## Usage

```tsx
import { ChessBoard } from '@motiko/react-interactive-chessboard'

const App = () => (
  <div style={{ width: 400 }}>
    <ChessBoard
      initialFen='r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4'
      lastMove={['f8', 'c5']}
      onMove={(move) => console.log(move)}
    />
  </div>
)
```

No stylesheet is needed. The board fills the width of its container.

## Props

| Prop               | Type                     | Default                    |                                                          |
| ------------------ | ------------------------ | -------------------------- | -------------------------------------------------------- |
| `initialFen`       | `string`                 | required                   | Position to show. Changing it resets the board.          |
| `lastMove`         | `[string, string]`       | none                       | Squares to highlight, e.g. `['e2', 'e4']`.               |
| `onMove`           | `(move: Move) => void`   | none                       | Called after every drop: `{ from, to, piece, captured? }` |
| `lightSquareColor` | `string`                 | `#f0d9b5`                  | Any CSS colour, including `var(--token)`.                |
| `darkSquareColor`  | `string`                 | `#b58863`                  | Any CSS colour, including `var(--token)`.                |
| `highlightColor`   | `string`                 | `rgba(155, 199, 0, 0.41)`  | Colour of the last-move squares.                         |

## License

MIT © [motiko](https://github.com/motiko)

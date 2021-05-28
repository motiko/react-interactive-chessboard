import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  fen: string
}

export const ChessBoard = ({ fen }: Props) => {
  console.log(fen)
  return (
    <div className={styles.wrap}>
      <div className={styles.board}>
        {[...Array(64).keys()].map((i) => (
          <span className={styles.cell} key={i + 1}>
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  )
}

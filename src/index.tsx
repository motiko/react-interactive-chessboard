import * as React from 'react'
import styles from './styles.module.css'

// interface Props {}

export const ChessBoard = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.board} />
    </div>
  )
}

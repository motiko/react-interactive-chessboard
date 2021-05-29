import React, { useRef, RefObject } from 'react'
import styles from './styles.module.css'
import Piece from './Piece'
interface Props {
  initialFen: string
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

export const ChessBoard = ({ initialFen }: Props) => {
  console.log(initialFen)
  const fenPieces = initialFen.split(' ')[0]
  const boardArr = fen2array(fenPieces)
  console.log(boardArr)
  const svgRef = useRef<any>()
  const boardRef = useRef<any>()
  const isDragged = useRef<any>()
  const dragOffset = useRef<any>()
  const draggedFrom = useRef<any>()

  function getMousePosition(evt) {
    if (boardRef.current) {
      var CTM = boardRef.current.getScreenCTM()
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      }
    }
    return { x: 0, y: 0 }
  }
  const startDrag = (evt) => {
    isDragged.current = true
    const { x, y } = getMousePosition(evt)
    // console.log(x, y)
    draggedFrom.current = { x, y }
    dragOffset.current = { x, y }
    const svgNode: any = svgRef.current
    dragOffset.current.x -= parseFloat(svgNode.getAttributeNS(null, 'x'))
    dragOffset.current.y -= parseFloat(svgNode.getAttributeNS(null, 'y'))
  }

  const endDrag = (evt) => {
    isDragged.current = false
  }

  const drag = (evt) => {
    if (svgRef?.current && isDragged.current) {
      const svgNode: any = svgRef.current
      if (svgNode) {
        evt.preventDefault()
        const { x, y } = getMousePosition(evt)
        svgNode.setAttributeNS(null, 'x', x - dragOffset.current.x)
        svgNode.setAttributeNS(null, 'y', y - dragOffset.current.y)
      }
    }
  }

  return (
    <svg
      viewBox='0 0 8 8'
      shapeRendering='crispEdges'
      onMouseMove={drag}
      onMouseUp={endDrag}
      ref={boardRef}
    >
      {[...Array(8).keys()].map((x) =>
        [...Array(8).keys()].map((y) => (
          <rect
            x={x}
            y={y}
            width='1'
            height='1'
            fill={(x + y) % 2 === 0 ? '#f0d9b5' : '#b58863'}
            key={`${x}${y}`}
          />
        ))
      )}
      <svg x={1} y={2} ref={svgRef} onMouseDown={startDrag}>
        <g
          fill='none'
          fillRule='evenodd'
          stroke='#000'
          strokeWidth={1.5}
          strokeLinecap='round'
          strokeLinejoin='round'
          transform='scale(0.02)'
          ref={svgRef}
        >
          <g fill='#000' strokeLinecap='butt'>
            <path d='M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z' />
            <path d='M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z' />
            <path d='M25 8a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0z' />
          </g>
          <path
            d='M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5'
            stroke='#fff'
            strokeLinejoin='miter'
          />
        </g>
      </svg>
    </svg>
  )
}

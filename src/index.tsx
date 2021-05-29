import React, { useRef, RefObject } from 'react'
import styles from './styles.module.css'
import Piece from './Piece'
import { useDrag } from '@use-gesture/react'
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

// function getMousePosition(evt) {
//   var CTM = svg.getScreenCTM()
//   return {
//     x: (evt.clientX - CTM.e) / CTM.a,
//     y: (evt.clientY - CTM.f) / CTM.d
//   }
// }

export const ChessBoard = ({ initialFen }: Props) => {
  console.log(initialFen)
  const fenPieces = initialFen.split(' ')[0]
  const boardArr = fen2array(fenPieces)
  console.log(boardArr)
  const svgRef = useRef<any>()
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if (down && svgRef?.current) {
      console.log({ x: down ? mx : 0, y: down ? my : 0 })

      const svgNode: any = svgRef.current
      if (down) {
        var CTM = svgNode.getScreenCTM()
        const { x, y } = {
          x: (mx - CTM.e) / CTM.a,
          y: (my - CTM.f) / CTM.d
        }
        svgNode.setAttributeNS(
          null,
          'transform',
          `scale(0.02) translate(${x} ${y}) `
        )
        // svgNode.setAttribute('x', `2`)
        // svgNode.setAttribute('y', `2`)
      }
    }
  })
  return (
    <svg viewBox='0 0 8 8' shapeRendering='crispEdges'>
      <g id='board_svg__f'>
        <g id='board_svg__e'>
          <g id='board_svg__d'>
            <g id='board_svg__c'>
              <path fill='#f0d9b5' id='board_svg__a' d='M0 0h1v1H0z' />
              <use x={1} y={1} href='#board_svg__a' xlinkHref='#a' />
              <path fill='#b58863' id='board_svg__b' d='M0 1h1v1H0z' />
              <use x={1} y={-1} href='#board_svg__b' xlinkHref='#b' />
            </g>
            <use x={2} href='#board_svg__c' xlinkHref='#c' />
          </g>
          <use x={4} href='#board_svg__d' xlinkHref='#d' />
        </g>
        <use y={2} href='#board_svg__e' xlinkHref='#e' />
      </g>
      <use y={4} href='#board_svg__f' xlinkHref='#f' />

      <svg shapeRendering='crispEdges' x='0' y='0'>
        <g
          fill='none'
          fillRule='evenodd'
          stroke='#000'
          strokeWidth={1.5}
          strokeLinecap='round'
          strokeLinejoin='round'
          transform='scale(0.02)'
          ref={svgRef}
          {...bind()}
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

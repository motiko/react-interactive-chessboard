import React from 'react'
import { transform } from '../../Piece'

function SvgN(props: any) {
  return (
    <svg {...props}>
      <g
        fill='none'
        fillRule='evenodd'
        stroke='#000'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
        transform={transform}
      >
        <path d='M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21' fill='#fff' />
        <path
          d='M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3'
          fill='#fff'
        />
        <path d='M9.5 25.5a.5.5 0 11-1 0 .5.5 0 111 0z' fill='#000' />
        <path
          d='M14.933 15.75a.5 1.5 30 11-.866-.5.5 1.5 30 11.866.5z'
          fill='#000'
          strokeWidth={1.49997}
        />
      </g>
    </svg>
  )
}

export default SvgN

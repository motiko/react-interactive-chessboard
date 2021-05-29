import React from 'react'

function SvgK(props: any) {
  return (
    <svg {...props} viewBox='0 0 40 40'>
      <g
        fill='none'
        fillRule='evenodd'
        stroke='#000'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M22.5 11.63V6M20 8h5' strokeLinejoin='miter' />
        <path
          d='M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5'
          fill='#fff'
          strokeLinecap='butt'
          strokeLinejoin='miter'
        />
        <path
          d='M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7'
          fill='#fff'
        />
        <path d='M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0' />
      </g>
    </svg>
  )
}

export default SvgK

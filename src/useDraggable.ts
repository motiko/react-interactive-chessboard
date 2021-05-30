import { useRef } from 'react'

function findFirstSvgParent(node: any): any {
  if (node.nodeName === 'svg') return node
  if (node.parentNode === null) return null
  return findFirstSvgParent(node.parentNode)
}

interface Coords {
  x: number
  y: number
}

function coordsToUci({ x, y }) {
  x = Math.floor(x)
  y = Math.floor(y)
  const codeOfA = 'a'.charCodeAt(0)
  const resCode = codeOfA + x
  const result = `${String.fromCharCode(resCode)}${8 - y}`
  return result
}

export default function useDraggable(boardRef, onMove) {
  const draggedSvg = useRef<any>()
  const dragOffset = useRef<any>()
  const draggedFrom = useRef<any>()

  const startDrag = (evt) => {
    const { x, y } = getMousePosition(evt)
    draggedFrom.current = { x, y }
    dragOffset.current = { x, y }
    draggedSvg.current = findFirstSvgParent(evt.target)
    const svgNode: any = draggedSvg.current
    dragOffset.current.x -= parseFloat(svgNode.getAttributeNS(null, 'x'))
    dragOffset.current.y -= parseFloat(svgNode.getAttributeNS(null, 'y'))
  }

  const endDrag = (evt) => {
    const svgNode: any = draggedSvg.current
    if (svgNode) {
      const x = svgNode.getAttributeNS(null, 'x')
      const y = svgNode.getAttributeNS(null, 'y')
      svgNode.setAttributeNS(null, 'x', Math.round(x))
      svgNode.setAttributeNS(null, 'y', Math.round(y))
      const from = coordsToUci(draggedFrom.current)
      const to = coordsToUci({ x: Math.round(x), y: Math.round(y) })
      onMove(from, to)
    }
    draggedSvg.current = null
  }

  const drag = (evt) => {
    if (draggedSvg?.current) {
      const svgNode: any = draggedSvg.current
      if (svgNode) {
        evt.preventDefault()
        const { x, y } = getMousePosition(evt)
        svgNode.setAttributeNS(null, 'x', x - dragOffset.current.x)
        svgNode.setAttributeNS(null, 'y', y - dragOffset.current.y)
      }
    }
  }

  function getMousePosition(evt) {
    if (boardRef.current) {
      const CTM = boardRef.current.getScreenCTM()
      const event = evt.touches ? (evt = evt.touches[0]) : evt
      return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d
      }
    }
    return { x: 0, y: 0 }
  }

  return { drag, startDrag, endDrag }
}

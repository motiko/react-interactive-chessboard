import { useRef } from 'react'

function findFirstSvgParent(node: any): any {
  if (node.nodeName === 'svg') return node
  if (node.parentNode === null) return null
  return findFirstSvgParent(node.parentNode)
}

export default function useDraggable(boardRef) {
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
      var CTM = boardRef.current.getScreenCTM()
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      }
    }
    return { x: 0, y: 0 }
  }

  return { drag, startDrag, endDrag }
}

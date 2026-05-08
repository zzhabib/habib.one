import { useEffect, useRef } from 'react'
import { AuroraSceneGL } from './scene'

export function AuroraScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const scene = new AuroraSceneGL(el)
    return () => scene.dispose()
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}

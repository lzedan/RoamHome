import { useEffect, useRef } from 'react'

// A small canvas stretched to full screen: upscaling softens it further, so a light
// blur here reads like the prototype's 16px overlay blur at 1080p.
const canvasWidth = 320
const canvasHeight = 180
const blurRadius = 3

/**
 * Lite-effects stand-in for the modal overlay's `backdrop-filter`: the background photo,
 * blurred once into a canvas when the app starts. Being static, it costs nothing per
 * frame, and it hides the home screen behind modals so that isn't redrawn either.
 */
export function ModalBackdrop({ src, visible }: { src: string; visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (!context) return

    const image = new Image()
    image.onload = () => drawBlurredCover(context, image)
    image.src = src
    return () => {
      image.onload = null
    }
  }, [src])

  return (
    <div className={`modal-backdrop${visible ? ' is-visible' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  )
}

function drawBlurredCover(context: CanvasRenderingContext2D, image: HTMLImageElement) {
  // Match `.home::before`: cover, centred horizontally, 42% down.
  const scale = Math.max(canvasWidth / image.naturalWidth, canvasHeight / image.naturalHeight)
  const width = image.naturalWidth * scale
  const height = image.naturalHeight * scale
  const x = (canvasWidth - width) / 2
  const y = (canvasHeight - height) * 0.42

  // Overdraw by the blur radius so the edges don't fade into transparency.
  context.filter = `blur(${blurRadius}px)`
  context.drawImage(image, x - blurRadius, y - blurRadius, width + blurRadius * 2, height + blurRadius * 2)
}

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'

interface FullscreenVideoPlayerProps {
  src: string
  open: boolean
  onClose: () => void
}

export function FullscreenVideoPlayer({ src, open, onClose }: FullscreenVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClose = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    }
    onClose()
  }

  useEffect(() => {
    if (!open) return

    const video = videoRef.current
    if (!video) return

    void video.play().catch(() => undefined)

    const requestFullscreen = async () => {
      try {
        await video.requestFullscreen()
      } catch {
        // Overlay fallback when browser blocks programmatic fullscreen.
      }
    }

    void requestFullscreen()
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onClose()
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      onClick={handleClose}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute top-4 right-4 z-[101] size-9 text-white hover:bg-white/10"
        onClick={handleClose}
        aria-label="Закрыть видео"
      >
        <X className="size-5" />
      </Button>

      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay
        playsInline
        className="max-h-full max-w-full"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  )
}

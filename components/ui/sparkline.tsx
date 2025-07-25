"use client"

import { useEffect, useRef } from "react"

interface SparklineProps {
  data: number[]
  width: number
  height: number
  color: string
  lineWidth?: number
}

export function Sparkline({ data, width, height, color, lineWidth = 2 }: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set up dimensions
    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(pixelRatio, pixelRatio)

    // Find min and max values
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    // Calculate points
    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * width,
      y: height - ((value - min) / range) * (height * 0.8) - height * 0.1,
    }))

    // Draw line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.stroke()

    // Add glow effect
    ctx.shadowColor = color
    ctx.shadowBlur = 5
    ctx.stroke()

    // Draw dots at start and end
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(points[0].x, points[0].y, 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(points[points.length - 1].x, points[points.length - 1].y, 2, 0, Math.PI * 2)
    ctx.fill()
  }, [data, width, height, color, lineWidth])

  return <canvas ref={canvasRef} width={width} height={height} />
}

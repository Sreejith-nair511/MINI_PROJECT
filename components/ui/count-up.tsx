"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

interface CountUpProps {
  start?: number
  end: number
  duration?: number
  decimals?: number
  className?: string
}

export function CountUp({ start = 0, end, duration = 1.5, decimals = 0, className = "" }: CountUpProps) {
  const [value, setValue] = useState(start)
  const countRef = useRef<number | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const currentValue = start + progress * (end - start)

      setValue(currentValue)

      if (progress < 1) {
        countRef.current = requestAnimationFrame(updateCount)
      }
    }

    countRef.current = requestAnimationFrame(updateCount)
    controls.start({ opacity: 1, y: 0 })

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current)
      }
    }
  }, [start, end, duration, controls])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      {value.toFixed(decimals)}
    </motion.span>
  )
}

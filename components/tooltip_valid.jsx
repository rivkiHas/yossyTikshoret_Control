'use client'

export default function TooltipValid({ tooltipText = 'שדה חובה', className = '' }) {
  return (
    <div className={`absolute -top-2 left-0 z-10 w-max rounded bg-black px-2 py-1 text-xs text-white ${className}`}>
      {tooltipText}
      <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-black"></div>
    </div>
  )
}

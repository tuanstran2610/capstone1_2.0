import React from 'react'

interface ZaloPayIconProps {
  size?: number
  className?: string
}

const ZaloPayIcon: React.FC<ZaloPayIconProps> = ({ size = 32, className = '' }) => {
  return (
    <div 
      className={`inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white font-bold shadow-lg ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      Z
    </div>
  )
}

export default ZaloPayIcon

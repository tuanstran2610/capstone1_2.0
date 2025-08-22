import React from 'react'
import { motion } from 'framer-motion'

interface ZaloPayLoadingProps {
  message?: string
}

const ZaloPayLoading: React.FC<ZaloPayLoadingProps> = ({ 
  message = 'Đang chuyển hướng đến ZaloPay...' 
}) => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-blue-700 font-medium">{message}</span>
    </div>
  )
}

export default ZaloPayLoading

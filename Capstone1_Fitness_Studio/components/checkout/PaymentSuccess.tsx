'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa'

type MembershipPlan = {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
}

type PersonalInfo = {
  fullName: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  emergencyContact: string
}

type PaymentSuccessProps = {
  plan: MembershipPlan
  personalInfo: PersonalInfo
  onFinish: () => void
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  plan,
  personalInfo,
  onFinish
}) => {
  const [orderNumber, setOrderNumber] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [formattedExpiryDate, setFormattedExpiryDate] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Generate order number on client side only
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(`FIT${randomNum}`)
    
    // Create current date
    const today = new Date()
    setCurrentDate(today.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    
    // Create expiry date (1 month later)
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 1)
    setFormattedExpiryDate(expiryDate.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="inline-block mb-4"
        >
          <FaCheckCircle className="text-green-500 text-6xl" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">Thanh toán thành công!</h2>
        <p className="text-gray-600">
          Cảm ơn bạn đã đăng ký thành viên tại Fitness Studio.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Thông tin đơn hàng</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600 text-sm">Mã đơn hàng</p>
            <p className="font-medium">{orderNumber}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Ngày đăng ký</p>
            <p className="font-medium">{currentDate}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Gói thành viên</p>
            <p className="font-medium">{plan.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Thời hạn</p>
            <p className="font-medium">{plan.duration}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Ngày hết hạn</p>
            <p className="font-medium">{formattedExpiryDate}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Tổng tiền</p>
            <p className="font-medium text-accent">{formatPrice(plan.price * 1.1)}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium mb-2">Thông tin cá nhân</h4>
          <p className="mb-1"><span className="text-gray-600">Họ tên:</span> {personalInfo.fullName}</p>
          <p className="mb-1"><span className="text-gray-600">Email:</span> {personalInfo.email}</p>
          <p className="mb-1"><span className="text-gray-600">Số điện thoại:</span> {personalInfo.phone}</p>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
        <h4 className="font-medium text-blue-800 mb-2">Thông tin quan trọng</h4>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
          <li>Vui lòng mang theo CMND/CCCD khi đến phòng tập lần đầu tiên.</li>
          <li>Bạn sẽ được chụp ảnh và cấp thẻ thành viên tại quầy lễ tân.</li>
          <li>Buổi tư vấn miễn phí với huấn luyện viên sẽ được sắp xếp trong vòng 3 ngày.</li>
          <li>Thông tin chi tiết đã được gửi đến email của bạn.</li>
        </ul>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          <FaDownload className="mr-2" /> Tải hóa đơn
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinish}
          className="flex items-center justify-center px-6 py-3 bg-accent text-white rounded-md hover:bg-accent/90"
        >
          <FaHome className="mr-2" /> Về trang chủ
        </motion.button>
      </div>
    </div>
  )
}

export default PaymentSuccess 
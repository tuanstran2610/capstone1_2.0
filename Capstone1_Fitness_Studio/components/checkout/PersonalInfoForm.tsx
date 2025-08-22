'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'

type PersonalInfo = {
  fullName: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  emergencyContact: string
}

type PersonalInfoFormProps = {
  initialValues: PersonalInfo
  onSubmit: (values: PersonalInfo) => void
  onBack: () => void
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  initialValues,
  onSubmit,
  onBack
}) => {
  const [values, setValues] = useState<PersonalInfo>(initialValues)
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Xóa lỗi khi người dùng sửa trường đó
    if (errors[name as keyof PersonalInfo]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<PersonalInfo> = {}
    let isValid = true

    // Kiểm tra tên đầy đủ
    if (!values.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên'
      isValid = false
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim() || !emailRegex.test(values.email)) {
      newErrors.email = 'Vui lòng nhập email hợp lệ'
      isValid = false
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/
    if (!values.phone.trim() || !phoneRegex.test(values.phone)) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ'
      isValid = false
    }

    // Kiểm tra địa chỉ
    if (!values.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ'
      isValid = false
    }

    // Kiểm tra ngày sinh
    if (!values.dateOfBirth) {
      newErrors.dateOfBirth = 'Vui lòng nhập ngày sinh'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(values)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
      <p className="text-gray-600 mb-8">
        Vui lòng cung cấp thông tin cá nhân của bạn để hoàn tất đăng ký thành viên
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Họ tên */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
              }`}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
              }`}
              placeholder="example@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Số điện thoại */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
              }`}
              placeholder="0912345678"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* Ngày sinh */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.dateOfBirth ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
              }`}
            />
            {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
          </div>

          {/* Địa chỉ */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
              }`}
              placeholder="123 Đường ABC, Quận XYZ, TP. HCM"
            />
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>

          {/* Người liên hệ khẩn cấp */}
          <div className="md:col-span-2">
            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
              Người liên hệ khẩn cấp (tùy chọn)
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={values.emergencyContact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="Tên & số điện thoại"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" /> Quay lại
          </button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Tiếp tục
          </motion.button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfoForm 
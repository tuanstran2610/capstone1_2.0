'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiEdit2, FiSave, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiAward, FiCheckCircle } from 'react-icons/fi'

// Dữ liệu mẫu
const trainerData = {
  id: 1,
  name: 'Matt Smith',
  email: 'matt.smith@fitnessstudio.com',
  phone: '+84 123 456 789',
  address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
  birthDate: '1990-05-15',
  joinDate: '2022-01-10',
  avatar: '/assets/img/trainers/matt.jpg',
  bio: 'Tôi là huấn luyện viên với hơn 10 năm kinh nghiệm trong lĩnh vực fitness. Chuyên môn của tôi bao gồm tập luyện sức mạnh, giảm cân và xây dựng cơ bắp. Tôi tin rằng mỗi người đều có tiềm năng để đạt được mục tiêu sức khỏe của mình với sự hướng dẫn và động lực phù hợp.',
  specializations: ['Strength Training', 'Weight Loss', 'Muscle Building', 'Nutrition'],
  certifications: [
    { name: 'Certified Personal Trainer (CPT)', issuer: 'National Academy of Sports Medicine', year: '2015' },
    { name: 'Certified Strength and Conditioning Specialist', issuer: 'National Strength and Conditioning Association', year: '2017' },
    { name: 'Precision Nutrition Level 1', issuer: 'Precision Nutrition', year: '2018' }
  ],
  workingHours: {
    monday: '08:00 - 17:00',
    tuesday: '08:00 - 17:00',
    wednesday: '08:00 - 17:00',
    thursday: '08:00 - 17:00',
    friday: '08:00 - 17:00',
    saturday: '08:00 - 12:00',
    sunday: 'Nghỉ'
  },
  stats: {
    clients: 24,
    sessions: 120,
    experience: '10 năm',
    rating: 4.8
  }
}

export default function TrainerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: trainerData.name,
    email: trainerData.email,
    phone: trainerData.phone,
    address: trainerData.address,
    bio: trainerData.bio,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Trong thực tế, gửi dữ liệu lên server
    console.log('Submitted data:', formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hồ sơ huấn luyện viên</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            isEditing 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
        >
          {isEditing ? (
            <>
              <FiSave className="h-5 w-5" />
              <span>Lưu thay đổi</span>
            </>
          ) : (
            <>
              <FiEdit2 className="h-5 w-5" />
              <span>Chỉnh sửa</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-40 h-40 rounded-full overflow-hidden">
                <Image
                  src={trainerData.avatar}
                  alt={trainerData.name}
                  fill
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <button className="text-primary-600 hover:text-primary-800 text-sm">
                  Thay đổi ảnh
                </button>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg w-full">
                <h3 className="font-medium text-center mb-2">Thống kê</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary-600">{trainerData.stats.clients}</p>
                    <p className="text-xs text-gray-500">Học viên</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary-600">{trainerData.stats.sessions}</p>
                    <p className="text-xs text-gray-500">Buổi tập</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary-600">{trainerData.stats.experience}</p>
                    <p className="text-xs text-gray-500">Kinh nghiệm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary-600">{trainerData.stats.rating}</p>
                    <p className="text-xs text-gray-500">Đánh giá</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main info */}
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiUser className="mr-2 text-gray-400" />
                        <span>{trainerData.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiMail className="mr-2 text-gray-400" />
                        <span>{trainerData.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiPhone className="mr-2 text-gray-400" />
                        <span>{trainerData.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiMapPin className="mr-2 text-gray-400" />
                        <span>{trainerData.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span>{new Date(trainerData.birthDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày tham gia</label>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span>{new Date(trainerData.joinDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-700">{trainerData.bio}</p>
                  )}
                </div>
                
                {isEditing && (
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <hr className="my-8" />
          
          {/* Specializations */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Chuyên môn</h2>
            <div className="flex flex-wrap gap-2">
              {trainerData.specializations.map((spec, index) => (
                <span 
                  key={index} 
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Chứng chỉ</h2>
            <div className="space-y-4">
              {trainerData.certifications.map((cert, index) => (
                <div key={index} className="flex items-start">
                  <FiAward className="mt-1 mr-2 text-primary-500" />
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-gray-500">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Working Hours */}
          <div>
            <h2 className="text-xl font-bold mb-4">Giờ làm việc</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="font-medium">Thứ Hai:</span>
                <span>{trainerData.workingHours.monday}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Thứ Ba:</span>
                <span>{trainerData.workingHours.tuesday}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Thứ Tư:</span>
                <span>{trainerData.workingHours.wednesday}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Thứ Năm:</span>
                <span>{trainerData.workingHours.thursday}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Thứ Sáu:</span>
                <span>{trainerData.workingHours.friday}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Thứ Bảy:</span>
                <span>{trainerData.workingHours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Chủ Nhật:</span>
                <span>{trainerData.workingHours.sunday}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Password Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Bảo mật</h2>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Thay đổi mật khẩu</h3>
              <p className="text-sm text-gray-500">Cập nhật mật khẩu của bạn để đảm bảo an toàn tài khoản</p>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
              Thay đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
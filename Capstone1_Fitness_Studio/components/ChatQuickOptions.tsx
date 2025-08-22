'use client'

import React from 'react'

type QuickOption = {
  id: string
  text: string
  icon?: string
}

type ChatQuickOptionsProps = {
  onOptionSelect: (option: string) => void
}

const ChatQuickOptions: React.FC<ChatQuickOptionsProps> = ({ onOptionSelect }) => {
  const quickOptions: QuickOption[] = [
    { id: '1', text: 'Giờ mở cửa', icon: '🕒' },
    { id: '2', text: 'Các lớp tập', icon: '🏋️' },
    { id: '3', text: 'Giá thành viên', icon: '💰' },
    { id: '4', text: 'Huấn luyện viên', icon: '👨‍🏫' },
    { id: '5', text: 'Địa chỉ', icon: '📍' },
    { id: '6', text: 'Buổi tập thử', icon: '🆓' },
    { id: '7', text: 'Cơ sở vật chất', icon: '🏢' },
    { id: '8', text: 'Liên hệ', icon: '📞' }
  ]

  // Nhóm các tùy chọn thành các danh mục
  const categories = [
    {
      title: 'Thông tin chung',
      options: quickOptions.slice(0, 5)
    },
    {
      title: 'Dịch vụ',
      options: quickOptions.slice(5)
    }
  ]

  return (
    <div className="mb-6 animate-fadeIn">
      <p className="text-sm text-gray-600 mb-3 font-medium">Bạn có thể hỏi về:</p>
      
      {categories.map((category, idx) => (
        <div key={`category-${idx}`} className="mb-4">
          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2">{category.title}</h4>
          <div className="flex flex-wrap gap-2">
            {category.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionSelect(option.text)}
                className="px-3 py-2 text-sm bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border border-gray-200 shadow-sm flex items-center gap-1 hover:border-gray-300"
              >
                {option.icon && <span className="text-lg">{option.icon}</span>}
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">
        <p className="font-medium">💡 Mẹo:</p>
        <p>Bạn có thể hỏi cụ thể về "Lớp Yoga", "Gói VIP" hoặc bất kỳ dịch vụ nào của chúng tôi!</p>
      </div>
    </div>
  )
}

export default ChatQuickOptions 
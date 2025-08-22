'use client'

import { useState } from 'react'
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa'

const SimpleChatBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: '1', text: 'Xin chào! Tôi có thể giúp gì cho bạn?', isUser: false }
  ])
  const [messageIdCounter, setMessageIdCounter] = useState(1)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const generateId = () => {
    const id = `msg_${messageIdCounter}`
    setMessageIdCounter(prev => prev + 1)
    return id
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: generateId(),
      text: message,
      isUser: true
    }
    
    setMessages([...messages, userMessage])
    setMessage('')

    // Simple response
    setTimeout(() => {
      const botMessage = {
        id: generateId(),
        text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!',
        isUser: false
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Chat header */}
          <div className="bg-red-500 text-white p-4">
            <h3 className="font-bold">Hỗ trợ trực tuyến</h3>
            <p className="text-sm opacity-90">Chúng tôi sẵn sàng giúp đỡ bạn</p>
          </div>

          {/* Messages container */}
          <div className="h-80 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 ${
                  msg.isUser ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-red-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white rounded-r-lg px-4 py-2"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default SimpleChatBox 
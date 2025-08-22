'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FiClock, FiUser, FiCalendar, FiCheck, FiX } from 'react-icons/fi'

// Dữ liệu mẫu
const sessions = [
  {
    id: 1,
    client: 'John Doe',
    time: '09:00 AM - 10:00 AM',
    date: new Date(),
    type: 'Strength Training',
    status: 'confirmed'
  },
  {
    id: 2,
    client: 'Jane Smith',
    time: '11:00 AM - 12:00 PM',
    date: new Date(),
    type: 'Cardio',
    status: 'confirmed'
  },
  {
    id: 3,
    client: 'Mike Johnson',
    time: '02:00 PM - 03:00 PM',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    type: 'Yoga',
    status: 'pending'
  },
  {
    id: 4,
    client: 'Sarah Williams',
    time: '10:00 AM - 11:00 AM',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    type: 'HIIT',
    status: 'confirmed'
  }
]

// Tạo mảng thời gian từ 7:00 AM đến 9:00 PM
const timeSlots = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 7
  return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`
})

export default function TrainerSchedule() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState('day') // 'day', 'week', 'month'
  
  // Lọc các buổi tập theo ngày đã chọn
  const filteredSessions = sessions.filter(session => {
    if (view === 'day') {
      return session.date.toDateString() === date.toDateString()
    }
    // Có thể mở rộng cho chế độ xem tuần và tháng
    return true
  })

  // @ts-ignore - Bỏ qua lỗi kiểu dữ liệu
  const handleDateChange = (value) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setView('day')}
            className={`px-4 py-2 rounded-md ${view === 'day' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
          >
            Day
          </button>
          <button 
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-md ${view === 'week' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-md ${view === 'month' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Select Date</h2>
            {/* @ts-ignore - Bỏ qua lỗi kiểu dữ liệu */}
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Schedule for selected date */}
        <div className="bg-white rounded-lg shadow overflow-hidden md:col-span-2">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">
              {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            
            {view === 'day' ? (
              <div className="space-y-4">
                {timeSlots.map((time, index) => {
                  const session = filteredSessions.find(s => s.time.startsWith(time))
                  
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-md border ${session ? 'border-primary-200 bg-primary-50' : 'border-gray-200'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FiClock className="mr-2 text-gray-500" />
                          <span className="font-medium">{time}</span>
                        </div>
                        
                        {session ? (
                          <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex items-center mr-4">
                              <FiUser className="mr-2 text-primary-500" />
                              <span>{session.client}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                                {session.type}
                              </span>
                            </div>
                            <div className="ml-4">
                              {session.status === 'confirmed' ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800">
                                  <FiCheck className="mr-1" /> Confirmed
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800">
                                  <FiClock className="mr-1" /> Pending
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <button className="text-sm text-primary-600 hover:text-primary-800">
                            + Add Availability
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Select 'Day' view to see detailed schedule</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Upcoming Sessions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4">Upcoming Sessions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {session.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {session.status === 'confirmed' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          <FiCheck className="mr-1" /> Confirmed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800">
                          <FiClock className="mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {session.status === 'pending' && (
                          <>
                            <button className="text-green-600 hover:text-green-800">
                              <FiCheck className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <FiX className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        <button className="text-primary-600 hover:text-primary-800">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 
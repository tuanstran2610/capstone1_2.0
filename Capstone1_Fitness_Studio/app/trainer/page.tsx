'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FiUsers, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi'

// Dữ liệu mẫu
const upcomingSessions = [
  {
    id: 1,
    client: 'John Doe',
    time: '09:00 AM - 10:00 AM',
    date: new Date(),
    type: 'Strength Training'
  },
  {
    id: 2,
    client: 'Jane Smith',
    time: '11:00 AM - 12:00 PM',
    date: new Date(),
    type: 'Cardio'
  },
  {
    id: 3,
    client: 'Mike Johnson',
    time: '02:00 PM - 03:00 PM',
    date: new Date(),
    type: 'Yoga'
  }
]

const recentClients = [
  {
    id: 1,
    name: 'John Doe',
    membership: 'Premium',
    progress: 'Good',
    lastSession: '2 days ago'
  },
  {
    id: 2,
    name: 'Jane Smith',
    membership: 'Standard',
    progress: 'Excellent',
    lastSession: 'Yesterday'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    membership: 'Premium',
    progress: 'Fair',
    lastSession: '1 week ago'
  }
]

export default function TrainerDashboard() {
  const [date, setDate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState('upcoming')
  
  const stats = [
    { name: 'Total Clients', value: '24', icon: FiUsers },
    { name: 'Sessions Today', value: '5', icon: FiCalendar },
    { name: 'Hours This Week', value: '32', icon: FiClock },
    { name: 'Completion Rate', value: '98%', icon: FiCheckCircle },
  ]

  // @ts-ignore - Bỏ qua lỗi kiểu dữ liệu
  const handleDateChange = (value) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trainer Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Calendar and Today's Sessions */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg md:col-span-1">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Calendar</h2>
            <div className="flex justify-center">
              {/* @ts-ignore - Bỏ qua lỗi kiểu dữ liệu */}
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="rounded-md border"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg md:col-span-2">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Sessions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingSessions.map((session) => (
                    <tr key={session.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {session.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {session.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {session.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Upcoming Sessions
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`${
                activeTab === 'clients'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Recent Clients
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`${
                activeTab === 'requests'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Pending Requests
            </button>
          </nav>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {activeTab === 'upcoming' && (
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingSessions.map((session) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'clients' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Membership
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Session
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentClients.map((client) => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.membership}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.progress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.lastSession}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'requests' && (
            <div className="text-center py-10">
              <p className="text-gray-500">No pending requests at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
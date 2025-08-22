'use client'

import { useState } from 'react'
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiCalendar, 
  FiClock, 
  FiUsers,
  FiMapPin,
  FiFilter,
  FiSearch,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'

// Sample data
const classes = [
  {
    id: 1,
    name: 'Basic Yoga',
    trainer: 'Sofia Wilson',
    capacity: 20,
    enrolled: 15,
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      time: '08:00 - 09:00'
    },
    location: 'Room 2',
    status: 'active'
  },
  {
    id: 2,
    name: 'Cardio HIIT',
    trainer: 'David Johnson',
    capacity: 15,
    enrolled: 12,
    schedule: {
      days: ['Tue', 'Thu'],
      time: '17:30 - 18:30'
    },
    location: 'Room 1',
    status: 'active'
  },
  {
    id: 3,
    name: 'Pilates',
    trainer: 'Rosy Adams',
    capacity: 12,
    enrolled: 8,
    schedule: {
      days: ['Mon', 'Wed'],
      time: '10:15 - 11:15'
    },
    location: 'Room 3',
    status: 'active'
  },
  {
    id: 4,
    name: 'Zumba',
    trainer: 'Matt Smith',
    capacity: 25,
    enrolled: 22,
    schedule: {
      days: ['Tue', 'Thu', 'Sat'],
      time: '19:00 - 20:00'
    },
    location: 'Room 1',
    status: 'active'
  },
  {
    id: 5,
    name: 'Basic Bodybuilding',
    trainer: 'David Johnson',
    capacity: 10,
    enrolled: 6,
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      time: '16:00 - 17:00'
    },
    location: 'Weight Room',
    status: 'inactive'
  }
]

const rooms = [
  { id: 1, name: 'Room 1', capacity: 25, equipment: 'Sound system, mirrors, exercise mats' },
  { id: 2, name: 'Room 2', capacity: 20, equipment: 'Sound system, mirrors, exercise mats, yoga equipment' },
  { id: 3, name: 'Room 3', capacity: 15, equipment: 'Sound system, mirrors, exercise mats, pilates balls' },
  { id: 4, name: 'Weight Room', capacity: 15, equipment: 'Free weights, exercise machines' },
]

// Sample schedule data
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00'
];

export default function ClassesPage() {
  const [activeTab, setActiveTab] = useState('classes')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddClassModal, setShowAddClassModal] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(rooms[0].id)
  
  // Filter classes
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cls.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cls.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Class & Schedule Management</h1>
        <button 
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          onClick={() => setShowAddClassModal(true)}
        >
          <FiPlus className="h-5 w-5" />
          <span>Add New Class</span>
        </button>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('classes')}
              className={`${
                activeTab === 'classes'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Class List
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`${
                activeTab === 'schedule'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Room Schedule
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`${
                activeTab === 'rooms'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Room Management
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-3 md:space-y-0">
                <div className="relative max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search classes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <FiFilter className="text-gray-400" />
                    <select
                      className="border border-gray-300 rounded-md px-3 py-2"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Classes Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trainer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{cls.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{cls.trainer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{cls.schedule.days.join(', ')}</div>
                          <div className="text-sm text-gray-500">{cls.schedule.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {cls.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{cls.enrolled}/{cls.capacity}</div>
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mt-1">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            cls.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {cls.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900" title="Student List">
                              <FiUsers className="h-5 w-5" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900" title="Edit">
                              <FiEdit className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900" title="Delete">
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredClasses.length}</span> of{' '}
                  <span className="font-medium">{filteredClasses.length}</span> classes
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Room Schedule</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <FiMapPin className="text-gray-400" />
                    <select
                      className="border border-gray-300 rounded-md px-3 py-2"
                      value={currentRoom}
                      onChange={(e) => setCurrentRoom(Number(e.target.value))}
                    >
                      {rooms.map(room => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Schedule Grid */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="w-20 px-4 py-3 border-b border-r border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      {weekDays.map((day, index) => (
                        <th key={index} className="px-4 py-3 border-b border-r border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time, timeIndex) => (
                      <tr key={timeIndex} className={timeIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 border-b border-r border-gray-200 text-xs font-medium text-gray-500">
                          {time}
                        </td>
                        {weekDays.map((day, dayIndex) => {
                          // Find class at this day and time
                          const classInSlot = classes.find(cls => 
                            cls.schedule.days.includes(day) && 
                            cls.schedule.time.startsWith(time) &&
                            cls.location === rooms.find(r => r.id === currentRoom)?.name
                          );
                          
                          return (
                            <td 
                              key={dayIndex} 
                              className="px-2 py-2 border-b border-r border-gray-200 h-16"
                            >
                              {classInSlot ? (
                                <div className="bg-indigo-100 border border-indigo-300 rounded-md p-2 h-full">
                                  <div className="text-xs font-medium text-indigo-800">{classInSlot.name}</div>
                                  <div className="text-xs text-indigo-600 mt-1">{classInSlot.trainer}</div>
                                  <div className="text-xs text-gray-500 mt-1">{classInSlot.enrolled}/{classInSlot.capacity}</div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <button className="text-gray-400 hover:text-indigo-600">
                                    <FiPlus className="h-5 w-5" />
                                  </button>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Room Management</h2>
                <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                  <FiPlus className="h-5 w-5" />
                  <span>Add New Room</span>
                </button>
              </div>
              
              {/* Rooms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800" title="Edit">
                            <FiEdit className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-800" title="Delete">
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <FiUsers className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">Capacity: {room.capacity} people</span>
                        </div>
                        <div className="flex items-start">
                          <FiCalendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                          <span className="text-sm text-gray-600">
                            {classes.filter(c => c.location === room.name && c.status === 'active').length} active classes
                          </span>
                        </div>
                        <div className="flex items-start">
                          <div className="h-5 w-5 flex justify-center text-gray-400 mr-2">
                            <span className="font-bold">i</span>
                          </div>
                          <span className="text-sm text-gray-600">Equipment: {room.equipment}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 px-4 rounded-md text-sm font-medium">
                          View Room Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
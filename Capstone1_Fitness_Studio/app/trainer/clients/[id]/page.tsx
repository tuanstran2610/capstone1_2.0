'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FiUser, FiCalendar, FiBarChart2, FiClock, FiArrowLeft, FiEdit, FiMessageSquare, FiActivity } from 'react-icons/fi'

// Dữ liệu mẫu
const clients = [
  {
    id: 1,
    name: 'John Doe',
    image: '/assets/img/testimonial/michael.jpg',
    membership: 'Premium',
    progress: 'Good',
    lastSession: '2 days ago',
    nextSession: 'Tomorrow, 9:00 AM',
    goal: 'Weight Loss',
    joinDate: '2023-01-15',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    age: 32,
    height: '180 cm',
    weight: '85 kg',
    notes: 'John is focused on losing weight and improving overall fitness. He prefers morning sessions and has shown good progress in cardio exercises.',
    sessions: [
      { date: '2023-05-01', time: '09:00 AM', type: 'Cardio', notes: 'Completed 30 min treadmill, 15 min cycling' },
      { date: '2023-05-04', time: '09:00 AM', type: 'Strength', notes: 'Upper body focus, increased weights on bench press' },
      { date: '2023-05-08', time: '09:00 AM', type: 'HIIT', notes: 'Completed full circuit, improved recovery time' }
    ],
    measurements: [
      { date: '2023-01-15', weight: '90 kg', bodyFat: '24%', notes: 'Initial measurement' },
      { date: '2023-02-15', weight: '88 kg', bodyFat: '23%', notes: 'Good progress' },
      { date: '2023-03-15', weight: '87 kg', bodyFat: '22%', notes: 'Consistent improvement' },
      { date: '2023-04-15', weight: '85 kg', bodyFat: '21%', notes: 'On track with goals' }
    ],
    program: {
      name: 'Weight Loss Program',
      description: 'Focused on calorie deficit and increasing metabolism',
      workouts: [
        { day: 'Monday', focus: 'Cardio', exercises: ['Treadmill (30 min)', 'Cycling (15 min)', 'Rowing (10 min)'] },
        { day: 'Wednesday', focus: 'Strength - Upper Body', exercises: ['Bench Press (3x10)', 'Shoulder Press (3x10)', 'Lat Pulldown (3x12)', 'Bicep Curls (3x12)'] },
        { day: 'Friday', focus: 'HIIT', exercises: ['Circuit Training (3 rounds)', 'Box Jumps (3x15)', 'Burpees (3x15)', 'Mountain Climbers (3x20)'] }
      ]
    }
  }
]

export default function ClientDetailPage() {
  const params = useParams()
  const clientId = parseInt(params.id as string)
  const client = clients.find(c => c.id === clientId)
  
  const [activeTab, setActiveTab] = useState('overview')
  
  if (!client) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Client not found</h2>
        <p className="mt-2 text-gray-600">The client you are looking for does not exist.</p>
        <Link href="/trainer/clients" className="mt-4 inline-block text-primary-600 hover:underline">
          Back to clients
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/trainer/clients" className="text-gray-500 hover:text-gray-700">
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Client Profile</h1>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 bg-primary-100 text-primary-700 px-4 py-2 rounded-md hover:bg-primary-200">
            <FiMessageSquare className="h-4 w-4" />
            <span>Message</span>
          </button>
          <button className="flex items-center space-x-1 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600">
            <FiEdit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
      
      {/* Client Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={client.image}
                alt={client.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
              <p className="text-gray-500">
                {client.membership} • Joined {new Date(client.joinDate).toLocaleDateString()}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {client.goal}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Progress: {client.progress}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-start">
              <FiUser className="mt-1 mr-2 h-5 w-5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Info</h3>
                <p className="mt-1 text-sm text-gray-900">{client.email}</p>
                <p className="mt-1 text-sm text-gray-900">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FiBarChart2 className="mt-1 mr-2 h-5 w-5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Physical Stats</h3>
                <p className="mt-1 text-sm text-gray-900">Age: {client.age}</p>
                <p className="mt-1 text-sm text-gray-900">Height: {client.height}</p>
                <p className="mt-1 text-sm text-gray-900">Weight: {client.weight}</p>
              </div>
            </div>
            <div className="flex items-start">
              <FiCalendar className="mt-1 mr-2 h-5 w-5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sessions</h3>
                <p className="mt-1 text-sm text-gray-900">Last: {client.lastSession}</p>
                <p className="mt-1 text-sm text-gray-900">Next: {client.nextSession}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`${
                activeTab === 'sessions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Session History
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`${
                activeTab === 'progress'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Progress Tracking
            </button>
            <button
              onClick={() => setActiveTab('program')}
              className={`${
                activeTab === 'program'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Training Program
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Notes</h3>
              <p className="mt-2 text-gray-600">{client.notes}</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <div className="mt-2 space-y-4">
                  {client.sessions.slice(0, 3).map((session, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                          <FiActivity className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          {session.type} Session on {session.date}
                        </p>
                        <p className="text-sm text-gray-500">{session.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Latest Measurements</h3>
                <div className="mt-2 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Weight
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Body Fat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {client.measurements.slice(-2).map((measurement, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {measurement.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {measurement.weight}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {measurement.bodyFat}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {measurement.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Session History</h3>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm">
                  Add New Session
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
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
                        Notes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {client.sessions.map((session, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {session.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {session.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {session.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {session.notes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary-600 hover:text-primary-800">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Progress Tracking</h3>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm">
                  Add Measurement
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Weight Progress</h4>
                <div className="h-64 bg-white rounded-md border border-gray-200 p-4">
                  <p className="text-center text-gray-500 mt-24">Weight chart visualization would go here</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Body Fat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {client.measurements.map((measurement, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {measurement.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {measurement.weight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {measurement.bodyFat}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {measurement.notes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary-600 hover:text-primary-800">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Program Tab */}
          {activeTab === 'program' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{client.program.name}</h3>
                  <p className="text-sm text-gray-500">{client.program.description}</p>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm">
                  Edit Program
                </button>
              </div>
              
              <div className="mt-6 space-y-6">
                {client.program.workouts.map((workout, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-md font-medium text-gray-900">{workout.day}: {workout.focus}</h4>
                    <ul className="mt-2 space-y-2">
                      {workout.exercises.map((exercise, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-2"></span>
                          {exercise}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-md font-medium text-gray-900">Program Notes</h4>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    className="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add notes about the client's progress with this program..."
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm">
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
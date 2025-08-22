'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiSearch, FiFilter, FiUser, FiCalendar, FiBarChart2, FiClock } from 'react-icons/fi'

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
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: '/assets/img/testimonial/maria.jpg',
    membership: 'Standard',
    progress: 'Excellent',
    lastSession: 'Yesterday',
    nextSession: 'Friday, 11:00 AM',
    goal: 'Muscle Gain',
    joinDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    image: '/assets/img/testimonial/michael1.jpg',
    membership: 'Premium',
    progress: 'Fair',
    lastSession: '1 week ago',
    nextSession: 'Not scheduled',
    goal: 'Fitness Maintenance',
    joinDate: '2023-03-10'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    image: '/assets/img/testimonial/lucy.jpg',
    membership: 'Premium',
    progress: 'Good',
    lastSession: '3 days ago',
    nextSession: 'Thursday, 2:00 PM',
    goal: 'Flexibility',
    joinDate: '2023-04-05'
  }
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterMembership, setFilterMembership] = useState('all')
  const [filterProgress, setFilterProgress] = useState('all')
  
  // Lọc danh sách học viên
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMembership = filterMembership === 'all' || client.membership.toLowerCase() === filterMembership.toLowerCase()
    const matchesProgress = filterProgress === 'all' || client.progress.toLowerCase() === filterProgress.toLowerCase()
    
    return matchesSearch && matchesMembership && matchesProgress
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Clients</h1>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
          Add New Client
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={filterMembership}
              onChange={(e) => setFilterMembership(e.target.value)}
            >
              <option value="all">All Memberships</option>
              <option value="premium">Premium</option>
              <option value="standard">Standard</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <FiBarChart2 className="text-gray-400" />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={filterProgress}
              onChange={(e) => setFilterProgress(e.target.value)}
            >
              <option value="all">All Progress</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Link href={`/trainer/clients/${client.id}`} key={client.id}>
            <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-500">
                      {client.membership} • Joined {new Date(client.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <FiUser className="mr-2 text-gray-400" />
                    <span>Goal: {client.goal}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FiBarChart2 className="mr-2 text-gray-400" />
                    <span>Progress: {client.progress}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FiClock className="mr-2 text-gray-400" />
                    <span>Last session: {client.lastSession}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FiCalendar className="mr-2 text-gray-400" />
                    <span>Next session: {client.nextSession}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">View Details</span>
                    <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {client.progress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <FiUser className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
} 
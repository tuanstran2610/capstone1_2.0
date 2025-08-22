'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlus, FiSearch, FiFilter, FiCopy, FiEdit, FiTrash2 } from 'react-icons/fi'

// Dữ liệu mẫu
const programs = [
  {
    id: 1,
    name: 'Weight Loss Program',
    description: 'Focused on calorie deficit and increasing metabolism',
    category: 'Weight Loss',
    difficulty: 'Beginner',
    duration: '12 weeks',
    clients: 5,
    createdAt: '2023-01-15'
  },
  {
    id: 2,
    name: 'Muscle Building',
    description: 'Progressive overload with focus on hypertrophy',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    clients: 3,
    createdAt: '2023-02-10'
  },
  {
    id: 3,
    name: 'Flexibility & Mobility',
    description: 'Improve range of motion and joint health',
    category: 'Mobility',
    difficulty: 'Beginner',
    duration: '4 weeks',
    clients: 2,
    createdAt: '2023-03-05'
  },
  {
    id: 4,
    name: 'HIIT Circuit',
    description: 'High intensity interval training for fat loss',
    category: 'Cardio',
    difficulty: 'Advanced',
    duration: '6 weeks',
    clients: 4,
    createdAt: '2023-04-20'
  },
  {
    id: 5,
    name: 'Core Strength',
    description: 'Focus on abdominal and lower back strength',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: '4 weeks',
    clients: 0,
    createdAt: '2023-05-01'
  }
]

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  
  // Lọc chương trình tập
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || program.category.toLowerCase() === filterCategory.toLowerCase()
    const matchesDifficulty = filterDifficulty === 'all' || program.difficulty.toLowerCase() === filterDifficulty.toLowerCase()
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Training Programs</h1>
        <button className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md">
          <FiPlus className="h-5 w-5" />
          <span>Create Program</span>
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
              placeholder="Search programs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="weight loss">Weight Loss</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="mobility">Mobility</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Program List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.map((program) => (
                <tr key={program.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {program.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {program.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                      {program.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.difficulty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.clients}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <FiCopy className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No programs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new program or try adjusting your filters.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Program
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 
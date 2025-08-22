'use client'

import { useState } from 'react'
import { 
  FiUsers, 
  FiDollarSign, 
  FiActivity, 
  FiCalendar, 
  FiTrendingUp, 
  FiTrendingDown,
  FiDownload,
  FiFilter
} from 'react-icons/fi'

// Sample data
const membershipStats = {
  total: 245,
  active: 220,
  expired: 25,
  breakdown: {
    standard: 120,
    premium: 78,
    vip: 32,
    student: 56,
    corporate: 14
  },
  growth: {
    month: 12,
    percentage: 5.2
  }
}

const revenueStats = {
  total: 48500000,
  previousPeriod: 42000000,
  percentChange: 15.5,
  breakdown: {
    memberships: 32500000,
    ptSessions: 12000000,
    products: 4000000
  },
  monthly: [
    { month: 'Jan', value: 38000000 },
    { month: 'Feb', value: 40000000 },
    { month: 'Mar', value: 39000000 },
    { month: 'Apr', value: 42000000 },
    { month: 'May', value: 43500000 },
    { month: 'Jun', value: 45000000 },
    { month: 'Jul', value: 48500000 }
  ]
}

const attendanceStats = {
  daily: 85,
  weekly: 560,
  monthly: 2350,
  peakHours: [
    { hour: '06:00 - 08:00', count: 45 },
    { hour: '08:00 - 10:00', count: 65 },
    { hour: '10:00 - 12:00', count: 40 },
    { hour: '12:00 - 14:00', count: 30 },
    { hour: '14:00 - 16:00', count: 25 },
    { hour: '16:00 - 18:00', count: 70 },
    { hour: '18:00 - 20:00', count: 95 },
    { hour: '20:00 - 22:00', count: 50 }
  ],
  popularClasses: [
    { name: 'Basic Yoga', attendance: 95 },
    { name: 'Zumba', attendance: 90 },
    { name: 'Cardio HIIT', attendance: 85 },
    { name: 'Pilates', attendance: 75 },
    { name: 'Basic Bodybuilding', attendance: 65 }
  ]
}

const trainerStats = {
  total: 15,
  topRated: [
    { name: 'Sofia Wilson', rating: 4.9, sessions: 45 },
    { name: 'David Johnson', rating: 4.8, sessions: 42 },
    { name: 'Matt Smith', rating: 4.7, sessions: 38 },
    { name: 'Rosy Adams', rating: 4.6, sessions: 35 },
    { name: 'John Williams', rating: 4.5, sessions: 32 }
  ]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month')
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Data Analytics</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-primary-100 rounded-md bg-primary-200 text-white focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <button className="flex items-center px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors">
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-primary-300 overflow-hidden shadow-2xl rounded-lg border border-primary-100">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-accent/20 rounded-md p-3">
                <FiUsers className="h-6 w-6 text-accent" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-300 truncate">
                    Total Members
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-lg font-medium text-white">
                        {membershipStats.total}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-400" />
                        <span className="ml-1">{membershipStats.growth.percentage}%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-300 overflow-hidden shadow-2xl rounded-lg border border-primary-100">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-900/30 rounded-md p-3 border border-green-500/30">
                <FiDollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-300 truncate">
                    Revenue
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-lg font-medium text-white">
                        {formatCurrency(revenueStats.total)}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-400" />
                        <span className="ml-1">{revenueStats.percentChange}%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-300 overflow-hidden shadow-2xl rounded-lg border border-primary-100">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-900/30 rounded-md p-3 border border-blue-500/30">
                <FiActivity className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-300 truncate">
                    Daily Attendance
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-lg font-medium text-white">
                        {attendanceStats.daily}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-400" />
                        <span className="ml-1">3.2%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <FiCalendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Classes
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-lg font-medium text-gray-900">
                        24
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                        <span className="ml-1">2.5%</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Chart</h2>
        <div className="h-80 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Revenue chart over time will be displayed here</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-indigo-50 p-3 rounded-lg">
            <div className="text-sm text-indigo-600 font-medium">Memberships</div>
            <div className="mt-1 text-lg font-bold">{formatCurrency(revenueStats.breakdown.memberships)}</div>
            <div className="mt-1 text-xs text-gray-500">
              {Math.round(revenueStats.breakdown.memberships / revenueStats.total * 100)}% of total revenue
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-green-600 font-medium">PT Sessions</div>
            <div className="mt-1 text-lg font-bold">{formatCurrency(revenueStats.breakdown.ptSessions)}</div>
            <div className="mt-1 text-xs text-gray-500">
              {Math.round(revenueStats.breakdown.ptSessions / revenueStats.total * 100)}% of total revenue
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">Products</div>
            <div className="mt-1 text-lg font-bold">{formatCurrency(revenueStats.breakdown.products)}</div>
            <div className="mt-1 text-xs text-gray-500">
              {Math.round(revenueStats.breakdown.products / revenueStats.total * 100)}% of total revenue
            </div>
          </div>
        </div>
      </div>
      
      {/* Membership & Attendance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Membership Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Membership Analysis</h2>
          <div className="h-64 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center mb-4">
            <p className="text-gray-500">Membership plan distribution chart will be displayed here</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Active Members</div>
              <div className="mt-1 text-lg font-bold">{membershipStats.active}</div>
              <div className="mt-1 text-xs text-gray-500">
                {Math.round(membershipStats.active / membershipStats.total * 100)}% of total members
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-sm text-red-600 font-medium">Expired Members</div>
              <div className="mt-1 text-lg font-bold">{membershipStats.expired}</div>
              <div className="mt-1 text-xs text-gray-500">
                {Math.round(membershipStats.expired / membershipStats.total * 100)}% of total members
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendance Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Attendance Analysis</h2>
          <div className="h-64 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center mb-4">
            <p className="text-gray-500">Peak hours chart will be displayed here</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Daily</div>
              <div className="mt-1 text-lg font-bold">{attendanceStats.daily}</div>
              <div className="mt-1 text-xs text-gray-500">Attendance</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Weekly</div>
              <div className="mt-1 text-lg font-bold">{attendanceStats.weekly}</div>
              <div className="mt-1 text-xs text-gray-500">Attendance</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Monthly</div>
              <div className="mt-1 text-lg font-bold">{attendanceStats.monthly}</div>
              <div className="mt-1 text-xs text-gray-500">Attendance</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Classes & Top Trainers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Popular Classes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Popular Classes</h2>
          <div className="space-y-4">
            {attendanceStats.popularClasses.map((cls, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-8 text-sm font-medium text-gray-500">#{index + 1}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{cls.name}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${(cls.attendance / attendanceStats.popularClasses[0].attendance) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 text-sm font-medium text-gray-500">{cls.attendance} people</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Trainers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Trainers</h2>
          <div className="space-y-4">
            {trainerStats.topRated.map((trainer, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-8 text-sm font-medium text-gray-500">#{index + 1}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(trainer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-500">{trainer.rating}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 text-sm font-medium text-gray-500">{trainer.sessions} sessions</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 font-medium">Retention Rate</div>
            <div className="mt-1 text-2xl font-bold text-indigo-600">89%</div>
            <div className="mt-1 flex items-center text-xs">
              <FiTrendingUp className="text-green-500 mr-1" />
              <span className="text-green-500">2.1%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 font-medium">Conversion Rate</div>
            <div className="mt-1 text-2xl font-bold text-indigo-600">42%</div>
            <div className="mt-1 flex items-center text-xs">
              <FiTrendingUp className="text-green-500 mr-1" />
              <span className="text-green-500">3.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 font-medium">PT Usage Rate</div>
            <div className="mt-1 text-2xl font-bold text-indigo-600">28%</div>
            <div className="mt-1 flex items-center text-xs">
              <FiTrendingDown className="text-red-500 mr-1" />
              <span className="text-red-500">1.2%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 font-medium">Average Time</div>
            <div className="mt-1 text-2xl font-bold text-indigo-600">72 minutes</div>
            <div className="mt-1 flex items-center text-xs">
              <FiTrendingUp className="text-green-500 mr-1" />
              <span className="text-green-500">5 minutes</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
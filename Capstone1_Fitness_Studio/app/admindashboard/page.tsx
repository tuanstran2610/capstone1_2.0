'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FiUsers, 
  FiActivity, 
  FiDollarSign, 
  FiTrendingUp, 
  FiCalendar,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi'

// Sample data
const stats = [
  { name: 'Total Users', value: '245', icon: FiUsers, change: '+12%', changeType: 'increase' },
  { name: 'Active Trainers', value: '15', icon: FiActivity, change: '+3%', changeType: 'increase' },
  { name: 'Monthly Revenue', value: '12,500,000₫', icon: FiDollarSign, change: '+8%', changeType: 'increase' },
  { name: 'New Members', value: '24', icon: FiTrendingUp, change: '+18%', changeType: 'increase' },
]

const recentActivity = [
  { 
    id: 1, 
    user: 'Nguyen Van A', 
    action: 'registered for Premium package', 
    time: '2 hours ago',
    type: 'membership'
  },
  { 
    id: 2, 
    user: 'Tran Thi B', 
    action: 'scheduled session with Trainer Minh', 
    time: '4 hours ago',
    type: 'session'
  },
  { 
    id: 3, 
    user: 'Le Van C', 
    action: 'completed trainer registration', 
    time: '1 day ago',
    type: 'trainer'
  },
  { 
    id: 4, 
    user: 'Pham Thi D', 
    action: 'cancelled membership package', 
    time: '2 days ago',
    type: 'membership'
  },
  { 
    id: 5, 
    user: 'Hoang Van E', 
    action: 'requested refund', 
    time: '3 days ago',
    type: 'payment'
  }
]

const issues = [
  { 
    id: 1, 
    title: 'Payment system error', 
    description: 'Users report issues with payment processing',
    status: 'high',
    time: '2 hours ago'
  },
  { 
    id: 2, 
    title: 'Trainer schedule conflict', 
    description: 'Detected overlapping bookings for Trainer Minh',
    status: 'medium',
    time: '1 day ago'
  },
  { 
    id: 3, 
    title: 'Membership upgrade issue', 
    description: 'Upgrade from Standard to Premium not displaying correctly',
    status: 'low',
    time: '3 days ago'
  }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('activity')
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="text-sm text-gray-300">
          Today: {new Date().toLocaleDateString('en-US')}
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-primary-300 rounded-lg shadow-2xl p-6 border border-primary-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-300 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <FiArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-400" />
                      ) : (
                        <FiArrowDown className="self-center flex-shrink-0 h-4 w-4 text-red-400" />
                      )}
                      <span className="sr-only">{stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="bg-primary-300 overflow-hidden shadow-2xl rounded-lg border border-primary-100">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-white mb-4">Revenue Overview</h2>
            <div className="h-64 bg-primary-200 rounded-md border border-primary-100 flex items-center justify-center">
              <p className="text-gray-300">Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-300 overflow-hidden shadow-2xl rounded-lg border border-primary-100">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-white mb-4">User Growth</h2>
            <div className="h-64 bg-primary-200 rounded-md border border-primary-100 flex items-center justify-center">
              <p className="text-gray-300">User growth chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-primary-300 shadow-2xl rounded-lg border border-primary-100">
        <div className="border-b border-primary-100">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('activity')}
              className={`${
                activeTab === 'activity'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-primary-100'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => setActiveTab('trainers')}
              className={`${
                activeTab === 'trainers'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-primary-100'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
            >
              Trainer Applications
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`${
                activeTab === 'issues'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-primary-100'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm transition-colors`}
            >
              Issues
            </button>
          </nav>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {/* Recent Activity Tab */}
          {activeTab === 'activity' && (
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-primary-100"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        <div>
                          <div className="relative px-1">
                            <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center ring-8 ring-primary-300">
                              {activity.type === 'membership' && (
                                <FiUsers className="h-5 w-5 text-accent" />
                              )}
                              {activity.type === 'session' && (
                                <FiCalendar className="h-5 w-5 text-accent" />
                              )}
                              {activity.type === 'trainer' && (
                                <FiActivity className="h-5 w-5 text-accent" />
                              )}
                              {activity.type === 'payment' && (
                                <FiDollarSign className="h-5 w-5 text-accent" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {activity.user}
                            </div>
                            <p className="mt-0.5 text-sm text-gray-300">
                              {activity.action}
                            </p>
                          </div>
                          <div className="mt-2 text-sm text-gray-400">
                            <p>{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <Link href="/admindashboard/activity" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  View All Activities
                </Link>
              </div>
            </div>
          )}
          
          {/* Trainer Applications Tab */}
          {activeTab === 'trainers' && (
            <div className="overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">New Trainer Applications</h3>
                <span className="bg-accent/20 text-accent text-xs font-medium px-2.5 py-0.5 rounded-full border border-accent/30">
                  3 new applications
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary-100">
                  <thead className="bg-primary-200">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Specialization
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Submit Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-primary-300 divide-y divide-primary-100">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">Nguyen Van Minh</div>
                        <div className="text-sm text-gray-300">nguyenvanminh@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">Yoga, Pilates</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">10/07/2023</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900/30 text-yellow-300 border border-yellow-500/30">
                          Under Review
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-accent hover:text-accent/80 mr-4 transition-colors">View</a>
                        <a href="#" className="text-green-400 hover:text-green-300 mr-4 transition-colors">Accept</a>
                        <a href="#" className="text-red-400 hover:text-red-300 transition-colors">Reject</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">Trần Thị Hương</div>
                        <div className="text-sm text-gray-300">tranthihuong@example.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">Cardio, HIIT</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">08/07/2023</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-900/30 text-yellow-300 border border-yellow-500/30">
                          Under Review
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-accent hover:text-accent/80 mr-4 transition-colors">View</a>
                        <a href="#" className="text-green-400 hover:text-green-300 mr-4 transition-colors">Accept</a>
                        <a href="#" className="text-red-400 hover:text-red-300 transition-colors">Reject</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div 
                  key={issue.id} 
                  className={`border-l-4 ${
                    issue.status === 'high' 
                      ? 'border-red-500' 
                      : issue.status === 'medium'
                        ? 'border-yellow-500'
                        : 'border-green-500'
                  } bg-primary-200 p-4 shadow-2xl rounded-r-lg border border-primary-100`}
                >
                  <div className="flex justify-between">
                    <h3 className="text-md font-medium text-white">{issue.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      issue.status === 'high' 
                        ? 'bg-red-900/30 text-red-300 border border-red-500/30' 
                        : issue.status === 'medium'
                          ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30'
                          : 'bg-green-900/30 text-green-300 border border-green-500/30'
                    }`}>
                      {issue.status === 'high' 
                        ? 'High' 
                        : issue.status === 'medium'
                          ? 'Medium'
                          : 'Low'
                      }
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-300">{issue.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{issue.time}</span>
                    <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link href="/admindashboard/issues" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  View All Issues
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-primary-300 shadow-2xl rounded-lg p-6 border border-primary-100">
        <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Link href="/admindashboard/users/new" className="bg-primary-200 hover:bg-primary-100 p-4 rounded-lg flex flex-col items-center justify-center border border-primary-100 transition-colors">
            <FiUsers className="h-6 w-6 text-accent" />
            <span className="mt-2 text-sm font-medium text-white">Add User</span>
          </Link>
          <Link href="/admindashboard/classes/new" className="bg-primary-200 hover:bg-primary-100 p-4 rounded-lg flex flex-col items-center justify-center border border-primary-100 transition-colors">
            <FiCalendar className="h-6 w-6 text-accent" />
            <span className="mt-2 text-sm font-medium text-white">Create New Class</span>
          </Link>
          <Link href="/admindashboard/financial/reports" className="bg-primary-200 hover:bg-primary-100 p-4 rounded-lg flex flex-col items-center justify-center border border-primary-100 transition-colors">
            <FiDollarSign className="h-6 w-6 text-accent" />
            <span className="mt-2 text-sm font-medium text-white">Financial Reports</span>
          </Link>
          <Link href="/admindashboard/communications/announcement" className="bg-primary-200 hover:bg-primary-100 p-4 rounded-lg flex flex-col items-center justify-center border border-primary-100 transition-colors">
            <FiAlertCircle className="h-6 w-6 text-accent" />
            <span className="mt-2 text-sm font-medium text-white">Create Announcement</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 
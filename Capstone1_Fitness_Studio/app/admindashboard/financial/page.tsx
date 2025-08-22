'use client'

import { useState } from 'react'
import { 
  FiDollarSign, 
  FiCalendar, 
  FiDownload, 
  FiFilter,
  FiCreditCard,
  FiUsers,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiSearch
} from 'react-icons/fi'

// Sample data
const revenueData = {
  total: 48500000,
  lastMonth: 42000000,
  percentChange: 15.5,
  breakdown: {
    memberships: 32500000,
    ptSessions: 12000000,
    products: 4000000
  }
}

const transactions = [
  {
    id: 'TRX-001',
    date: '2023-07-10',
    user: 'Nguyen Van A',
    description: 'Premium plan registration',
    amount: 800000,
    type: 'membership',
    status: 'completed'
  },
  {
    id: 'TRX-002',
    date: '2023-07-09',
    user: 'Tran Thi B',
    description: 'PT session booking (4 sessions)',
    amount: 1600000,
    type: 'pt',
    status: 'completed'
  },
  {
    id: 'TRX-003',
    date: '2023-07-08',
    user: 'Le Van C',
    description: 'Product purchase: Protein Whey',
    amount: 650000,
    type: 'product',
    status: 'completed'
  },
  {
    id: 'TRX-004',
    date: '2023-07-07',
    user: 'Pham Thi D',
    description: 'VIP plan registration',
    amount: 1200000,
    type: 'membership',
    status: 'completed'
  },
  {
    id: 'TRX-005',
    date: '2023-07-06',
    user: 'Hoang Van E',
    description: 'PT session booking (2 sessions)',
    amount: 800000,
    type: 'pt',
    status: 'pending'
  },
  {
    id: 'TRX-006',
    date: '2023-07-05',
    user: 'Ngo Thi F',
    description: 'Standard plan registration',
    amount: 500000,
    type: 'membership',
    status: 'refunded'
  }
]

export default function FinancialPage() {
  const [dateRange, setDateRange] = useState('month')
  const [transactionType, setTransactionType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = transactionType === 'all' || transaction.type === transactionType
    
    return matchesSearch && matchesType
  })
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Financial Management</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors">
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-300 rounded-lg shadow-2xl p-6 border border-primary-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-accent/20 rounded-md p-3">
              <FiDollarSign className="h-6 w-6 text-accent" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-300 truncate">Total Revenue</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-white">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(revenueData.total)}
                  </div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                    <FiArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-400" />
                    <span className="ml-1">{revenueData.percentChange}%</span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-300 rounded-lg shadow-2xl p-6 border border-primary-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-900/30 rounded-md p-3 border border-green-500/30">
              <FiUsers className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-300 truncate">Memberships</dt>
                <dd className="text-2xl font-semibold text-white">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(revenueData.breakdown.memberships)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-300 rounded-lg shadow-2xl p-6 border border-primary-100">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-900/30 rounded-md p-3 border border-blue-500/30">
              <FiActivity className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-300 truncate">PT Sessions</dt>
                <dd className="text-2xl font-semibold text-white">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(revenueData.breakdown.ptSessions)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
          <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
            <FiDownload className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
          <div className="relative max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
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
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="membership">Membership</option>
                <option value="pt">PT Sessions</option>
                <option value="product">Products</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-gray-400" />
              <input
                type="date"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'membership' 
                        ? 'bg-blue-100 text-blue-800' 
                        : transaction.type === 'pt'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}>
                      {transaction.type === 'membership' ? 'Membership' : 
                       transaction.type === 'pt' ? 'PT Session' : 'Product'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status === 'completed' ? 'Completed' : 
                       transaction.status === 'pending' ? 'Pending' : 'Refunded'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of{' '}
            <span className="font-medium">{filteredTransactions.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FiDollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">Generate Financial Report</h3>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Create detailed financial reports for custom time periods
          </p>
          <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FiCreditCard className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">Payment Management</h3>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Configure payment methods and process refunds
          </p>
          <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md">
            Manage
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">Commission Management</h3>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Set up and track commissions for trainers
          </p>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Settings
          </button>
        </div>
      </div>
    </div>
  )
} 
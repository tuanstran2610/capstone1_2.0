'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiCalendar, FiUsers, FiClipboard, FiHome, FiUser, FiArrowLeft } from 'react-icons/fi'

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const navigation = [
    { name: 'Dashboard', href: '/trainer', icon: FiHome },
    { name: 'Schedule', href: '/trainer/schedule', icon: FiCalendar },
    { name: 'Clients', href: '/trainer/clients', icon: FiUsers },
    { name: 'Programs', href: '/trainer/programs', icon: FiClipboard },
    { name: 'Profile', href: '/trainer/profile', icon: FiUser },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-primary-200">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-xl font-bold text-white">Trainer Portal</h2>
          </div>
          <div className="mt-8 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {/* Home button */}
              <Link
                href="/"
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-white hover:bg-primary-300"
              >
                <FiArrowLeft className="mr-3 h-5 w-5 text-white" />
                Back to Homepage
              </Link>
              
              <div className="border-t border-primary-300 my-3"></div>
              
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-300 text-white'
                        : 'text-white hover:bg-primary-300'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-white' : 'text-white'
                      }`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden bg-primary-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Trainer Portal</h2>
          <Link href="/" className="text-white p-2 rounded-full hover:bg-primary-300">
            <FiArrowLeft className="h-6 w-6" />
          </Link>
        </div>
        <nav className="flex overflow-x-auto py-4 gap-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center px-2 py-1 text-xs font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-300 text-white'
                    : 'text-white hover:bg-primary-300'
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? 'text-white' : 'text-white'
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 
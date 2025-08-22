'use client'

import { FaShieldAlt } from 'react-icons/fa'

type MembershipPlan = {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

type CheckoutSummaryProps = {
  plan: MembershipPlan
  step: number
}

const formatPrice = (price: number) => {
  // Convert VND to USD (approximate rate: 1 USD = 24,000 VND)
  const usdPrice = price / 24000
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(usdPrice)
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ plan, step }) => {
  // Total amount (no VAT)
  const totalAmount = plan.price

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Membership Plan:</span>
          <span>{plan.name}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Duration:</span>
          <span>{plan.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Plan Price:</span>
          <span>{formatPrice(plan.price)}</span>
        </div>
      </div>
      

      
      <div className="flex justify-between mb-6">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-lg font-bold text-accent">{formatPrice(totalAmount)}</span>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <div className="flex items-start">
          <FaShieldAlt className="text-accent mt-1 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium">7-Day Money Back Guarantee</h4>
            <p className="text-sm text-gray-600">
              If you're not satisfied with our service, you can request a refund within 7 days of registration.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        <p>
          By continuing, you agree to our{' '}
          <a href="#" className="text-accent hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-accent hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  )
}

export default CheckoutSummary 
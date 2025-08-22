'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaStar } from 'react-icons/fa'

type MembershipPlan = {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

type MembershipSelectorProps = {
  plans: MembershipPlan[]
  onSelect: (plan: MembershipPlan) => void
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

const MembershipSelector: React.FC<MembershipSelectorProps> = ({ plans, onSelect }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans.find(p => p.popular)?.id || plans[0].id)

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlanId(plan.id)
  }

  const handleContinue = () => {
    const selectedPlan = plans.find(p => p.id === selectedPlanId)
    if (selectedPlan) {
      onSelect(selectedPlan)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Membership Plan</h2>
      <p className="text-gray-600 mb-8">
        Select a membership plan that fits your training needs
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border-2 p-6 transition-all ${
              selectedPlanId === plan.id
                ? 'border-accent shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 -right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <FaStar className="mr-1" /> Popular
              </div>
            )}

            <div 
              className="cursor-pointer"
              onClick={() => handleSelectPlan(plan)}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                <span className="text-gray-500">/{plan.duration}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-accent mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                handleSelectPlan(plan)
                handleContinue()
              }}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                selectedPlanId === plan.id
                  ? 'bg-accent text-white hover:bg-accent/90'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {selectedPlanId === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-md text-lg transition-colors"
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}

export default MembershipSelector 
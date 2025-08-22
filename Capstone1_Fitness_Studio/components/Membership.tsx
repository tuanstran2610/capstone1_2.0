'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'
import { FaCheck } from 'react-icons/fa'
import Link from 'next/link'

// Pricing plans data
const plans = [
  {
    id: 'standard',
    name: 'Standard',
    price: 500000,
    duration: '1 month',
    features: [
      'Gym access',
      'Personal locker',
      'Shower room',
      'Join 2 group classes/week',
      'Basic fitness assessment'
    ],
    isPopular: false,
    btnText: 'Choose Plan'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 800000,
    duration: '1 month',
    features: [
      'All Standard features',
      'Unlimited group class access',
      'Personal nutrition consultation',
      '1 PT session/month',
      'Spa access',
      'Free nutritional drinks'
    ],
    isPopular: false,
    btnText: 'Choose Plan'
  }
]

// Format price from VND to USD
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

// Plan card component
const PlanCard = ({ plan, index }: { plan: any; index: number }) => {
  return (
    <motion.div
      variants={fadeIn('up', 0.2 * index)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`w-full md:w-1/2 px-4 mb-8`}
    >
      <div 
        className="bg-white rounded-lg shadow-xl overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-105 relative border border-gray-200"
      >

        
        {/* Plan header */}
        <div 
          className="p-6 text-center bg-gray-50"
        >
          <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
          <div className="flex items-end justify-center mb-4">
            <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
            <span className="text-gray-500 ml-1">/{plan.duration}</span>
          </div>
        </div>
        
        {/* Features list */}
        <div className="p-6 flex-grow">
          <ul className="space-y-3">
            {plan.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA button */}
        <div className="p-6 pt-0">
          <Link href={`/checkout?plan=${plan.id}`}>
            <button 
              className={`w-full py-3 px-4 rounded-lg transition-colors duration-300 ${
                plan.isPopular 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                  : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            >
              {plan.btnText}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const Membership = () => {
  return (
    <section className="py-16 bg-gray-50" id="membership">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Membership Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect membership plan that fits your fitness goals and budget. 
            Join our community today and transform your life.
          </p>
        </motion.div>
        
        {/* Plans grid */}
        <div className="flex flex-wrap -mx-4 justify-center">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
        
        {/* Additional info */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-12 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4">
            Special Offers
          </h3>
          <div className="space-y-4">
            <p className="flex items-center justify-center">
              <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">NEW</span>
              Sign up today and get your first month at 50% off!
            </p>
            <p>Annual memberships available with 2 months free.</p>
            <p>Student and senior discounts available with valid ID.</p>
          </div>
          <div className="mt-6">
            <Link href="/checkout" className="inline-block bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-lg transition-colors duration-300">
              Sign up now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Membership

'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'

// Brand logos data
const brands = [
  {
    id: 1,
    name: 'Brand 1',
    image: '/assets/img/brands/brand-1.png',
  },
  {
    id: 2,
    name: 'Brand 2',
    image: '/assets/img/brands/brand-2.png',
  },
  {
    id: 3,
    name: 'Brand 3',
    image: '/assets/img/brands/brand-3.png',
  },
  {
    id: 4,
    name: 'Brand 4',
    image: '/assets/img/brands/brand-4.png',
  },
  {
    id: 5,
    name: 'Brand 5',
    image: '/assets/img/brands/brand-5.png',
  }
]

const Brands = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-200" id="brands">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with leading brands in fitness and nutrition to bring you the best experience.
          </p>
        </motion.div>
        
        {/* Brands grid */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
        >
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="w-[120px] md:w-[150px] h-[80px] relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <Image 
                src={brand.image} 
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Brands

'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Jennifer Smith',
    role: 'Member since 2021',
    image: '/assets/img/testimonial/lucy.jpg',
    rating: 5,
    text: 'Joining this fitness studio was one of the best decisions I\'ve made. The trainers are incredibly knowledgeable and supportive. I\'ve lost 30 pounds and gained so much confidence!'
  },
  {
    id: 2,
    name: 'Michael Johnson',
    role: 'Member since 2020',
    image: '/assets/img/testimonial/maria.jpg',
    rating: 5,
    text: 'The community here is amazing! Everyone is so supportive and the facilities are top-notch. After trying many gyms over the years, I\'ve finally found my fitness home.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Member since 2022',
    image: '/assets/img/testimonial/michael.jpg',
    rating: 4,
    text: 'The variety of classes keeps me motivated and excited to work out. The yoga and HIIT classes are my favorites, and the instructors really push you to your best potential.'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Member since 2019',
    image: '/assets/img/testimonial/michael1.jpg',
    rating: 5,
    text: 'As someone who was intimidated by gyms, the welcoming atmosphere here made all the difference. The staff is friendly and the personalized training programs have helped me achieve results I never thought possible.'
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  
  // Handle autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000) // Change slide every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoplay])
  
  // Navigation handlers
  const goToPrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }
  
  const goToNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }
  
  const goToSlide = (index: number) => {
    setAutoplay(false)
    setCurrentIndex(index)
  }
  
  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <section className="py-16 bg-gray-900 text-white" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Members Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our community of members who have transformed their lives with us.
          </p>
        </motion.div>
        
        {/* Testimonial slider */}
        <div className="max-w-4xl mx-auto relative">
          {/* Large quote icon */}
          <div className="absolute -top-10 left-0 opacity-10">
            <FaQuoteLeft className="text-6xl text-rose-400" />
          </div>
          
          {/* Current testimonial */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-8 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center mb-6">
              {/* Image */}
              <div className="mb-4 md:mb-0 md:mr-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-rose-400">
                  <Image 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Name, role and rating */}
              <div className="text-center md:text-left">
                <h4 className="text-xl font-semibold">{testimonials[currentIndex].name}</h4>
                <p className="text-rose-400 text-sm">{testimonials[currentIndex].role}</p>
                <div className="flex mt-2 justify-center md:justify-start">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>
            </div>
            
            {/* Testimonial text */}
            <p className="text-gray-300 italic text-lg">"{testimonials[currentIndex].text}"</p>
          </motion.div>
          
          {/* Navigation arrows */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={goToPrev} 
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft />
            </button>
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-rose-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext} 
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Ready to start your fitness journey?
          </h3>
          <a 
            href="#membership" 
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Join Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials 
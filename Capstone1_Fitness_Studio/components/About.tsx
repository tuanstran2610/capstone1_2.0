'use client'
import React from 'react'
import Image from 'next/image'
import { FaUser, FaCheckCircle } from 'react-icons/fa'
import { IoIosPricetag } from 'react-icons/io'
import { FaDumbbell } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'
import Achievements from './Achievements'
import CustomButton from './CustomButton'

const features = [
  {
    icon: <FaUser />,
    title: 'Expert Trainers',
    description: 'Our certified trainers create personalized plans to help you achieve your fitness goals efficiently and safely.'
  },
  {
    icon: <IoIosPricetag />,
    title: 'Affordable Pricing',
    description: 'We offer flexible membership options and competitive pricing to make fitness accessible for everyone.'
  },
  {
    icon: <FaDumbbell />,
    title: 'Premium Equipment',
    description: 'Train with state-of-the-art equipment designed to enhance your workout experience and maximize results.'
  },
]

const benefits = [
  "Personalized fitness assessment and goal setting",
  "Access to all group classes and specialized training zones",
  "Nutrition guidance and meal planning support",
  "Regular progress tracking and program adjustments",
  "Supportive community of like-minded fitness enthusiasts"
]

const About = () => {
  return (
    <section className='pt-16 pb-20 bg-white' id='about'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center gap-2 mb-16'>
          <motion.span
            variants={(fadeIn('up', 0.2))}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className='text-rose-500 uppercase tracking-[4px] font-medium'
          >
            About Our Studio
          </motion.span>
          <motion.h2
            variants={(fadeIn('up', 0.4))}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className='h2 text-center'
          >
            Your Fitness Journey Starts Here
          </motion.h2>
          <motion.p
            variants={(fadeIn('up', 0.6))}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className='max-w-[700px] mx-auto text-center text-gray-600 mb-12'
          >
            We are a team of dedicated fitness professionals committed to helping you transform your life through personalized training, nutrition guidance, and unwavering support every step of the way.
          </motion.p>
        </div>
        
        {/* About content with image */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20'>
          {/* Image column */}
          <motion.div
            variants={(fadeIn('right', 0.4))}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className='relative h-[500px] rounded-lg overflow-hidden'
          >
            <Image 
              src="/assets/img/about/about-main.jpg" 
              alt="About our fitness studio" 
              fill
              className='object-cover'
            />
            <div className='absolute bottom-0 left-0 bg-rose-500 text-white py-4 px-6'>
              <p className='text-xl font-semibold'>10+ Years of Excellence</p>
            </div>
          </motion.div>
          
          {/* Content column */}
          <motion.div
            variants={(fadeIn('left', 0.4))}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className='flex flex-col justify-center'
          >
            <h3 className='text-2xl font-bold mb-6'>We Help You Achieve Your Fitness Goals</h3>
            <p className='text-gray-600 mb-6'>
              At Fitness Studio, we believe that fitness is not just about physical transformation but about creating a healthier, happier lifestyle. Our approach combines effective workouts, nutritional guidance, and mental wellness to help you achieve sustainable results.
            </p>
            
            <div className='mb-8'>
              <h4 className='font-semibold mb-4'>What sets us apart:</h4>
              <ul className='space-y-3'>
                {benefits.map((benefit, index) => (
                  <li key={index} className='flex items-start'>
                    <FaCheckCircle className='text-rose-500 mt-1 mr-3 flex-shrink-0' />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <CustomButton 
              text="Join Our Community" 
              containerStyles="w-[220px] h-[56px]" 
              href="#membership"
            />
          </motion.div>
        </div>
        
        {/* Features */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='flex flex-col items-center gap-4 border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                className='text-4xl bg-rose-500 text-white w-[80px] h-[80px] rounded-full flex items-center justify-center'
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <motion.h4
                className='text-xl font-bold text-gray-800'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {feature.title}
              </motion.h4>
              <motion.p
                className='text-gray-600 text-center'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
        
        {/* Achievements */}
        <motion.div 
          variants={(fadeIn('up', 0.8))}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Achievements />
        </motion.div>
      </div>
    </section>
  )
}

export default About

'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'
import CustomButton from './CustomButton'
import Image from 'next/image'

const classes = [
  {
    name: 'Body Building',
    description: 'Build strength, increase muscle mass, and sculpt your physique with our professional bodybuilding program designed for all experience levels.',
    image: '/assets/img/classes/bodybuilding.jpg',
    schedule: 'Mon, Wed, Fri • 6:00 PM'
  },
  {
    name: 'Cardio',
    description: 'Boost your cardiovascular health and burn calories with high-energy cardio sessions that combine HIIT, dance, and endurance training.',
    image: '/assets/img/classes/cardio.jpg',
    schedule: 'Tue, Thu • 7:30 AM'
  },
  {
    name: 'CrossFit',
    description: 'Challenge yourself with our CrossFit program that combines functional movements, weightlifting, and high-intensity interval training.',
    image: '/assets/img/classes/crossfit.jpg',
    schedule: 'Mon, Wed, Fri • 5:30 PM'
  },
  {
    name: 'Fitness',
    description: 'Improve your overall fitness with our comprehensive program that focuses on strength, flexibility, balance, and cardiovascular health.',
    image: '/assets/img/classes/fitness.jpg',
    schedule: 'Tue, Thu, Sat • 9:00 AM'
  }
]

const Classes = () => {
  return (
    <section className='py-16' id='classes'>
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Classes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of fitness classes designed to help you achieve your health and fitness goals.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        variants={fadeIn('up', 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className='grid grid-cols-1 lg:grid-cols-2'>
        {classes.map((item, index) => (
          <div 
            className='relative w-full h-[350px] lg:h-[485px] flex flex-col justify-center items-center group overflow-hidden' 
            key={index}
          >
            {/*overlay*/}
            <div className='bg-black/60 absolute w-full h-full top-0 z-10 transition-colors duration-300 group-hover:bg-black/70'></div>
            <Image 
              src={item.image} 
              fill 
              className='object-cover transition-transform duration-500 group-hover:scale-105' 
              alt={`${item.name} class`}
              priority={index < 2} // Load first two images with priority
            />
            
            {/*text & btn*/}
            <div className='z-30 max-w-[380px] text-center flex flex-col items-center justify-center gap-4 px-6'>
              <motion.div
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="bg-rose-500/20 px-3 py-1 rounded-full mb-1"
              >
                <span className="text-xs text-rose-200">{item.schedule}</span>
              </motion.div>
              
              <motion.h3
                variants={fadeIn('up', 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className='h3 text-accent uppercase'>
                {item.name}
              </motion.h3>
              
              <motion.p
                variants={fadeIn('up', 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className='text-white'>
                {item.description}
              </motion.p>
              
              <motion.div
                variants={fadeIn('up', 0.8)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}>
                <CustomButton 
                  containerStyles='w-[164px] h-[46px] hover:bg-rose-600 transition-colors duration-300' 
                  text='Join Class' 
                  href='/checkout'
                />
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

export default Classes

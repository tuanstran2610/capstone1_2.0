'use client'

import React, { useRef } from 'react'
import CountUp from 'react-countup'
import { FaBriefcase, FaClock, FaTrophy } from 'react-icons/fa'
import { ImUsers } from 'react-icons/im'
import { motion, useInView } from 'framer-motion'

/* ─── Data ─── */
const status = [
  { number: 19,  icon: FaBriefcase, text: 'TRAINING COURSES', description: 'Expert-led fitness courses' },
  { number: 879, icon: FaClock,     text: 'WORKING HOURS', description: 'Dedicated to your fitness' },
  { number: 150, icon: ImUsers,     text: 'HAPPY CUSTOMERS', description: 'Achieving their goals' },
  { number: 9,   icon: FaTrophy,    text: 'INTERNATIONAL AWARDS', description: 'For excellence in fitness' }
]

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.5 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

/* ─── Item component ─── */
const StatItem = ({
  number,
  Icon,
  text,
  description
}: {
  number: number
  Icon: any
  text: string
  description: string
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: false })  // replay every time

  return (
    <motion.div
      variants={itemVariants}
      className="w-full sm:w-1/2 md:w-1/4 flex flex-col items-center text-center px-4 mb-10 hover:transform hover:scale-105 transition-transform duration-300"
    >
      {/* Count‑up circle */}
      <div
        ref={ref}
        className="w-[140px] h-[140px] border-4 border-rose-400 rounded-full flex items-center justify-center text-4xl font-semibold mb-5 shadow-lg bg-white relative overflow-hidden group"
        aria-label={`${number} ${text}`}
      >
        <div className="absolute inset-0 bg-rose-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        {inView && (
          <CountUp
            key={inView ? 'visible' : 'hidden'}  // remount → restart
            start={0}
            end={number}
            duration={3}
            separator=","
          />
        )}
      </div>

      {/* Icon & label */}
      <Icon className="text-3xl mb-3 text-rose-500" aria-hidden="true" />
      <h4 className="text-sm font-bold uppercase tracking-wide mb-2">{text}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  )
}

/* ─── Main component ─── */
const Achievements = () => {
  return (
    <section className="py-16 bg-white" id="achievements">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We take pride in our journey and the milestones we've reached together with our community.</p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}  // replay container fade/stagger
          className="flex flex-wrap justify-center items-start"
        >
          {status.map(({ number, icon: Icon, text, description }) => (
            <StatItem 
              key={text} 
              number={number} 
              Icon={Icon} 
              text={text} 
              description={description} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
  
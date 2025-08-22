'use client'
import React from 'react'
import HeroSlider from "./HeroSlider"
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'
import { FaArrowDown } from 'react-icons/fa'

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      className="relative h-[90vh] lg:h-[912px] bg-hero bg-cover bg-center bg-no-repeat"
      id="home"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content container */}
      <div className="container mx-auto h-full relative z-20">
        <HeroSlider />
        
        {/* Social proof stats */}
        <motion.div 
          variants={fadeIn('up', 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="hidden lg:flex absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm h-[100px]"
        >
          <div className="container mx-auto flex justify-between items-center h-full">
            <div className="flex items-center gap-3 text-white">
              <span className="text-3xl font-bold text-rose-500">5+</span>
              <span className="uppercase text-sm">Years of<br />Experience</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="text-3xl font-bold text-rose-500">20+</span>
              <span className="uppercase text-sm">Professional<br />Trainers</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="text-3xl font-bold text-rose-500">10k+</span>
              <span className="uppercase text-sm">Happy<br />Members</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="text-3xl font-bold text-rose-500">50+</span>
              <span className="uppercase text-sm">Fitness<br />Programs</span>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          variants={fadeIn('up', 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={scrollToAbout}
        >
          <div className="flex flex-col items-center">
            {/* <span className="text-white text-xs mb-2">Scroll Down</span> */}
            <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaArrowDown className="text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

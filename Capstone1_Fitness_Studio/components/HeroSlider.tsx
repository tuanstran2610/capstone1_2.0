'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

import CustomButton from './CustomButton'
// import SwiperNavButtons from './SwiperNavButtons'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'

// Slider data
const slides = [
  {
    title: "Where Hard Work Meets Success",
    subtitle: "Transform Your Body, Transform Your Life",
    description: "Join our community of fitness enthusiasts and experience workouts that challenge your limits and help you achieve your personal best.",
    buttonText: "Start Your Journey",
    buttonLink: "#membership"
  },
  {
    title: "Train Smarter, Not Just Harder",
    subtitle: "Expert Guidance, Exceptional Results",
    description: "Our certified trainers design personalized programs that maximize efficiency and deliver results, no matter your fitness level.",
    buttonText: "Meet Our Trainers",
    buttonLink: "#team"
  },
  {
    title: "Fitness For Every Body",
    subtitle: "Inclusive, Supportive, Empowering",
    description: "Whether you're a beginner or an athlete, our diverse classes and programs ensure everyone finds their perfect fitness path.",
    buttonText: "Explore Classes",
    buttonLink: "#classes"
  }
]

const HeroSlider = () => {
  return (
    <Swiper 
      className="h-full"
      modules={[Autoplay]}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="h-full flex justify-end pt-28 lg:pt-48">
            <div className="flex flex-col items-center lg:items-start lg:max-w-[700px]">
              {/* Subtitle */}
              <motion.div
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="bg-rose-500/20 text-white px-4 py-1 rounded-full mb-4 backdrop-blur-md"
              >
                <span className="text-sm tracking-widest uppercase">{slide.subtitle}</span>
              </motion.div>
              
              {/* Main heading */}
              <motion.h1
                variants={fadeIn('up', 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="h1 text-center lg:text-left mb-5"
              >
                <span className="text-white drop-shadow-lg">{slide.title}</span>
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                variants={fadeIn('up', 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="text-white text-center lg:text-left mb-8 max-w-[600px] drop-shadow-md"
              >
                {slide.description}
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                variants={fadeIn('up', 0.8)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="flex gap-4"
              >
                <CustomButton 
                  text={slide.buttonText} 
                  containerStyles="w-[196px] h-[62px] bg-rose-500 hover:bg-rose-600" 
                  href={slide.buttonLink}
                />
                <a 
                  href="#about" 
                  className="hidden lg:flex items-center justify-center w-[62px] h-[62px] rounded-full border-2 border-white text-white hover:bg-white/10 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* Swiper navigation buttons */}
      {/* <SwiperNavButtons
        containerStyles="absolute bottom-2 lg:bottom-0 right-0 h-[130px] w-full lg:w-[700px] z-50 flex
          justify-center lg:justify-start gap-1"
        btnStyles="border border-accent text-white w-[56px] h-[56px] flex  
          justify-center items-center hover:bg-accent transition-all duration-300"
        iconsStyles="text-2xl" */}
      {/* /> */}
    </Swiper>
  )
}

export default HeroSlider

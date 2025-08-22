'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

// Team member data
const trainers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Yoga Instructor',
    bio: 'Sarah specializes in vinyasa flow and restorative yoga with 8+ years of teaching experience.',
    image: '/assets/img/trainers/david.jpg',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: 2,
    name: 'Mike Thompson',
    role: 'CrossFit Coach',
    bio: 'Former professional athlete with expertise in strength training and high-intensity workouts.',
    image: '/assets/img/trainers/matt.jpg',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Nutrition Specialist',
    bio: 'Certified nutritionist helping clients achieve their fitness goals through personalized meal plans.',
    image: '/assets/img/trainers/rosy.jpg',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Personal Trainer',
    bio: 'Specializes in body transformation and functional training with 10+ years of experience.',
    image: '/assets/img/trainers/sofia.jpg',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#',
      linkedin: '#'
    }
  }
]

// Social media icon component
const SocialIcon = ({ Icon, href }: { Icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-white hover:text-rose-400 transition-colors duration-300"
    aria-label="Social media link"
  >
    <Icon className="text-xl" />
  </a>
)

// Trainer card component
const TrainerCard = ({ trainer, index }: { trainer: any, index: number }) => {
  return (
    <motion.div
      variants={fadeIn('up', 0.2 * index)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-10"
    >
      <div className="bg-gray-900 rounded-lg overflow-hidden group">
        {/* Image container with hover effect */}
        <div className="relative h-[320px] overflow-hidden">
          <Image 
            src={trainer.image} 
            alt={trainer.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay with social icons */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-4">
              <SocialIcon Icon={FaInstagram} href={trainer.social.instagram} />
              <SocialIcon Icon={FaFacebook} href={trainer.social.facebook} />
              <SocialIcon Icon={FaTwitter} href={trainer.social.twitter} />
              <SocialIcon Icon={FaLinkedin} href={trainer.social.linkedin} />
            </div>
          </div>
        </div>
        
        {/* Text content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
          <p className="text-rose-400 text-sm uppercase tracking-wider mb-3">{trainer.role}</p>
          <p className="text-gray-300 text-sm">{trainer.bio}</p>
        </div>
      </div>
    </motion.div>
  )
}

const Team = () => {
  return (
    <section className="py-16 bg-gray-800" id="team">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our expert trainers are passionate about helping you achieve your fitness goals with personalized guidance and support.
          </p>
        </motion.div>
        
        {/* Team grid */}
        <div className="flex flex-wrap -mx-4 justify-center">
          {trainers.map((trainer, index) => (
            <TrainerCard key={trainer.id} trainer={trainer} index={index} />
          ))}
        </div>
        
        {/* CTA section */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Want to join our team?
          </h3>
          <a 
            href="#contact" 
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Team

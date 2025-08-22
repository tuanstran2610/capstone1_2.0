'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/variants'
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa'

// Blog posts data
const posts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Building Muscle',
    excerpt: 'Learn the science-backed strategies for effective muscle building, including workout routines and nutrition tips.',
    image: '/assets/img/blog/post1.jpg',
    date: 'June 15, 2023',
    author: 'Mike Thompson',
    category: 'Fitness'
  },
  {
    id: 2,
    title: 'Nutrition Tips for Maximum Performance',
    excerpt: 'Discover the best foods and meal timing strategies to fuel your workouts and optimize your recovery.',
    image: '/assets/img/blog/post2.jpg',
    date: 'July 22, 2023',
    author: 'Elena Rodriguez',
    category: 'Nutrition'
  },
  {
    id: 3,
    title: 'Mindfulness and Fitness: The Perfect Combination',
    excerpt: 'Explore how incorporating mindfulness practices into your fitness routine can enhance your results and wellbeing.',
    image: '/assets/img/blog/post3.jpg',
    date: 'August 8, 2023',
    author: 'Sarah Johnson',
    category: 'Wellness'
  },
  {
    id: 4,
    title: '5 Common Workout Mistakes to Avoid',
    excerpt: 'Learn how to identify and correct the most common mistakes that might be holding back your fitness progress.',
    image: '/assets/img/blog/post4.jpg',
    date: 'September 14, 2023',
    author: 'David Chen',
    category: 'Training'
  }
]

// Blog post card component
const BlogCard = ({ post, index }: { post: any; index: number }) => {
  return (
    <motion.div
      variants={fadeIn('up', 0.1 * index)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-[200px] overflow-hidden">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded">
            {post.category}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Meta info */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <div className="flex items-center mr-4">
              <FaCalendarAlt className="mr-1 text-rose-400" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <FaUser className="mr-1 text-rose-400" />
              <span>{post.author}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold mb-3 hover:text-rose-500 transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {post.excerpt}
          </p>
          
          {/* Read more link */}
          <a 
            href="#" 
            className="inline-flex items-center text-rose-500 font-semibold text-sm hover:text-rose-600 transition-colors duration-300 mt-auto"
          >
            Read More
            <FaArrowRight className="ml-1 text-xs" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

const Blog = () => {
  return (
    <section className="py-16 bg-gray-50" id="blog">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay up to date with the latest fitness tips, nutrition advice, and success stories from our community.
          </p>
        </motion.div>
        
        {/* Blog posts grid */}
        <div className="flex flex-wrap -mx-4">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
        
        {/* View all button */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mt-8"
        >
          <a 
            href="#" 
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white py-3 px-8 rounded-lg transition-colors duration-300"
          >
            View All Articles
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog

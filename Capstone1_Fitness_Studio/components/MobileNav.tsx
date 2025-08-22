
'use client'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link as ScrollLink } from 'react-scroll'
import { useActiveLink, NavLink } from '@/lib/useActiveLink'
import Link from 'next/link'
import { useMembership } from '../hooks/useMembership'

const links: NavLink[] = [
    { name: 'home', target: 'home', offset: -100 },
    { name: 'about', target: 'about', offset: -80 },
    { name: 'class', target: 'classes', offset: -80 },
    { name: 'team', target: 'team', offset: 0 },
    { name: 'prices', target: 'membership', offset: -40 },
    { name: 'testimonial', target: 'testimonials', offset: 0 },
    { name: 'blog', target: 'blog', offset: 0 },
    { name: 'contact', target: 'contact', offset: 0 },
]

const MobileNav = ({containerStyles}:{containerStyles:string}) => {
  const { membershipData, isLoading } = useMembership();
  const isMobile = useMediaQuery({query: '(max-width: 640px)'})
  const { activeLink } = useActiveLink(links);

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return <ScrollLink
          offset={link.offset}
          to={link.target}
          smooth
          spy
          activeClass={`${!isMobile && 'active'}`}
          className={`cursor-pointer hover:text-accent transition-all ${activeLink === link.name ? 'text-accent' : ''}`}
          key={index}>
          {link.name}
        </ScrollLink>
      })}
      {/* Only show Dashboard link if user has active membership */}
      {membershipData && membershipData.isActive && (
        <Link href="/dashboard" className='cursor-pointer hover:text-accent transition-all'>
          dashboard
        </Link>
      )}
    </nav>
  )
}

export default MobileNav

'use client'
import React from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { useActiveLink, NavLink } from '@/lib/useActiveLink'

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

const Nav = ({ containerStyles }: { containerStyles: string }) => {
    const { activeLink, handleSetActive } = useActiveLink(links);
    
    return (
        <nav className={`${containerStyles}`}>
            {links.map((link, index) => {
                return <ScrollLink
                    offset={link.offset}
                    to={link.target}
                    smooth
                    duration={500}
                    onClick={() => handleSetActive(link.name)}
                    className={`cursor-pointer hover:text-accent transition-all ${activeLink === link.name ? 'text-accent' : ''}`}
                    key={index}
                    >
                    {link.name}
                </ScrollLink>
            })}
        </nav>
    )
}

export default Nav

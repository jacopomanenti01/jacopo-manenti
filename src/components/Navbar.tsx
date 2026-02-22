// src/components/Navbar.tsx
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between px-6 h-16 bg-black border-b border-white/10">
        <span className="font-bold text-lg text-white">MyApp</span>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-2">
          {links.map(link => (
            <Button key={link.label} variant="ghost" className="text-white hover:text-black" asChild>
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </div>

        <Button className="hidden sm:flex">Get Started</Button>

        {/* Mobile burger */}
        <button className="sm:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden flex flex-col gap-2 p-4 bg-black absolute top-16 left-0 right-0 z-10 border-b border-white/10">
          {links.map(link => (
            <Button key={link.label} variant="ghost" className="w-full text-white hover:text-black" asChild>
              <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            </Button>
          ))}
          <Button className="w-full">Get Started</Button>
        </div>
      )}
    </>
  )
}
import React from 'react'
import Logo from '../logo'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Sparkle } from 'lucide-react'

const Topbar = () => {
  return (
    <div className='border-b w-full p-4'>
        <div className='max-w-7xl mx-auto w-full items-center justify-between flex'>
            <Logo />
            <div>
                <Link href="/dashboard">
                    <Button className="gradient-btn">
                        <span className='mr-2'>Get Started</span>
                        <Sparkle />
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Topbar
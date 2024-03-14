import Topbar from '@/components/landing/topbar';
import React from 'react'
import Footer from '@/components/landing/footer';
const LandingLayout = (props: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen'>
      <Topbar />
        <main className='maw-w-5xl mx-auto'>
          {props.children}  
        </main>

        <Footer />
    </div>
  )
}

export default LandingLayout;
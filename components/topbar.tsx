"use client"
import { cn } from '@/lib/utils'
import React from 'react'
import Logo from './logo'
import { Button } from './ui/button'
import { useSidebarStore } from '@/stores/sidebar-store'

const Topbar = () => {
  const { handleOpenOrClose } = useSidebarStore();

  return (
    <div className={cn("flex items-center p-4 justify-between sticky top-0 z-30", "lg:hidden")}>
      <Logo />
      <Button variant="ghost" size="icon" onClick={handleOpenOrClose}>
        {/* Add content or text inside the button */}
        Click Me
      </Button>
    </div>
  );
}

export default Topbar;

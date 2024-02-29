import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import React from 'react'
interface UserMessageProps {
    children: React.ReactNode;

}
const UserMessage:React.FC<UserMessageProps> = ({children}) => {
  return (
    <div className='boder p-4 pb-10 rounded-lg mr-20 relative '>
        {children}
        <div className='bg-secondary w-14 h-14 rounded-lg flex justify-center items-center absolute left-6 -bottom-6'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>
    </div>
  )
}

export default UserMessage
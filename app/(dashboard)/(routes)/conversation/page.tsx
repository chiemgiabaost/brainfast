"use client"
import ToolNavigation from '@/components/dashboard/tool-navigation';
import React, { useRef } from 'react'
import { useChat } from 'ai/react'
const ConversationPage = () => {
  const containerRef = useRef(null)
  const  {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    setMessages,

  } = useChat({api:"/api/conversation"});
  return (
    <div className='h-full relative flex flex-col justify-between'>
      <div ref={containerRef} className='overflow-y-auto space-y-10 scroll-smooth h-[calc(100vh-180px)]'>
          {messages.length > 0 
            ?
            <>
              {
                messages.map(m => (
                  <div key={m.id} className='whitespace-pre-wrap'>
                    {
                      m.role === "user" ? 
                      <UserMessage>
                        <MarkdownResponse content={m.content}/>
                      </UserMessage> :
                      <AiResponse>

                      </AiResponse>
                    }
                  </div>
                ))
              }
            </>
            :
            <ToolNavigation title='Conversation'/>
          }
      </div>
    </div>
  )
}

export default ConversationPage
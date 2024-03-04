"use client"
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {v4 as uuid} from "uuid"
import axios from 'axios';

interface MessageType {
    id:string | string[];
    role: "user" | "assistant"
}

const formSchema = z.object({
    prompt: z.string().min(1,{
        message: "Photo prompt is required"
    }),
    resolution: z.string().min(1)  ,
    amount: z.string().min(1)
})
const PhotoPage = () => {
const containerRef = useRef<HTMLDivElement>(null);
const [messages, setMessages] = useState<MessageType[]>([]);
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: "",
        resolution: "1",
        amount: "1"
    }
});

const isLoading = form.formState.isSubmitting

const handleScrollToBottom = () => {
    if (containerRef.current){
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
}

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
        setMessages(current => ([...current, {
            id: uuid(),
            role: "user",
            content: `${values.prompt} | ${values.resolution} | ${values.amount}`
        },{
            id: uuid(),
            role: "assistant",
            content:"",
        }]));
        handleScrollToBottom();
        form.reset();

        const {data} = await axios.post("/api/photo", values);
    }
    catch(error){

    }
}
  return (
    <div className='h-full relative flex flex-col justify-between'>
        <div className='h-[calc(100vh - 180px)] relative overflow-y-auto space-y-10 scroll-smooth' ref={containerRef}>

        </div>
    </div>
  )
}

export default PhotoPage
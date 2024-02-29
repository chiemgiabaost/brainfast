import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const configuaration = {
    apiKey:    process.env.OPENAI_API_KEY!,
}
const openai = new OpenAI(configuaration);
export async function  POST(req: Request){
    try{
        const {userId} = auth()
        const {messages} = await req.json();
        
        if (!userId){
            return new NextResponse("Unauthorize", {status: 401})
        }

        if (!configuaration.apiKey){
            return new NextResponse("OpenAI API key is missing", {status: 500})
        }

        if ( !messages){
            return new NextResponse("Messages is required", {status: 400})
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages,
          });
         
          // Convert the response into a friendly text-stream
          const stream = OpenAIStream(response);
          // Respond with the stream
          return new StreamingTextResponse(stream);
         
    }catch(error){
        if (error instanceof OpenAI.APIError){
            const {name, status, headers, message} = error;
            return NextResponse.json({name,status,headers,message}, {status})
        }else{
            throw error;
        }
    }
}
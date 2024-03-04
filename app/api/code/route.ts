import { checkSubscription, checkUserLimit, incresementUserLimit } from "@/lib/user-limit";
import { auth } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const configuaration = {
    apiKey : process.env.OPENAI_API_KEY
};

const openai= new OpenAI(configuaration)
const instructionMESSAGE ={
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snipets. Use code comments for explanations"
}
export async function POST(req: Request){
    try{
        const {userId} = auth();
        const {messages} = await req.json();

        if (!userId){
            return new NextResponse("Unauthorize", {status: 401})
        }

        if (!configuaration.apiKey){
            return new NextResponse("API Key is not set", {status: 500})
        }

        if (!messages){
            return new NextResponse("Messages are required", {status: 400})
        }

        const reachToLimit = await checkUserLimit();
        const isPro = await checkSubscription();
        if (!reachToLimit && !isPro){
            return new NextResponse("You are reach to limit", {status: 403})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            stream:true,
            messages: [instructionMESSAGE,...messages]
        });

        const stream = OpenAIStream(response, {
            onCompletion: async (messages) => {
                if (!isPro){
                    await incresementUserLimit();
                }
            }
        })
        
        return new StreamingTextResponse(stream)
    }catch(error){
        if (error instanceof OpenAI.APIError){
            const {name, status,headers, message} = error;

            return  NextResponse.json({name, status,headers, message}, {status})
        }else{
            throw error;
        }
    }
}
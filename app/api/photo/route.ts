import { checkSubscription, checkUserLimit, incresementUserLimit } from "@/lib/user-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const configuaration = {
    apiKey : process.env.OPENAI_API_KEY
};

const openai= new OpenAI(configuaration)
export async function POST(req: Request){
    try{
        const {userId} = auth();
        const {resolution, prompt, amount} = await req.json();

        if (!userId){
            return new NextResponse("Unauthorize", {status: 401})
        }

        if (!configuaration.apiKey){
            return new NextResponse("API Key is not set", {status: 500})
        }
        if (!prompt){
            return new NextResponse("Prompt is required", {status: 400})
        }

        const reachToLimit = await checkUserLimit();
        const isPro = await checkSubscription();

        if (!reachToLimit && !isPro){
            return new NextResponse("You are reach to limit", {status: 403})
        }

        const response= await openai.images.generate({
            prompt,
            n: Number(amount),
            size: resolution
        })

        if (!isPro){
            await incresementUserLimit();
        }

        return NextResponse.json(response)
    }
    catch(error){
        if (error instanceof OpenAI.APIError){
            const {name, status, headers, message} = error;
            return NextResponse.json({name,status,headers,message}, {status})
        }else{
            throw error;
        }
    }
}
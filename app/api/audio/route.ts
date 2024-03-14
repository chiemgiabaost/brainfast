import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';
import { checkSubscription, checkUserLimit, incresementUserLimit } from "@/lib/user-limit";
import Replicate from "replicate";


const configuaration = {
    auth: process.env.REPLICATE_API_KEY,
}

const replicate = new Replicate(configuaration);

export async function POST(req: Request){
    try{
        const {userId} = auth();
        const {prompt} = await req.json();

        if (!userId){
            return new NextResponse("Unauthorize", {status: 401})
        }

        if (!prompt){
            return new NextResponse("Prompt is required", {status: 400})
        }

        if (!configuaration.auth){
            return new NextResponse("API Key is not set", {status: 500})
        }

        const reachToLimit = await checkUserLimit();
        const isPro = await checkSubscription();

        if (!reachToLimit && !isPro){
            return new NextResponse("You are reach to limit", {status: 403})
        }

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt
                }
            }
        )

        if (!isPro){
            await incresementUserLimit();
        }

        return NextResponse.json(response);
        
    }
    catch(error){
        return new NextResponse("Something went wrong", {status: 500})
    }
}
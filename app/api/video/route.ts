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
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt
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
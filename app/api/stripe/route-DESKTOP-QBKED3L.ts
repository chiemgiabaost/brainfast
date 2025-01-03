import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import stripe from "stripe";


export async function GET(){
    try {
        const {userId} = auth();
        const user = await currentUser();

        if (!user || !userId){
            return new NextResponse("Unauthorize", {status: 401})
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {userId}
        })

        const dashboardUrl = absoluteUrl("/dashboard")
        // if ( userSubscription?.stripeCustomerId){
        //     const stripeSession = await stripe.BillingPortal.sessions.create({
        //         customer: user
        //     })
        // }
    }
    catch (error){
        return new NextResponse("Something went wrong", {status: 500})
    }
}
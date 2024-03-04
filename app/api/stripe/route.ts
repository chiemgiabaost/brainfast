import prismadb from "../../../lib/prismadb";
import { absoluteUrl } from "../../../lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {stripe} from "../../../lib/stripe";


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
        if ( userSubscription?.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: dashboardUrl
            })
            return  NextResponse.json({url: stripeSession.url}, {status: 200})
        }

        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: user.emailAddresses[0].emailAddress,
            mode: "subscription",
            billing_address_collection: "auto",
            line_items: [
                {
                    price_data:{
                        currency: "usd",
                        product_data: {
                            name: "BrainFast Pro Plan",
                            description:"Unlimited generations"
                        },
                        unit_amount: 1000,
                        recurring: {interval: "month"}
                    },
                    quantity: 1
                }
            ],
            metadata: {userId}
        });
        return NextResponse.json({url: stripeSession.url}, {status: 200})
    }
    catch (error){
        return new NextResponse("Something went wrong", {status: 500})
    }
}
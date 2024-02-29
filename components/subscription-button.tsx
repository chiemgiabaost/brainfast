"use client"
import React, {useState} from 'react'
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { toast, useToast } from './ui/use-toast';
interface SubscriptionButtonProps {
    className?: string;
    isPro?: boolean;
}
const SubscriptionButton: React.FC<SubscriptionButtonProps>= ({className, isPro}) => {
    const [loading, setLoading] = useState(false);
    const handleSubscription = async () => {
        try{
           setLoading(true); 
            const {data} = await axios.get("/api/stripe") 
            //do sth after getting data from stripe           
        }catch(error){
            toast({variant:"destructive", description:"Failed to get stripe session. Please try again later."});
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className={className}>
        <Button
        variant="outline" size="lg" 
        disabled={loading} onClick={handleSubscription}
        className={cn("text-white w-full font-semibold border-none gradient-btn", "hover:text-white")}>
            <span>{isPro? "Manage Subscription" : "Upgrade to Pro"}</span>
            <Sparkles />
        </Button>
    </div>
  )
}

export default SubscriptionButton
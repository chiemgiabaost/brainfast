"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useProStore } from '@/stores/pro-store';
import SubscriptionButton from '../subscription-button'
interface UpgradeProModalProps {
  isProPLan: true;
}
const UpgradeProModal: React.FC<UpgradeProModalProps> = ({isProPLan}) => {
  const {isOpen, handleCloseProModal} = useProStore();
  return (
    <div>
        <Dialog open={isOpen}>
        <DialogContent  onClose={handleCloseProModal} showOverlay>
          <SubscriptionButton isPro={true} /> 
        </DialogContent>
       </Dialog>
    </div>

    
  )
}

export default UpgradeProModal
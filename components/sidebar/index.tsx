"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useSidebarStore } from "@/stores/sidebar-store";
import Logo from "../logo";
import SidebarToggle from "./sidebar-toggle";
import { UserButton, useUser } from "@clerk/nextjs";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "../ui/progress";
import Navbar from "./navbar";
import SubscriptionButton from "../subscription-button";
import ThemeToggle from "./theme-toggle";

interface SidebarProps {
  className?: string;
  isProPlan?: boolean;
  userLimitCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isProPlan,
  userLimitCount,
}) => {
  const { isMinimal } = useSidebarStore();
  const { user } = useUser();

  return (
    <div
      className={cn(
        "text-white fixed top-0 left-0 h-screen w-64 bg-gray-800 transform transition-transform",
        "lg:translate-x-0", // Visible on large screens
        "translate-x-[-100%] lg:translate-x-0", // Hidden on mobile by default
        className
      )}
    >
      {/* Header Section */}
      <div className="h-20 pl-7 pr-6 flex items-center justify-between">
        {!isMinimal && <Logo />}
        <SidebarToggle />
      </div>

      {/* Navbar Section */}
      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navbar />
      </div>

      {/* Footer Section */}
      <div
        className={cn(
          "fixed bottom-8 left-4 right-4",
          "lg:left-7 lg:right-auto",
          isMinimal && "lg:left-3"
        )}
      >
        <div className="mb-4 p-4 rounded-lg bg-gray-900">
          <div className="mb-4 flex items-center">
            <UserButton afterSignOutUrl="/" />
            {!isMinimal && (
              <span className="text-sm ml-4">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            )}
          </div>
          {!isMinimal && (
            <div className="border-t border-t-gray-950 pt-2">
              {isProPlan && (
                <div className="mb-4">
                  <div className="text-center mb-2 text-muted-foreground font-semibold">
                    {userLimitCount} / {MAX_FREE_COUNTS} Free generation
                  </div>
                  <Progress
                    value={(userLimitCount / MAX_FREE_COUNTS) * 100}
                    className="bg-gray-950 h-3"
                    indicatorClassName="gradient-btn"
                  />
                </div>
              )}
              <SubscriptionButton isPro={isProPlan} />
            </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;

import Topbar from "@/components/topbar";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";
import React from "react";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import UpgradeProModal from "@/components/dashboard/upgrade-pro-modal";
import { checkSubscription, checkUserLimit, getUserLimitCount } from "@/lib/user-limit";


const DashboardLayout = async (props: { children: React.ReactNode }) => {
  const isProPlan = await checkSubscription();
  const userLimitCount = await getUserLimitCount();
  return (
    <div>
      <header>
        {/* <Topbar /> */}
      </header>
      <main
        className={cn(
          "lg:bg-gray-950 lg:overflow-hidden lg:pl-80 lg:pr-7 lg:py-7 [&:has([is-navbar-minimal])]:lg:pl-20"
        )}
      >
        <Sidebar
          isProPlan={isProPlan}
          userLimitCount={userLimitCount}
          className={cn(
            "fixed left-0 z-20 w-80 [&:has([is-navbar-minimal])]:w-fit",
            "lg:block"
          )}
        />
        <UpgradeProModal isProPLan={isProPlan}  />
        <div className={cn("bg-background h-[calc(100vh-56px)]","lg:rounded-3xl lg:p-7")}>{props.children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

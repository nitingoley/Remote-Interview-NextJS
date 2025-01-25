"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { QUICK_ACTIONS } from "@/app/constants";
import { Loader2Icon } from "lucide-react";
import { ActionCard } from "@/components/ActionCard";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {

  const router = useRouter();


  const {isInterviewer , isCandidate , isLoading} = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal , setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title:string)=>{
     switch(title){
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
        case "Join Interview":
          setModalType("join");
          setShowModal(true);
          break;

          default:
            router.push(`/${title.toLowerCase()}`)
     }
  };


 return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* welcome section  */}

      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground mt-2">
        {
         isInterviewer 
         ? "Manage your interviews and review candidates effectively"
         : "Access your upcoming interviews and preparations"
         } 
        </p>
      </div>

       {
        isInterviewer
        ?
        (
          <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {
            QUICK_ACTIONS.map((action)=>(
              <ActionCard 
               key= {action.title}
               action={action}
               onClick = {()=> handleQuickAction(action.title)}
              />
            ))
           }
          </div>     

          <MeetingCard
           isOpen= {showModal}
           onClose= {()=> setShowModal(false)}
           title= {modalType === "join" ? "Join Meeting" : "Start Meeting"}
           isJoinMeeting={modalType=== "join"}
          />
        </>
        ): (
          <>
           <div className="text-3xl font-bold">
            <h1 className="text-3xl font-bold">Your Interviews</h1>
            <p className="text-muted-foreground mt-1">View and join your schedule interviews</p>
           </div>

           <div className="mt-8">
            {interviews === undefined  ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground"/>
              </div>
            ): interviews.length > 0 ?(
              <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              </div>
            ): (
              <div className="text-center py-12 text-muted-foreground">
                You have no schedule interviews at the moment
              </div>
            )}
           </div>
          </>

        )
       }
    </div>
  );
}

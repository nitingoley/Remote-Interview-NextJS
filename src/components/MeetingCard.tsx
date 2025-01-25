import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeetingAction from "@/hooks/useMeetingAction";
import toast from "react-hot-toast";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

export default function MeetingCard({
  isOpen,
  onClose,
  title,
  isJoinMeeting,
}: MeetingModalProps) {
  const [meetingUrl, setMeetingUrl] = useState("");

  const { createInstantMeeting , joinMeeting } = useMeetingAction();

  const handleStart = () => {
    if (isJoinMeeting) {
      if (!meetingUrl.trim()) {
        toast.error("Meeting URL cannot be empty");
        return;
      }
  
  
      const meetingId = meetingUrl.split("/").pop();
  
      if (!meetingId || meetingId.trim() === "") {
        toast.error("Invalid meeting URL format. Please check the URL.");
        return;
      }
  
      joinMeeting(meetingId); 
    } else {
      createInstantMeeting();  
    }
  
    setMeetingUrl("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {isJoinMeeting && (
            <Input
              placeholder="Paste your meeting url.."
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
            />
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoinMeeting && !meetingUrl.trim()}
            >
              {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

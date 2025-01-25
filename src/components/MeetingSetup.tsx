import {
    DeviceSettings,
    useCall,
    VideoPreview,
  } from "@stream-io/video-react-sdk";
  import React, { useEffect, useState } from "react";
  import { Card } from "./ui/card";
  import { CameraIcon, MicIcon, Settings2Icon } from "lucide-react";
  import { Switch } from "./ui/switch";
  import { Button } from "./ui/button";
  
  export default function MeetingSetup({
    onSetupComplete,
  }: {
    onSetupComplete: () => void;
  }) {
    const [isCameraDisabled, setIsCameraDisabled] = useState(true);
    const [isMicroDisabled, setIsMicroDisabled] = useState(false);
  
    const call = useCall();
  
    if (!call) return null;
  
    useEffect(() => {
      if (isCameraDisabled) call.camera.disable();
      else call.camera.enable();
    }, [isCameraDisabled, call.camera]);
  
    useEffect(() => {
      if (isMicroDisabled) call.microphone.disable();
      else call.microphone.enable();
    }, [isMicroDisabled, call.microphone]);
  
    const handleJoin = async () => {
      await call.join();
      onSetupComplete();
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background/95">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* video preview container  */}
  
            <Card className="md:col-span-1 p-6 flex flex-col">
              <div>
                <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
                <p className="text-sm text-muted-foreground">
                  Ensure you’re visible and camera-ready! 🎥
                </p>
              </div>
  
              {/* video preview  */}
  
              <div className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/50 border relative">
                <div className="absolute inset-0">
                  <VideoPreview className="h-full w-full" />
                </div>
              </div>
            </Card>
  
            {/* card controls  */}
  
            <Card className="md:col-span-1 p-6">
              <div className="h-full flex flex-col">
                {/* meeting details  */}
                <div>
                  <h2 className="text-xl font-semibold mb-1">Meeting Details</h2>
                  <p className="text-sm text-muted-foreground break-all">
                    Meeting ID: {call.id}
                  </p>
                </div>
  
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-6 mt-8">
                    {/* camera controls  */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CameraIcon className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-medium">Camera</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-muted-foreground">
                          {isCameraDisabled ? "Disabled" : "Enabled"}
                        </p>
                        <Switch
                          checked={!isCameraDisabled}
                          onCheckedChange={(checked) =>
                            setIsCameraDisabled(!checked)
                          }
                        />
                      </div>
                    </div>
  
                    {/* mic control  */}
  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MicIcon className="h-5 w-5 text-primary" />
                        </div>
  
                        <div>
                          <p className="font-medium"> Microphone</p>
                          <p className="text-sm text-muted-foreground">
                            {isMicroDisabled ? "Muted" : "Unmuted"}
                          </p>
                        </div>
                      </div>
  
                      <Switch
                        checked={!isMicroDisabled}
                        onCheckedChange={(checked) => setIsMicroDisabled(!checked)}
                      />
                    </div>
  
                    {/* device settings  */}
  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex justify-center items-center">
                          <Settings2Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Settings</p>
                          <p className="text-sm text-muted-foreground">
                            Adjust your devices
                          </p>
                        </div>
                      </div>
                      <DeviceSettings />
                    </div>
                  </div>
                </div>
  
                {/* Join Button  */}
  
                <div className="space-y-3 mt-8">
                  <Button className="w-full" size="lg" onClick={handleJoin}>
                    Join Meeting
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Don’t worry, our team is here to help you shine! 🌟
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
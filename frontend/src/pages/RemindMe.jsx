import React from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlarmClock, Bell, CalendarClock } from "lucide-react";

const RemindMe = () => {
    return (
        <div className="flex gap-4">
          <AlarmClock className="w-8 h-8 text-primary" />
          <Bell className="w-8 h-8 text-secondary" />
          <CalendarClock className="w-8 h-8 text-accent" />
        </div>
      );
    };

export default RemindMe;

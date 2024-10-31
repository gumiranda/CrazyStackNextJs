"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isFuture } from "date-fns";
import { useState } from "react";
import { AppointmentHeader } from "./components/appointment-header";

interface AppointmentItemProps {
  item: any;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({ item }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isFutureAppointment = isFuture(item?.initDate);
  const handleCancelAppointment = async () => {};
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger>
        <Card>
          <CardContent>
            <AppointmentHeader />
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <Card>
          <CardContent>
            <h1>oi</h1>
          </CardContent>
        </Card>
      </SheetContent>
      <SheetFooter>
        <h1>oi</h1>
      </SheetFooter>
    </Sheet>
  );
};

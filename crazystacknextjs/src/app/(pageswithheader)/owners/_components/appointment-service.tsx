"use client";
import { SignInDiv } from "@/app/(auth)/login/_components/signin-div";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { AppointmentDialog } from "@/slices/belezix/entidades/appointment/ui/organisms";
import { ServiceItem } from "@/slices/belezix/entidades/service/ui";
import { useState } from "react";
interface AppointmentServiceProps {
  service: any;
  owner: any;
}
export const AppointmentService: React.FC<AppointmentServiceProps> = ({
  owner,
  service,
}) => {
  const { signInDialogIsOpen, setSignInDialogIsOpen, user } = useAuth();
  const [appointmentSheetIsOpen, setAppointmentSheetIsOpen] = useState(false);

  const handleAppointmentClick = () => {
    if (user) {
      setAppointmentSheetIsOpen(true);
    } else {
      setSignInDialogIsOpen(true);
    }
  };
  return (
    <>
      <ServiceItem
        handleAppointmentClick={handleAppointmentClick}
        service={service}
      />
      <AppointmentDialog
        owner={owner}
        service={service}
        appointmentSheetIsOpen={appointmentSheetIsOpen}
        setAppointmentSheetIsOpen={setAppointmentSheetIsOpen}
      />
      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={() => {
          setSignInDialogIsOpen(!signInDialogIsOpen);
        }}
      >
        <DialogContent className="w-[90%]">
          <DialogTitle>Faça seu login</DialogTitle>
          <SignInDiv />
        </DialogContent>
      </Dialog>
    </>
  );
};

"use client";
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
  const { setSignInDialogIsOpen, user } = useAuth();
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
    </>
  );
};

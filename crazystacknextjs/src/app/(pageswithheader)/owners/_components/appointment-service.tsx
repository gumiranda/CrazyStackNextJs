"use client";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { ServiceItem } from "@/slices/belezix/entidades/service/ui";
import { useState } from "react";

export const AppointmentService = ({ owner, service }) => {
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
    </>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { ServiceCard } from "./_components";

interface ServiceItemProps {
  service: any;
  handleAppointmentClick: () => void;
}

export const ServiceItem = ({
  service,
  handleAppointmentClick,
}: ServiceItemProps) => {
  return (
    <ServiceCard service={service}>
      <Button variant="secondary" size="sm" onClick={handleAppointmentClick}>
        Agendar
      </Button>
    </ServiceCard>
  );
};

import { Card, CardContent } from "@/components/ui/card";
import { ServiceImage } from "./service-image";
import type { ReactNode } from "react";
import { ServiceDetails } from "./service-details";

type ServiceCardProps = {
  service: any;
  children: ReactNode;
};

export const ServiceCard = ({ service, children }: ServiceCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <ServiceImage
          src={
            service?.imageUrl ??
            "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={service?.name}
        />
        <div className="space-y-2">
          <ServiceDetails
            name={service.name}
            description={service?.description ?? ""}
            price={service.price ?? 0}
          >
            {children}
          </ServiceDetails>
        </div>
      </CardContent>
    </Card>
  );
};

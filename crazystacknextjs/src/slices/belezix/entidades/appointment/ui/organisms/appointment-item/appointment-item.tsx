"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isFuture, startOfDay } from "date-fns";
import { useState } from "react";
import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentDateTime } from "./components/appointment-datetime";
import { AppointmentMap } from "./components/appointment-map";
import { AppointmentStatusBadge } from "./components/appointment-badge";
import { AppointmentSummary } from "../../molecules/appointment-summary/appointment-summary";
import { AppointmentActions } from "./components/appointment-actions";
import { PhoneItem } from "@/shared/ui/molecules";
import { toast } from "sonner";
import { api } from "@/shared/api";

interface AppointmentItemProps {
  item: any;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({ item }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isFutureAppointment = isFuture(item?.initDate);
  const handleCancelAppointment = async () => {
    try {
      setIsSheetOpen(false);
      const request = {
        ...item,
        status: 3,
        date: startOfDay(item?.initDate),
        updatedAt: new Date(),
      };
      delete request.value;
      delete request.statusLabel;
      delete request.initDateFormatted;
      delete request.endDateFormatted;
      delete request.datePickerSelected;
      delete request.endHour;
      delete request.initHour;
      delete request.createdAt;

      const response = await api?.patch(
        `/request/update?_id=${item?._id}`,
        request,
      );
      if (response?.data?.error) {
        throw new Error(response?.data?.error);
      }
      toast.success("Agendamento cancelado com sucesso");
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao cancelar agendamento");
    }
  };
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };
  const phones = item?.owner?.phones;
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <AppointmentHeader
              serviceName={item?.serviceName}
              ownerName={item?.ownerName}
              ownerImageUrl={item?.owner?.imageUrl}
              status={item?.status}
            />
            <AppointmentDateTime appointmentDate={item?.initDate} />
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-left">
            Informações do Agendamento
          </SheetTitle>
        </SheetHeader>
        {/* {item?.owner && ( */}
        <AppointmentMap
          owner={item?.owner ?? { name: item?.ownerName }}
          location={{ lat: 40.7128, lng: -74.006 }} // Replace with actual coordinates
        />
        {/* )} */}
        <div className="mt-6">
          <AppointmentStatusBadge status={item?.status} />
          <div className="mb-3 mt-6">
            <AppointmentSummary
              owner={item?.owner ?? { name: item?.ownerName }}
              service={item?.service ?? { name: item?.serviceName }}
              selectedDate={item?.initDate}
              professional={
                item?.professional ?? { name: item?.professionalName }
              }
            />
          </div>
          <div className="space-y-3">
            {phones?.map?.((phone: any, index: number) => (
              <PhoneItem phone={phone} key={index} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-6">
          <AppointmentActions
            canCancelAppointment={
              isFutureAppointment && ![3, 4].includes(item?.status)
            }
            handleCancelAppointment={handleCancelAppointment}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

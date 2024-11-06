"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { useGetUsers } from "@/slices/general/entidades/user";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { AppointmentCalendar } from "../../molecules/appointment-calendar";
import { AppointmentTimeList } from "../../molecules/appointment-timelist";
import { useGetTimeAvailables } from "../../../appointment.lib";
import { toast } from "sonner";
import { api } from "@/shared/api";
import { addMinutes } from "date-fns";

interface AppointmentDialogProps {
  service: {
    _id: string;
    name: string;
    duration: number;
  };
  owner: {
    _id: string;
    name: string;
    createdById: string;
  };
  appointmentSheetIsOpen: boolean;
  setAppointmentSheetIsOpen: (isOpen: boolean) => void;
}

export const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  service,
  owner,
  appointmentSheetIsOpen,
  setAppointmentSheetIsOpen,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [selectedProfessional, setSelectedProfessional] = useState<
    string | undefined
  >(undefined);

  const { data: userData } = useGetUsers(
    1,
    { enabled: appointmentSheetIsOpen },
    { role: "professional", ownerId: owner?._id },
  );
  const professionals = useMemo(() => userData?.users, [userData]);
  const { data: timeAvailableData } = useGetTimeAvailables(
    {
      enabled:
        appointmentSheetIsOpen && !!selectedProfessional && !!selectedDay,
    },
    {
      professionalId: selectedProfessional,
      serviceId: service._id,
      ownerId: owner._id,
      date: selectedDay?.toISOString(),
    },
  );
  const timeList = useMemo(
    () => timeAvailableData?.timeAvailable,
    [timeAvailableData],
  );
  const handleCreateAppointment = useCallback(async () => {
    if (!selectedTime || !selectedDay || !selectedProfessional) {
      toast.error("Por favor, selecione um horário e um profissional.");
      return;
    }
    try {
      const response = await api?.get("/client/loadByPage", {
        params: { page: 1, userId: user?._id, ownerId: owner?._id },
      });
      const clientsResult = response?.data;
      let currentClient = clientsResult?.clients?.[0];
      if (!currentClient) {
        const response = await api?.post("/client/add", {
          phone: user?.phone,
          name: user?.name,
          ownerId: owner?._id,
          clientUserId: user?._id,
          userId: user?._id,
          active: true,
          myOwnerId: owner?.createdById,
        });
        if (response) {
          currentClient = response.data;
        }
        if (!currentClient) {
          toast.error("Erro ao criar cliente.");
          return;
        }
        return;
      }
      const timeToSend = timeList?.find?.(
        (time: { label: string; value: string }) => time.label === selectedTime,
      );
      if (!timeToSend) {
        toast.error("Horário selecionado não está disponível.");
        return;
      }
      const professionalName = professionals.find(
        (item: any) => item._id === selectedProfessional,
      )?.name;
      const requestObjectIds = {
        haveDelivery: false,
        haveRecurrence: false,
        haveFidelity: false,
        haveRide: false,
        status: 0,
        serviceId: service._id,
        clientId: currentClient._id,
        professionalId: selectedProfessional,
        ownerId: owner._id,
        createdForId: owner.createdById,
        clientUserId: user?._id,
        initDate: timeToSend.value,
        endDate: addMinutes(
          new Date(timeToSend.value),
          service.duration,
        ).toISOString(),
        professionalName,
        duration: service.duration,
        serviceName: service.name,
        ownerName: owner.name,
        clientName: user?.name,
        message: "   ",
      };
      const responseRequest = await api?.post("/request/add", requestObjectIds);
      if (responseRequest?.data) {
        toast.success("Agendamento realizado com sucesso!", {
          action: {
            label: "Ver agendamentos",
            onClick: () => router.push("/appointments"),
          },
        });
        setAppointmentSheetIsOpen(false);
      }
    } catch (error) {
      toast.error("Erro ao criar agendamento.");
    }
  }, [
    owner._id,
    owner.createdById,
    owner.name,
    professionals,
    router,
    selectedDay,
    selectedProfessional,
    selectedTime,
    service._id,
    service.duration,
    service.name,
    setAppointmentSheetIsOpen,
    timeList,
    user?._id,
    user?.name,
    user?.phone,
  ]);
  const isConfirmButtonDisabled =
    !selectedDay || !selectedTime || !selectedProfessional;
  return (
    <Sheet
      open={appointmentSheetIsOpen}
      onOpenChange={setAppointmentSheetIsOpen}
    >
      <SheetContent className="px-0">
        <SheetHeader className="lg:ml-4">
          <SheetTitle>Fazer Agendamento</SheetTitle>
        </SheetHeader>
        {professionals?.length > 0 && (
          <div className="p-5">
            <Select
              onValueChange={setSelectedProfessional}
              value={selectedProfessional}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um profissional" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((professional: any) => (
                  <SelectItem key={professional._id} value={professional._id}>
                    {professional.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <AppointmentCalendar
          selectedDay={selectedDay}
          onSelect={setSelectedDay}
        />

        {selectedDay && (
          <AppointmentTimeList
            timeList={
              timeList?.map?.(
                (time: { label: string; value: string }) => time.label,
              ) ?? []
            }
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
          />
        )}
        <SheetFooter className="mt-5 px-5">
          <Button
            onClick={handleCreateAppointment}
            disabled={isConfirmButtonDisabled}
          >
            Confirmar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

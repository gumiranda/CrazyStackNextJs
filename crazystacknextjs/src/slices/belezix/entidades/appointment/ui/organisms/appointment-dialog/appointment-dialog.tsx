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
import { useMemo, useState } from "react";

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
  console.log({ professionals });
  const handleCreateAppointment = () => {};
  const isConfirmButtonDisabled = true;
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

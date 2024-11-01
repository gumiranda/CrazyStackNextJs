"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { useRouter } from "next/navigation";

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
  const professionals = [];
  const handleCreateAppointment = () => {};
  const isConfirmButtonDisabled = true;
  return (
    <Sheet
      open={appointmentSheetIsOpen}
      onOpenChange={setAppointmentSheetIsOpen}
    >
      <SheetContent className="px-0">
        <SheetHeader>
          <SheetTitle>Fazer Agendamento</SheetTitle>
        </SheetHeader>
        {professionals?.length > 0 && <div></div>}
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

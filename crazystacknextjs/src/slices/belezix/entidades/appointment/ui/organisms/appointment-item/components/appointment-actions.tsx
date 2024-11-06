import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SheetClose } from "@/components/ui/sheet";

interface AppointmentActionsProps {
  canCancelAppointment: boolean;
  handleCancelAppointment: () => Promise<void>;
}

export const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  canCancelAppointment,
  handleCancelAppointment,
}) => {
  return (
    <div className="flex items-center gap-3">
      <SheetClose asChild>
        <Button variant={"outline"} className="w-full">
          Voltar
        </Button>
      </SheetClose>
      {canCancelAppointment && (
        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <Button variant="destructive">Cancelar</Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Deseja cancelar sua reserva?</DialogTitle>
              <DialogDescription>
                Ao cancelar, você perderá sua reserva e não poderá recuperá-la.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row gap-4">
              <DialogClose asChild>
                <Button variant={"secondary"} className="w-full">
                  Voltar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleCancelAppointment}
                >
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

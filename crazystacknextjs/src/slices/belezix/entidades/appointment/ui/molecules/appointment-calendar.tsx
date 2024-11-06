import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
interface AppointmentCalendarProps {
  selectedDay: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export const AppointmentCalendar = ({
  selectedDay,
  onSelect,
}: AppointmentCalendarProps) => {
  return (
    <Calendar
      mode="single"
      locale={ptBR}
      selected={selectedDay}
      onSelect={onSelect}
      fromDate={new Date()}
      styles={{
        head_cell: { width: "100%" },
        cell: { width: "100%" },
        button: { width: "100%" },
        nav_button_previous: { width: "32px", height: "32px" },
        nav_button_next: { width: "32px", height: "32px" },
        caption: { textTransform: "capitalize" },
      }}
    />
  );
};

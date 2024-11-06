import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TimeDisplayProps {
  selectedDate: Date;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ selectedDate }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm text-gray-400">Horário</h2>
      <p className="text-sm">{format(selectedDate, "HH:mm")}</p>
    </div>
  );
};

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DateDisplayProps {
  selectedDate: Date;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ selectedDate }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm text-gray-400">Data</h2>
      <p className="text-sm">
        {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
      </p>
    </div>
  );
};

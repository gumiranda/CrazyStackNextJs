import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AppointmentDateTimeProps {
  appointmentDate: Date;
}

export const AppointmentDateTime: React.FC<AppointmentDateTimeProps> = ({
  appointmentDate,
}) => {
  return (
    <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
      <p className="text-sm capitalize">
        {format(appointmentDate, "MMMM", { locale: ptBR })}
      </p>
      <p className="text-2xl">
        {format(appointmentDate, "dd", { locale: ptBR })}
      </p>
      <p className="text-sm">
        {format(appointmentDate, "HH:mm", { locale: ptBR })}
      </p>
    </div>
  );
};

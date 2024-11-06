import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { statusMap } from "@/slices/belezix/entidades/request/request.model";
import { AppointmentStatusBadge } from "./appointment-badge";

interface AppointmentHeaderProps {
  serviceName: string;
  ownerName: string;
  ownerImageUrl: string;
  status: number;
}

export const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  serviceName,
  ownerName,
  ownerImageUrl,
  status,
}) => {
  return (
    <div className="flex flex-col gap-2 py-5 pl-5">
      <AppointmentStatusBadge status={status} />
      <h3 className="font-semibold">{serviceName}</h3>
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={ownerImageUrl} alt={ownerName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {ownerName.toUpperCase().charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm">{ownerName}</p>
      </div>
    </div>
  );
};

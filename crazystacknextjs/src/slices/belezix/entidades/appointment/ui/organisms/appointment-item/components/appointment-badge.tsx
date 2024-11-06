import { Badge } from "@/components/ui/badge";
import { statusMap } from "@/slices/belezix/entidades/request/request.model";

interface AppointmentStatusBadgeProps {
  status: number;
}

export const AppointmentStatusBadge: React.FC<AppointmentStatusBadgeProps> = ({
  status,
}) => {
  return (
    <Badge
      className="w-fit"
      variant={
        [7, 1].includes(status)
          ? "default"
          : [2, 3, 4, 5].includes(status)
          ? "destructive"
          : "secondary"
      }
    >
      {statusMap[status]}
    </Badge>
  );
};

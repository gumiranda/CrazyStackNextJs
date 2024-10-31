import { CardContent, Card } from "@/components/ui/card";
import {
  DateDisplay,
  OwnerDisplay,
  PriceDisplay,
  TimeDisplay,
} from "./components";

interface Service {
  name: string;
  price: number;
}

interface Owner {
  name: string;
}
interface AppointmentSummaryProps {
  service: Service;
  owner: Owner;
  selectedDate: Date;
  professional?: { name: string };
}

export function AppointmentSummary({
  service,
  owner,
  selectedDate,
  professional,
}: AppointmentSummaryProps) {
  if (!service || !owner || !selectedDate) {
    return null;
  }
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <PriceDisplay name={service?.name} price={service?.price} />
        <DateDisplay selectedDate={selectedDate} />
        <TimeDisplay selectedDate={selectedDate} />
        <OwnerDisplay name={owner?.name} label="Estabelecimento" />
        {professional && (
          <OwnerDisplay name={professional?.name} label="Profissional" />
        )}
      </CardContent>
    </Card>
  );
}

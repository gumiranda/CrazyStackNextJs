import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface AppointmentOwnerProps {
  owner: { imageUrl: string; name: string; address: string };
}

export const AppointmentOwner: React.FC<AppointmentOwnerProps> = ({
  owner,
}) => {
  return (
    <Card className="z-50 mx-5 mt-4 mb-3 w-full rounded-xl">
      <CardContent className="flex items-center gap-3 px-5 py-3">
        <Avatar>
          <AvatarImage src={owner?.imageUrl} alt={owner?.name} />
          <AvatarFallback> {owner?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold">{owner?.name}</h3>
          <p className="text-xs">{owner?.address ?? "Sem endereço"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

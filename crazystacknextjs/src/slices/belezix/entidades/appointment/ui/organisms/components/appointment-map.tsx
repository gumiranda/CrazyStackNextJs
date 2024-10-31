import { AppointmentOwner } from "./appointment-owner";

interface AppointmentMapProps {
  owner: { imageUrl: string; name: string; address: string };
  location: { lat: number; lng: number };
}

export const AppointmentMap: React.FC<AppointmentMapProps> = ({
  owner,
  location,
}) => {
  return (
    <div className="ml-4 relative flex-col mt-6 flex h-[280px] w-full items-end">
      <AppointmentOwner owner={owner} />
    </div>
  );
};

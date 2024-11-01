interface AppointmentTimeListProps {
  timeList: string[];
  selectedTime: string | undefined;
  onSelect: (time: string) => void;
}

export const AppointmentTimeList = ({
  timeList,
  selectedTime,
  onSelect,
}: AppointmentTimeListProps) => {
  return <></>;
};

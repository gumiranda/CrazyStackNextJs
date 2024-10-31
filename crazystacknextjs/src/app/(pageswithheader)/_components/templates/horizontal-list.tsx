import React from "react";
import { OwnerItem } from "@/slices/belezix/entidades/owner/ui/owner-item";
import { AppointmentItem } from "@/slices/belezix/entidades/appointment/ui/organisms/appointment-item";

const ItemComponent: { [key: string]: React.ElementType } = {
  owner: OwnerItem,
  appointment: AppointmentItem,
};

export const HorizontalList = ({
  title = "Agendamentos",
  array,
  type,
  widthCard,
}: {
  title?: string;
  array: any;
  type: string;
  widthCard: number;
}) => {
  return (
    <>
      {array.length > 0 && (
        <>
          <div>
            <h2>{title}</h2>
          </div>
          {array.map((item: any, index: number) => (
            <div key={item?._id ?? index} className={`min-w-[${widthCard}px]`}>
              {React.createElement(ItemComponent[type], { item })}
            </div>
          ))}
        </>
      )}
    </>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import { AppointmentItem } from "@/slices/belezix/entidades/appointment/ui/organisms";
import { getRequests } from "@/slices/belezix/entidades/request/request.api";
import { startOfDay } from "date-fns";
import { useState } from "react";

interface AppointmentsListProps {
  initialConfirmedAppointments: any[];
  initialConcludedAppointments: any[];
  confirmedTotalCount: number;
  concludedTotalCount: number;
  cookies: any;
}

export default function AppointmentsList({
  initialConfirmedAppointments,
  initialConcludedAppointments,
  confirmedTotalCount,
  concludedTotalCount,
  cookies,
}: AppointmentsListProps) {
  const [confirmedAppointments, setConfirmedAppointments] = useState(
    initialConfirmedAppointments,
  );
  const [concludedAppointments, setConcludedAppointments] = useState(
    initialConcludedAppointments,
  );
  const [confirmedPage, setConfirmedPage] = useState(1);
  const [concludedPage, setConcludedPage] = useState(1);
  const [loadingConfirmed, setLoadingConfirmed] = useState(false);
  const [loadingConcluded, setLoadingConcluded] = useState(false);
  const fetchMoreConfirmed = async () => {
    if (loadingConfirmed || confirmedAppointments.length >= confirmedTotalCount)
      return;
    setLoadingConfirmed(true);
    const nextPage = confirmedPage + 1;
    const { requests = [] } = await getRequests(nextPage, cookies, {
      initDate: startOfDay(new Date()).toISOString(),
      sortBy: "initDate",
      typeSort: "desc",
    });
    setConfirmedAppointments((prev) => {
      const unique = [...prev, ...(requests ?? [])].filter(
        (item, index, self) =>
          self.findIndex((c) => c._id === item._id) === index,
      );
      return unique;
    });
    setConfirmedPage(nextPage);
    setLoadingConfirmed(false);
  };
  const fetchMoreConcluded = async () => {
    if (loadingConcluded || concludedAppointments.length >= concludedTotalCount)
      return;
    setLoadingConcluded(true);
    const nextPage = concludedPage + 1;
    const { requests = [] } = await getRequests(nextPage, cookies, {
      endDate: new Date().toISOString(),
      sortBy: "initDate",
      typeSort: "desc",
    });
    setConcludedAppointments((prev) => {
      const unique = [...prev, ...(requests ?? [])].filter(
        (item, index, self) =>
          self.findIndex((c) => c._id === item._id) === index,
      );
      return unique;
    });
    setConcludedPage(nextPage);
    setLoadingConcluded(false);
  };
  return (
    <div className="space-y-3 p-5">
      <h1 className="text-xl font-bold">Agendamentos</h1>
      {confirmedAppointments.length === 0 &&
        concludedAppointments.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}
      {confirmedAppointments?.length > 0 && (
        <>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Futuros
          </h2>
          {confirmedAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment?._id}
              item={JSON.parse(JSON.stringify(appointment))}
            />
          ))}
          {confirmedAppointments.length < confirmedTotalCount && (
            <Button
              onClick={fetchMoreConfirmed}
              disabled={loadingConfirmed}
              className="mt-4 w-full"
              variant="outline"
            >
              {loadingConfirmed ? "Carregando..." : "Ver mais"}
            </Button>
          )}
        </>
      )}{" "}
      {concludedAppointments.length > 0 && (
        <>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Finalizados
          </h2>
          {concludedAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment?.id ?? appointment?._id}
              item={JSON.parse(JSON.stringify(appointment))}
            />
          ))}
          {concludedAppointments.length < concludedTotalCount && (
            <Button
              onClick={fetchMoreConcluded}
              disabled={loadingConcluded}
              className="mt-4 w-full"
              variant="outline"
            >
              {loadingConcluded ? "Carregando..." : "Ver mais"}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

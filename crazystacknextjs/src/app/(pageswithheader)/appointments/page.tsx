import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { getCookies, parseCookies } from "@/shared/libs/utils";
import { getRequests } from "@/slices/belezix/entidades/request/request.api";
import { startOfDay } from "date-fns";
import AppointmentsList from "./AppointmentsList";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Meus Agendamentos`,
  description: `Página de listagem dos meus agendamentos do ${whitelabel.systemName}. Aqui você pode listar e cancelar seus agendamentos.`,
};
async function getAppointments() {
  try {
    const cookies = await getParsedCookies();
    if (!cookies) {
      return null;
    }
    const {
      requests: confirmedAppointments = [],
      totalCount: confirmedTotalCount = 0,
    } = await getRequests(1, cookies, {
      initDate: startOfDay(new Date()).toISOString(),
      sortBy: "initDate",
      typeSort: "desc",
    });

    const {
      requests: concludedAppointments = [],
      totalCount: concludedTotalCount = 0,
    } = await getRequests(1, cookies, {
      endDate: startOfDay(new Date()).toISOString(),
      sortBy: "initDate",
    });
    return {
      confirmedAppointments,
      confirmedTotalCount,
      concludedAppointments,
      concludedTotalCount,
      cookies,
    };
  } catch (error) {
    return null;
  }
}
export default async function Page() {
  const appointments = await getAppointments();
  if (!appointments) return null;
  const {
    confirmedAppointments,
    confirmedTotalCount,
    concludedAppointments,
    concludedTotalCount,
    cookies,
  } = appointments;
  return (
    <AppointmentsList
      initialConfirmedAppointments={confirmedAppointments}
      initialConcludedAppointments={concludedAppointments}
      confirmedTotalCount={confirmedTotalCount}
      concludedTotalCount={concludedTotalCount}
      cookies={cookies}
    />
  );
}
async function getParsedCookies() {
  const cookies = await getCookies();
  if (!cookies) {
    return null;
  }
  if (!cookies) {
    return null;
  }
  const parsedCookies = parseCookies(cookies);
  if (!parsedCookies?.["belezixclient.token"]) {
    return null;
  }
  return parsedCookies;
}

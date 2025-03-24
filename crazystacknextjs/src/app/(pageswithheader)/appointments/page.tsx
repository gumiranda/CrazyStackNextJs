import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { parseCookies } from "@/shared/libs/utils";
import { getRequests } from "@/slices/belezix/entidades/request/request.api";
import { startOfDay } from "date-fns";
import AppointmentsList from "./AppointmentsList";
import { cookies } from "next/headers";

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
    <main className="max-w-4xl mx-auto">
      <AppointmentsList
        initialConfirmedAppointments={confirmedAppointments}
        initialConcludedAppointments={concludedAppointments}
        confirmedTotalCount={confirmedTotalCount}
        concludedTotalCount={concludedTotalCount}
        cookies={cookies}
      />
    </main>
  );
}
async function getParsedCookies() {
  const cookieStore = (await cookies()).getAll();

  if (!cookieStore) {
    return null;
  }

  const parsedCookies = parseCookies(cookieStore);
  if (!parsedCookies?.["belezixclient.token"]) {
    return null;
  }
  return parsedCookies;
}

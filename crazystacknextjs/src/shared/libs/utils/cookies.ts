import { cookies } from "next/headers";
export async function getCookies(): Promise<any> {
  try {
    const cookieStore = (await cookies()).getAll();
    return cookieStore;
  } catch (error) {
    console.error("Error getting cookies", error);
    return null;
  }
}

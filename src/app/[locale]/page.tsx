import { STORE } from "@/lib/constains/constains";
import { redirect } from "next/navigation";

export default function RootPage() {
  // This will be server-side redirected to the dashboard
  redirect(`${STORE}/ar`);
  
  // This return is needed for TypeScript, but won't be reached due to the redirect
  return null;
}

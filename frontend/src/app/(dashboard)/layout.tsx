import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { ClientLayout } from "@/components/ui/ClientLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ClientLayout userEmail={user?.email}>{children}</ClientLayout>;
}
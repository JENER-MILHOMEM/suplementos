import { AdminGuard } from "@/components/admin-guard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AdminGuard>
      {children}
    </AdminGuard>
  );
}

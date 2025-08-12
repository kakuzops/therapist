import { SideBarDashboard } from "./_components/sidebar-dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBarDashboard>
        {children}
        </SideBarDashboard>
    </>
  );
}
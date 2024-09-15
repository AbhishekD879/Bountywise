import BountyWiseSidebar from "./_components/BountywiseDashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[calc(100%_-_76px)]">
      <div className="h-full">
        <BountyWiseSidebar />
      </div>
      <div className="flex-1 bg-green-400">{children}</div>
    </div>
  );
}

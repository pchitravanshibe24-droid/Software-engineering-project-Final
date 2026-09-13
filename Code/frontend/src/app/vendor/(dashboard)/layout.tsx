import VendorSidebar from "@/components/VendorSidebar";

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-vendor-gray/30 flex">
      <VendorSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}


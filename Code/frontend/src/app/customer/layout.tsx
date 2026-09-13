import CustomerNavbar from "@/components/CustomerNavbar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-vendor-gray/30 flex flex-col">
      <CustomerNavbar />
      <main className="flex-1 pb-20">{children}</main>
    </div>
  );
}


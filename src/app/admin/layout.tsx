export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen bg-[url('/admin/images/body-bg-1.webp')] bg-cover bg-center">
      {children}
    </div>
  );
}

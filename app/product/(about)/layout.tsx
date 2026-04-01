export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-200 text-center">Layout secundário!</h1>
      <div className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}

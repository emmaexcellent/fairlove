import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative container mx-auto !px-4 pt-12 pb-16">
        <AnimatedBackground />
        <div className="absolute inset-0 -z-20" />
        <div className="absolute -top-24 -left-12 h-64 w-64 rounded-full bg-gradient-to-br from-rose-200/60 via-fuchsia-100/50 to-sky-100/50 blur-3xl -z-10" />
        <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-100/60 via-rose-50/70 to-indigo-100/60 blur-3xl -z-10" />
        {children}
      </main>
    </>
  );
}

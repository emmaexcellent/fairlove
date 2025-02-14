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
      <main className="w-full max-w-6xl mx-auto p-4">
        <AnimatedBackground />
        {children}
      </main>
    </>
  );
}

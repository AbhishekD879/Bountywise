import Services from "./_components/Services";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main className="p-6 space-y-8 flex flex-col items-center">
      <Hero />
      <Services />
    </main>
  );
}

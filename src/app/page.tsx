import { Card } from "@/components/ui/card";
import {
  CheckCheckIcon,
  CheckIcon,
  ConciergeBellIcon,
  ContactIcon,
} from "lucide-react";
import Services from "./_components/Services";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 p-6 space-y-8">
      <Hero/>
      <Services />
    </main>
  );
}

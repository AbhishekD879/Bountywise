import { Card } from "@/components/ui/card";
import CONSTANT, { Service } from "@/constants";
import { ContactIcon, CheckIcon, ConciergeBellIcon } from "lucide-react";

export default function Services() {
  return (
    <div className="grid gap-8 mt-12 md:grid-cols-3 m-auto">
      {CONSTANT.SERVICES.map((service) => {
        return <ServiceCard key={service.title} {...service} />;
      })}
    </div>
  );
}

const ServiceCard = ({ icon: Icon, title, desc }: Service) => (
  <Card className="p-6 text-center bg-white shadow-md">
    <Icon className="h-12 w-12 text-accentOrange mx-auto" />
    <h3 className="mt-4 text-xl font-semibold">{title}</h3>
    <p className="mt-2 text-blueGray">{desc}</p>
  </Card>
);

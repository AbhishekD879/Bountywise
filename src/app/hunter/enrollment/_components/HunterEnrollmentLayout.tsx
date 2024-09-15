// components/HunterEnrollmentLayout.tsx (Server Component)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HunterEnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Hunter Profile Setup
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

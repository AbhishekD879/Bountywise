import { Mail } from "lucide-react";
import Link from "next/link";

export default function HeaderMessages() {
  return (
    <Link href="/dashboard/messages">
      <Mail className="w-6 h-6" />
    </Link>
  );
}

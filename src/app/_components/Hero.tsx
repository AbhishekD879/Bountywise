import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Expert Advice On-Demand</h1>
        <p className="mt-4 text-lg text-[#46515e]">
          Post a bounty, connect with professionals, solve your problems.
        </p>
      </div>
      <div className="flex space-x-4">
        <Button className="bg-[#ff5722] text-[#ffffff]">Post a Bounty</Button>

        <Link href="hunter/enrollment">
          <Button className="bg-[#46515e] text-[#ffffff]">
            Enroll as a Hunter
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wrench,
  ArrowRight,
  Server,
  Shield,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function MaintenancePage() {
  return (
    <html>
      <body className="grid place-content-center h-screen">
        <div className="h-[calc(100%_-_76px)]  bg-white flex flex-col">
          <main className="flex-grow flex flex-col items-center justify-center p-6 text-[#303841]">
            <div className="max-w-2xl w-full space-y-12">
              <div className="text-center space-y-4">
                <div className="flex justify-center space-x-8">
                  <Wrench
                    className="w-16 h-16 text-[#ff5722] icon-float"
                    style={{ animationDelay: "0s" }}
                  />
                  <Server
                    className="w-16 h-16 text-[#ff5722] icon-float"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <Shield
                    className="w-16 h-16 text-[#ff5722] icon-float"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
                <h1 className="text-4xl font-bold">
                  We&apos;re improving BountyWise
                </h1>
                <p className="text-xl text-[#46515e]">
                  Our site is currently undergoing maintenance. We&apos;ll be
                  back shortly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="h-[1px] bg-[#e0e0e0]" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#46515e] flex items-center">
                    <Clock className="w-4 h-4 mr-2 icon-spin" />
                    Estimated downtime
                  </span>
                  <span className="text-sm font-medium">2 hours</span>
                </div>
                <div className="h-[1px] bg-[#e0e0e0]" />
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  What we&apos;re working on:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 transition-transform duration-300 hover:translate-y-[-5px]">
                    <Zap className="w-6 h-6 text-[#ff5722]" />
                    <span>Performance upgrades</span>
                  </div>
                  <div className="flex items-center space-x-2 transition-transform duration-300 hover:translate-y-[-5px]">
                    <Shield className="w-6 h-6 text-[#ff5722]" />
                    <span>Security enhancements</span>
                  </div>
                  <div className="flex items-center space-x-2 transition-transform duration-300 hover:translate-y-[-5px]">
                    <Server className="w-6 h-6 text-[#ff5722]" />
                    <span>Server optimizations</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Get notified when we&apos;re back
                </h2>
                {false ? (
                  <p className="text-[#46515e] flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Thank you! We&apos;ll notify you when we&apos;re back
                    online.
                  </p>
                ) : (
                  <form className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow border-[#e0e0e0] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722] focus:border-transparent"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-[#ff5722] hover:bg-[#ff784e] transition-all duration-300 transform hover:scale-105"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </main>

          <footer className="w-full p-6 text-center text-sm text-[#46515e]">
            <p>
              &copy; {new Date().getFullYear()} BountyWise. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}

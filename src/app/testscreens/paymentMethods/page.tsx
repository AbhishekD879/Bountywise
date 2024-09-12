"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Building,
  Smartphone,
  Trash2,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PaymentMethod = {
  type: "card" | "bank" | "paypal" | "upi";
  value: string;
};

export default function PaymentMethods() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [savedMethods, setSavedMethods] = useState<PaymentMethod[]>([]);
  const [methodToDelete, setMethodToDelete] = useState<number | null>(null);

  const handleAddPaymentMethod = (
    type: PaymentMethod["type"],
    value: string,
  ) => {
    setSavedMethods([...savedMethods, { type, value }]);
  };

  const handleRemovePaymentMethod = (index: number) => {
    setSavedMethods(savedMethods.filter((_, i) => i !== index));
    setMethodToDelete(null);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddPaymentMethod("card", `Card ending in ${cardNumber.slice(-4)}`);
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddPaymentMethod(
      "bank",
      `Bank account ending in ${bankAccount.slice(-4)}`,
    );
    setBankAccount("");
    setRoutingNumber("");
  };

  const handleAddPaypal = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddPaymentMethod("paypal", paypalEmail);
    setPaypalEmail("");
  };

  const handleAddUpi = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddPaymentMethod("upi", upiId);
    setUpiId("");
  };

  const groupedMethods = savedMethods.reduce(
    (acc, method) => {
      if (!acc[method.type]) {
        acc[method.type] = [];
      }
      acc[method.type].push(method);
      return acc;
    },
    {} as Record<PaymentMethod["type"], PaymentMethod[]>,
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 h-auto">
            <TabsTrigger
              value="card"
              className="flex flex-col items-center py-2 px-1"
            >
              <CreditCard className="w-4 h-4 mb-1" />
              <span className="text-xs">Card</span>
            </TabsTrigger>
            <TabsTrigger
              value="bank"
              className="flex flex-col items-center py-2 px-1"
            >
              <Building className="w-4 h-4 mb-1" />
              <span className="text-xs">Bank</span>
            </TabsTrigger>
            <TabsTrigger
              value="paypal"
              className="flex flex-col items-center py-2 px-1"
            >
              <DollarSign className="w-4 h-4 mb-1" />
              <span className="text-xs">PayPal</span>
            </TabsTrigger>
            <TabsTrigger
              value="upi"
              className="flex flex-col items-center py-2 px-1"
            >
              <Smartphone className="w-4 h-4 mb-1" />
              <span className="text-xs">UPI</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  className="border-gray-300"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="border-gray-300"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    className="border-gray-300"
                    placeholder="123"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add Card
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="bank">
            <form onSubmit={handleAddBank} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account Number</Label>
                <Input
                  id="bankAccount"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  required
                  className="border-gray-300"
                  placeholder="123456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  id="routingNumber"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  required
                  className="border-gray-300"
                  placeholder="987654321"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add Bank Account
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="paypal">
            <form onSubmit={handleAddPaypal} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paypalEmail">PayPal Email Address</Label>
                <Input
                  id="paypalEmail"
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  required
                  className="border-gray-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add PayPal Account
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="upi">
            <form onSubmit={handleAddUpi} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  className="border-gray-300"
                  placeholder="yourname@upi"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add UPI ID
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Saved Payment Methods</h3>
          {Object.entries(groupedMethods).map(([type, methods]) => (
            <div key={type} className="mb-4">
              <h4 className="text-md font-medium mb-2 capitalize">{type}</h4>
              <div className="space-y-3">
                {methods.map((method, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      {method.type === "card" && (
                        <CreditCard className="w-5 h-5 text-blue-500" />
                      )}
                      {method.type === "bank" && (
                        <Building className="w-5 h-5 text-green-500" />
                      )}
                      {method.type === "paypal" && (
                        <DollarSign className="w-5 h-5 text-blue-700" />
                      )}
                      {method.type === "upi" && (
                        <Smartphone className="w-5 h-5 text-purple-500" />
                      )}
                      <span className="font-medium text-sm">
                        {method.value}
                      </span>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setMethodToDelete(
                              savedMethods.findIndex((m) => m === method),
                            )
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your saved payment method.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setMethodToDelete(null)}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              methodToDelete !== null &&
                              handleRemovePaymentMethod(methodToDelete)
                            }
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {savedMethods.length === 0 && (
            <div className="text-center py-4">
              <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <p className="text-gray-500">No payment methods saved yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export function Modal({
  children,
  modalComponent,
}: React.PropsWithChildren & {
  modalComponent: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>{""}</DialogTitle>
        {modalComponent}
      </DialogContent>
    </Dialog>
  );
}

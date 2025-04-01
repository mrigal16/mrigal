"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/db/schema";

interface UserDeleteFormProps {
  session: Session | null;
}
export function UserDeleteForm({ session }: UserDeleteFormProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmation, setConfirmation] = useState("");
  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      toast.loading("Deleting account...", { id: "deleteAccountToast" });
      if (confirmation !== session?.user?.name) {
        toast.error("Please type your name to confirm", {
          id: "deleteAccountToast",
        });
        return;
      }
      await authClient
        .deleteUser()
        .then(async () => {
          toast.success("Account deleted successfully", {
            id: "deleteAccountToast",
          });
          router.refresh();
          //trackEvent("User Delete Account");
        })
        .catch((err: any) => {
          toast.error(err.message ?? "Something went wrong.", {
            id: "deleteAccountToast",
          });
        });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogTitle>Confirm Account Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action is
            irreversible, and all your data will be permanently deleted. Please
            confirm if you wish to proceed.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="space-y-1">
          <span>
            Please type <b>{session?.user.name}</b> to confirm
          </span>
          <Input
            type="text"
            onChange={(e) => setConfirmation(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-destructive/90 hover:bg-destructive"
            onClick={onSubmit}
            disabled={isPending || confirmation !== session?.user?.name}
          >
            I understand the consequences, delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

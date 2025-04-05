"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Loader2, LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient, deleteUser } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Session } from "@/db/schema";
interface UserDeleteFormProps {
  session: Session | null;
}
const UserDeleteForm = ({ session }: UserDeleteFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [confirmation, setConfirmation] = useState(session?.user?.name);
  const router = useRouter();

  function onSubmit() {
    startTransition(async () => {
      toast.loading("Suppression du compte en cours...", {
        id: "deleteAccountToast",
      });
      if (confirmation !== session?.user?.name) {
        toast.error("Veuillez taper votre nom pour confirmer", {
          id: "deleteAccountToast",
        });
        return;
      }
      await authClient
        .deleteUser({
          fetchOptions: {
            onSuccess: () => {
              toast.success("good ");
              router.push("/");
              redirect("/");
            },
          },
        })
        .catch((err) => {
          toast.error(err.message ?? "Une erreur s'est produite.", {
            id: "deleteAccountToast",
          });
        });
    });
  }
  return (
    <>
      {console.log(session?.user.name)}
      <Card className="mt-2">
        <CardHeader>
          <CardTitle className="text-red-500">Supprimer compte</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className=" cursor-pointer text-white"
              >
                Supprimer votre compte
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera
                  définitivement votre compte et effacera vos données de nos
                  serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  className=" cursor-pointer w-full bg-destructive/90 hover:bg-destructive text-white"
                  onClick={onSubmit}
                  disabled={isPending || confirmation !== session?.user?.name}
                >
                  Continuer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </>
  );
};
export default UserDeleteForm;

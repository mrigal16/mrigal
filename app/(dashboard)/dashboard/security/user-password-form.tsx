"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";
import { boolean, object, string } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const getPasswordSchema = (
    type: "mot de passe" | "confirmer mot de passe" | "mot de passe actuel"
  ) =>
    string({ required_error: `${type} est requis` })
      .min(8, `${type} doit contenir au moins 8 caractères`)
      .max(32, `${type} ne peut pas dépasser 32 caractères`);
  const getRevokeOtherSessionsSchema = () => boolean().optional();
  const updatePasswordSchema = object({
    revokeOtherSessions: getRevokeOtherSessionsSchema(),
    currentPassword: getPasswordSchema("mot de passe actuel"),
    password: getPasswordSchema("mot de passe"),
    confirmPassword: getPasswordSchema("confirmer mot de passe"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
      revokeOtherSessions: true,
    },
  });
  const { isDirty } = form.formState;

  function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    startTransition(async () => {
      await authClient.changePassword(
        {
          newPassword: values.password,
          currentPassword: values.currentPassword,
          revokeOtherSessions: values.revokeOtherSessions,
        },
        {
          onRequest: () => {
            toast.loading("Mise à jour ...", {
              id: "updatePasswordToast",
            });
          },
          onSuccess: () => {
            toast.success("Mot de passe mis à jour avec succès", {
              id: "updatePasswordToast",
            });
            form.reset();
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message ?? "Something went wrong.", {
              id: "updatePasswordToast",
            });
          },
        }
      );
    });
  }

  return (
    <section className="">
      <Card className="">
        <CardHeader>
          <CardTitle>Changer mot de Passe </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de Passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="revokeOtherSessions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Révoquer toutes les autres sessions</FormLabel>
                      <FormDescription>
                        Cela vous déconnectera de tous les autres appareils et
                        sessions à l'exception de celle-ci.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button disabled={!isDirty}>
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Mettre à jour le mot de passe"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </section>
  );
}

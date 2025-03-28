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
import { Loader2, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient, changePassword } from "@/lib/auth-client";
import { boolean, object, string } from "zod";
import { Button } from "@/components/ui/button";

export default function UserPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const getPasswordSchema = (
    type: "password" | "confirmPassword" | "currentPassword"
  ) =>
    string({ required_error: `${type} is required` })
      .min(8, `${type} must be atleast 8 characters`)
      .max(32, `${type} can not exceed 32 characters`);
  const getRevokeOtherSessionsSchema = () => boolean().optional();
  const updatePasswordSchema = object({
    revokeOtherSessions: getRevokeOtherSessionsSchema(),
    currentPassword: getPasswordSchema("currentPassword"),
    password: getPasswordSchema("password"),
    confirmPassword: getPasswordSchema("confirmPassword"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
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
            console.log("error", ctx);
          },
        }
      );
    });
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
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
                <FormLabel>New password</FormLabel>
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
                <FormLabel>Confirm password</FormLabel>
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
                  <FormLabel>Revoke all other sessions</FormLabel>
                  <FormDescription>
                    This will sign you out from all other devices and sessions
                    except the current one.
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
      <Toaster />
    </section>
  );
}

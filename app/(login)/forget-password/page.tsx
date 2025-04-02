"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ForgotPasswordSchema = z.object({
  email: z
    .string() // string type
    .email({ message: "Invalid type" }) // checks if the input given by the user is email
    .min(1, { message: "Email is required" }), // checks if the email field is empty or not
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      // Call the authClient's forgetPassword method, passing the email and a redirect URL.
      await authClient.forgetPassword(
        {
          email: values.email, // Email to which the reset password link should be sent.
          redirectTo: "/reset-password", // URL to redirect the user after resetting the password.
        },
        {
          // Lifecycle hooks to handle different stages of the request.
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            form.reset();
            setLoading(true);
          },
          onSuccess: () => {
            setSuccess("Reset password link has been sent");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        }
      );
    } catch (error) {
      // catch the error

      setError("Something went wrong");
    }
  };

  return (
    <Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
      <CardTitle className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Oublié mot de passe
      </CardTitle>
      <CardDescription className="mt-8 text-center sm:mx-auto sm:w-full sm:max-w-md">
        Entrez votre email pour envoyer le lien de réinitialisation du mot de
        passe
      </CardDescription>
      <Form {...form}>
        <form className="space-y-6 mt-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button disabled={loading} type="submit" className="w-full">
            Envoyer
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ForgotPassword;

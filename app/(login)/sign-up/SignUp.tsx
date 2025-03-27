"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";

import { ActionState } from "@/lib/middelware";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUp } from "../actions";

export function SignUpFuc() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const FormSchema = z.object({
    name: z
      .string()
      .min(5, {
        message: "Le nom complet doit contenir au moins 2 caractères.",
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message:
          "Le nom complet ne doit contenir que des lettres et des espaces.",
      }),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
    username: z
      .string()
      .min(9, { message: "Le code client doit contenir 9 caractères" })
      .max(9)
      .regex(/^\d+$/, "Le code client doit contenir uniquement des chiffres"),
    email: z.string().email({ message: "Adresse e-mail est invalide." }),
    adresse: z
      .string()
      .min(5, { message: "L'adresse doit contenir au moins 5 caractères." })
      .regex(/^[a-zA-Z0-9À-ÖØ-öø-ÿ\s-]+$/, {
        message: "L'adresse contient des caractères invalides.",
      }),
    commune: z
      .string()
      .min(2, {
        message: "La commune doit contenir au moins 2 caractères.",
      })
      .regex(/^[a-zA-Z0-9À-ÖØ-öø-ÿ\s-]+$/, {
        message: "La commune contient des caractères invalides.",
      }),
    ilot: z
      .string()
      .min(2, {
        message: "Le ilot complet doit contenir au moins 2 caractères.",
      })
      .regex(/^[a-zA-Z0-9À-ÖØ-öø-ÿ\s-]+$/, {
        message: "Le ilot contient des caractères invalides.",
      }),
    phone: z.string().regex(/^[0-9]{10}$/, {
      message: "Veuillez entrer un numéro de téléphone valide à 10 chiffres.",
    }),
  });
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signUp,

    {
      error: "",
    }
  );

  const formSign = useForm<z.infer<typeof FormSchema>>({
    //!Comment below line to disable client-side validation for testing server-side validation
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      adresse: "",
      commune: "",
      phone: "",
      email: "",
      ilot: "",
    },
  });

  function onSubmitHandler() {
    startTransition(() => {
      formAction(new FormData(formRef.current!));
    });
  }

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(
        "Formulaire soumis avec succès! Vos informations ont été enregistrées."
      );
    }
  }, [state]);

  interface OpenNewTabButtonProps {
    url: string;
    label: string;
  }

  const OpenNewTabButton: React.FC<OpenNewTabButtonProps> = ({
    url,
    label,
  }) => {
    return (
      <Link
        href={url}
        passHref
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:underline"
      >
        <Label
          htmlFor={label}
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      </Link>
    );
  };
  return (
    <Card className=" flex flex-col  justify-center py-4 px-4 sm:px-6 lg:px-8 bg-gray-50  rounded-md shadow-xl">
      <div className="">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
          Créer un compte
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Form {...formSign}>
          <form
            ref={formRef}
            onSubmit={formSign.handleSubmit(onSubmitHandler)}
            className="max-w-md  space-y-3"
          >
            <FormField
              control={formSign.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nom Complet
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      id="name"
                      type="text"
                      autoComplete="name"
                      maxLength={50}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Entrez votre nom et prénom"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSign.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="adresse"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Adresse
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="adresse"
                      type="text"
                      required
                      autoComplete="adresse"
                      maxLength={50}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Entrez votre adresse"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-1 flex-grow gap-8">
              <FormField
                control={formSign.control}
                name="commune"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="commune"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Commune
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="commune"
                        type="commune"
                        required
                        autoComplete="commune"
                        maxLength={50}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                        placeholder="Entrez votre commune"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSign.control}
                name="ilot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="ilot"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ilot
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="ilot"
                        type="ilot"
                        autoComplete="ilot"
                        required
                        maxLength={50}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                        placeholder="Entrez votre ilot"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={formSign.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Entrez votre email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSign.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Numéro de Téléphone
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      autoComplete="phone"
                      maxLength={10}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Entrez votre numéro de téléphone Ex: 0* ** ** ** **"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formSign.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code Client
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      required
                      maxLength={9}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Enter votre code client"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formSign.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={8}
                      maxLength={100}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 "
                      placeholder="Enter votre mot de passe "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2 ">
              <Checkbox id="terms" className="border border-black " required />
              <label
                htmlFor="terms"
                className="text-left text-sm text-gray-600 hover:underline hover:underline-offset-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Link
                  href={"/mentions-legales"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accepter les termes et conditions
                </Link>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="politique"
                className="border border-black"
                required
              />
              <label
                htmlFor="politique"
                className=" text-left  text-gray-600 hover:underline hover:underline-offset-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Link
                  href={"/politique-de-confidentialite"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accepter les politique
                </Link>
              </label>
            </div>
            {/* Show pending state while submiting */}
            <Button
              onClick={() => console.log(formSign)}
              type="submit"
              className="w-full flex justify-center items-center px-4 border border-transparent rounded-md
   shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              disabled={pending}
            >
              {pending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Connecter"
              )}
            </Button>
            <div className="mt-4 text-left text-sm text-gray-600 hover:underline hover:underline-offset-1">
              <Link href="/forget-password">Oublie mot de passe ? </Link>
            </div>

            {/* Show error messages from server */}
            <p
              className={`${
                !state?.success ? "text-red-500" : "text-green-500"
              }`}
              aria-live="polite"
            >
              {state?.message}
            </p>
            <div aria-live="polite" className="text-red-500">
              {state?.errors && (
                <ul>
                  {state.errors.map((error: string, index: number) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Vous avez déjà un compte ?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={"/sign-in"}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
            >
              Se connecter à votre compte
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

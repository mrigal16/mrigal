"use client";

import { startTransition, use, useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useUser } from "@/lib/context";
import { useSession } from "@/lib/auth-client";

type ActionState = {
  error?: string;
  success?: string;
};

export default function GeneralPage() {
  //const { userPromise } = useUser();
  //const user = use(userPromise);
  const { data: session } = useSession();
  const user = session?.user;
  const [isPending, setpending] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If you call the Server Action directly, it will automatically
    // reset the form. We don't want that here, because we want to keep the
    // client-side values in the inputs. So instead, we use an event handler
    // which calls the action. You must wrap direct calls with startTransition.
    // When you use the `action` prop it automatically handles that for you.
    // Another option here is to persist the values to local storage. I might
    // explore alternative options.
    startTransition(() => {
      // formAction(new FormData(event.currentTarget));
    });
  };

  return (
    <>
      {console.log(user)}
      <section className="flex-1 p-4 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Nom complet </Label>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
{
  /*<form className="space-y-4" onSubmit={handleSubmit}>
<div>
  <Label htmlFor="name">Name</Label>
  <Input
    id="name"
    name="name"
    placeholder="Enter your name"
    defaultValue={user?.name || ""}
    required
  />
</div>
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    name="email"
    type="email"
    placeholder="Enter your email"
    defaultValue={user?.email || ""}
    required
  />
</div>

<Button
  type="submit"
  className="bg-orange-500 hover:bg-orange-600 text-white"
  disabled={isPending}
>
  {isPending ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </>
  ) : (
    "Save Changes"
  )}
</Button>
</form>*/
}

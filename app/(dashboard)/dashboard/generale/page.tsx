"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useSession } from "@/lib/auth-client";

export default function GeneralPage() {
  //const { userPromise } = useUser();
  //const user = use(userPromise);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <section className="flex-1 p-4 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Nom complet{user?.name} </Label>
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

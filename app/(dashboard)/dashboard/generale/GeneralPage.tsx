import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { format } from "date-fns";

import { Briefcase, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/plugin";

export default async function GeneralPage() {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  return (
    <section className="flex-1 p-4 lg:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                  {user?.username}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  Utilisateur
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-sm">{user?.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Client Code
                  </p>
                  <p className="text-sm">{user?.username}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Role
                  </p>
                  <p className="text-sm">{"Utilisateur"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Adresse
                  </p>
                  <span className="text-sm">{user?.adresse}</span>,
                  <span>{user?.commune},</span>
                  {user?.ilot}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Date D'insecription
                  </p>
                  <p className="text-sm">
                    {user?.createdAt
                      ? format(user.createdAt, "yyyy-MM-dd")
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

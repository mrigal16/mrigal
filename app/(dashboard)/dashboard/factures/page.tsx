import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActivityLogs } from "@/server/server.query";
import { AlertCircle } from "lucide-react";
import Facture_Utilisatuer_Comp from "./Table";

interface SessionUserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  commune: string;
  ilot: string;
  phone: string;
  adresse: string;
  username: string;
  displayUsername: string | null;
  createdAt: Date;
}

export default async function ActivityPage() {
  const factures = await getActivityLogs();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Factures Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {factures.length > 0 ? (
            <Facture_Utilisatuer_Comp FacturesQuery={factures} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pas de Factures
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Demande de paiement d'une facture
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

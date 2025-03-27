import { db } from "@/db/drizzle";
import { facturesTable, livreurTable } from "@/db/schema";
import { getUser } from "@/lib/plugin";
import { and, eq, desc, isNull } from "drizzle-orm";

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const FacturesUser = await db
    .select({
      id: facturesTable.id,
      montant: facturesTable.montant,
      status: facturesTable.status,
      date: facturesTable.DemandeAt,
      num_avis: facturesTable.num_avis,
    })
    .from(facturesTable)
    .leftJoin(livreurTable, eq(facturesTable.livreurNom, livreurTable.id))
    //.leftJoin(
    //  userTable,
    //  eq(facturesTable.utiliateurId, user.code_client)
    //) // Ajout du join manquant
    .where(eq(facturesTable.utiliateurId, user.id))
    .orderBy(desc(facturesTable.DemandeAt))
    .limit(5);

  return FacturesUser;
}

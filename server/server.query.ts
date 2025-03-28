import { db } from "@/db/drizzle";
import { facturesTable, livreurTable, user } from "@/db/schema";
import { getUser } from "@/lib/plugin";
import { and, eq, desc, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    //throw new Error("User not authenticated");
    redirect("/");
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
export async function getInfo() {
  const session = await getUser();
  if (!session) {
    //throw new Error("User not authenticated");
    redirect("/");
  }
  const UserOne = await db.select({
    username: user.username,
    email: user.email,
    commune: user.commune,
    ilot: user.ilot,
    phone: user.phone,
    name: user.name,
    created: user.createdAt,
  });
  return UserOne;
}

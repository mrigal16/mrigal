import { db } from "./drizzle";
import { livreurTable, user } from "./schema";

//async function createStripeProducts() {
//  console.log('Creating Stripe products and prices...');
//
//  const baseProduct = await stripe.products.create({
//    name: 'Base',
//    description: 'Base subscription plan',
//  });
//
//  await stripe.prices.create({
//    product: baseProduct.id,
//    unit_amount: 800, // $8 in cents
//    currency: 'usd',
//    recurring: {
//      interval: 'month',
//      trial_period_days: 7,
//    },
//  });
//
//  const plusProduct = await stripe.products.create({
//    name: 'Plus',
//    description: 'Plus subscription plan',
//  });
//
//  await stripe.prices.create({
//    product: plusProduct.id,
//    unit_amount: 1200, // $12 in cents
//    currency: 'usd',
//    recurring: {
//      interval: 'month',
//      trial_period_days: 7,
//    },
//  });
//
//  console.log('Stripe products and prices created successfully.');
//}
const livreurSeed = async () => {
  const id = 1;
  const nomComplet = "bouiez hhhzd";
  const phone = "7894561238";

  const [livreur] = await db
    .insert(livreurTable)
    .values([
      {
        nomComplet,
        phone,
      },
    ])
    .returning();
  console.log("Initial livreur created.", livreur);
};
async function seed() {
  const email = "test2@test.com";
  const password = "admin123";
  const ilot = "12";
  const name = "yacine bouzir";
  const phone = "1245769562";
  const adresse = "ain benian";
  const commune = "alger";
  const username = "124456789";

  const [userOne] = await db
    .insert(user)
    .values([
      {
        phone,
        name,
        ilot,
        adresse,
        username,
        commune,
        email,
      },
    ])
    .returning();

  console.log("Initial user created.", userOne);

  // const [account] = await db
  //   .insert(accountTable)
  //   .values({
  //     userId: code_client,
  //     password: passwordHash,
  //   })
  //   .returning();

  // //await db.insert(teamMembers).values({
  // //  teamId: team.id,
  // //  userId: user.id,
  // //  role: "owner",
  // //});
  // await createStripeProducts();
}

livreurSeed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });

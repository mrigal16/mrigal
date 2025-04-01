import { supabase } from "@/lib/superbase";

export const getFacturesSignedUrls = async (selectedFactures: string[]) => {
  const signedUrls = [];

  for (const facture of selectedFactures) {
    const { data, error } = await supabase.storage
      .from("factures")
      .createSignedUrl(facture, 60); // 60 seconds validity

    if (error) {
      console.error("Error fetching signed URL:", error);
    } else {
      signedUrls.push({ utiliateurId: facture, url: data.signedUrl });
    }
  }

  return signedUrls;
};

export const getFacturesList = async () => {
  const { data, error } = await supabase.storage.from("factures").list();

  if (error) {
    console.error("Error fetching factures:", error);
    return [];
  }

  return data.map((file) => file.name); // Return an array of filenames
};

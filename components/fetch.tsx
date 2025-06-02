"use client";

import { useEffect, useState } from "react";

export default function FetchInvoice({ invoiceId }: { invoiceId: string }) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const downloadInvoice = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/factures/${invoiceId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch invoice");
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    downloadInvoice();
  }, [invoiceId]);

  return (
    <div>
      {fileUrl ? (
        <a
          href={fileUrl}
          download={`facture-${invoiceId}.pdf`}
          className="hover:underline text-blue-500"
        >
          Télécharger
        </a>
      ) : loading ? (
        <span>Chargement...</span>
      ) : (
        <span>Erreur</span>
      )}
    </div>
  );
}

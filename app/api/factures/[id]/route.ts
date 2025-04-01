import { NextResponse } from "next/server";

import { eq, desc } from "drizzle-orm";
import { invoices } from "@/db/schema";
import { db } from "@/db/drizzle";
import { supabase } from "@/lib/superbase";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing invoice ID" },
        { status: 400 }
      );
    }

    // Fetch invoice from database
    const invoicesList = await db
      .select()
      .from(invoices)
      .where(eq(invoices.utiliateurId, id))
      .orderBy(desc(invoices.createdAt))
      .limit(1);

    if (invoicesList.length === 0) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Extract file path
    const filePath = invoicesList[0].url;
    if (!filePath) {
      return NextResponse.json({ error: "File path missing" }, { status: 400 });
    }

    // Download file from Supabase Storage
    const { data, error } = await supabase.storage
      .from("factures")
      .download(filePath);

    if (error) {
      return NextResponse.json(
        { error: "Error downloading file" },
        { status: 500 }
      );
    }

    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

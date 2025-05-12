"use client";

import { Suspense } from "react";
import ResetPassword from "./ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ResetPassword />
    </Suspense>
  );
}

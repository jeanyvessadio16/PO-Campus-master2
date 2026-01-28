"use client";

import { NotFound } from "@/components/NotFound";

export const metadata = {
  title: "Accès refusé - Campus Master",
  description: "Vous n'avez pas les permissions pour accéder à cette page.",
};

export default function UnauthorizedPage() {
  return (
    <NotFound
      title="Accès refusé"
      description="Vous n'avez pas les permissions suffisantes pour accéder à cette page. Veuillez vérifier votre compte ou contacter l'administrateur."
      showHomeButton={true}
      showBackButton={true}
    />
  );
}

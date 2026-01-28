"use client";

import { NotFound } from "@/components/NotFound";

export const metadata = {
  title: "Erreur serveur - Campus Master",
  description: "Une erreur s'est produite sur le serveur.",
};

export default function ErrorPage() {
  return (
    <NotFound
      title="Erreur serveur"
      description="Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer plus tard."
      showHomeButton={true}
      showBackButton={true}
    />
  );
}

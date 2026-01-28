import { NotFound } from "@/components/NotFound";

export const metadata = {
  title: "Page non trouvée",
  description: "La page que vous recherchez n'existe pas.",
};

export default function NotFoundPage() {
  return (
    <NotFound
      title="Page non trouvée"
      description="Désolé, la page que vous recherchez n'existe pas ou a été supprimée."
      showHomeButton={true}
      showBackButton={true}
    />
  );
}

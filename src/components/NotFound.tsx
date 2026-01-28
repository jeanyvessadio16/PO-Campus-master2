"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

interface NotFoundProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export function NotFound({
  title = "Page non trouvée",
  description = "Désolé, la page que vous recherchez n'existe pas ou a été supprimée.",
  showHomeButton = true,
  showBackButton = true,
}: NotFoundProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl" />
            <div className="relative bg-destructive/10 p-6 rounded-full">
              <AlertCircle className="w-16 h-16 text-destructive" />
            </div>
          </div>
        </div>

        {/* 404 Code */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>

        {/* Error Details */}
        <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm text-muted-foreground">
          <p>L&apos;URL demandée n&apos;existe pas dans notre système.</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          {showBackButton && (
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          )}

          {showHomeButton && (
            <Button
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Accueil
            </Button>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground pt-4">
          Si vous pensez que c&apos;est une erreur, veuillez{" "}
          <a
            href="/contact"
            className="underline hover:text-foreground transition"
          >
            nous contacter
          </a>
          .
        </p>
      </div>
    </div>
  );
}

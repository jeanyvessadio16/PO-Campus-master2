import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { aboutCampusMaster } from "@/data/aboutCampusMaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />
      <main>
        <section className="min-h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-5 text-center px-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Campus Master 2, plateforme de gestion des contenus pédagogiques
            </h1>
            <p className="text-xl">
              Plateforme de gestion des contenus pédagogiques de
              l&apos;Université numérique Cheikh Hamidou Kane
            </p>
            <Button asChild size={"xl"} className="max-w-52 mx-auto">
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>
        </section>
        {/* section about Campus Master */}
        <section className="min-h-screen flex flex-col justify-center items-center px-12">
          <div className="max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              À propos de Campus Master 2
            </h2>
            <p className="text-lg">
              Campus Master est une plateforme innovante conçue pour gérer
              efficacement les contenus pédagogiques de l&apos;Université
              numérique Cheikh Hamidou Kane.
            </p>
          </div>
          <div
            id="aboutCampusMaster"
            className="grid md:grid-cols-3 gap-5 mt-10"
          >
            {aboutCampusMaster.map((item, index) => (
              <Card key={index} className="p-5">
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                </CardContent>
                <CardDescription className="text-md">
                  {item.content}
                </CardDescription>
              </Card>
            ))}
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

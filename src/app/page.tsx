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
      {/* Header navbar */}
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-32 lg:pb-32 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom duration-700 fade-in zoom-in-95">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                  L&apos;excellence académique{" "}
                  <span className="text-blue-600 inline-block relative">
                    digitale
                    <svg
                      className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 50 10 100 5"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Campus Master 2 transforme l&apos;expérience éducative à
                  l&apos;Université numérique Cheikh Hamidou Kane. Gestion
                  simplifiée, apprentissage enrichi.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button
                    asChild
                    size="xl"
                    className="w-full sm:w-auto text-lg h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Link href="/login">Commencer maintenant</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto text-lg h-12 px-8 rounded-xl backdrop-blur bg-white/50 hover:bg-white/80 dark:bg-gray-900/50"
                  >
                    <Link href="#features">Découvrir les fonctionnalités</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10k+", label: "Étudiants" },
                { number: "500+", label: "Enseignants" },
                { number: "100+", label: "Cours" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-blue-600 font-semibold tracking-wide uppercase mb-3">
                Pourquoi Campus Master ?
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Une plateforme conçue pour la réussite
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Découvrez les outils puissants qui rendent l&apos;apprentissage
                et la gestion plus efficaces que jamais.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {aboutCampusMaster.map((item, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-none shadow-md bg-white dark:bg-gray-800 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-blue-600 dark:text-blue-400">
                        {/* icon here */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.content}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

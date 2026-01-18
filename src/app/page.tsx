import { ModeToggle } from "@/components/layout/theme/modeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="min-h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-3 text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              Campus Master 2 plateforme
            </h1>
            <Button asChild size={"xl"} className="max-w-52 mx-auto">
              <Link href="/login" className="no-underline text-white">
                Se connecter
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </section>
      </main>
    </>
  );
}

import { Metadata } from "next";
import LoginPage from "@/components/pages/auth/login/page";

export const metadata: Metadata = {
  title: "Connexion - Campus Master",
  description:
    "Connectez-vous à votre compte Campus Master pour accéder à nos services et ressources exclusives.",
};

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}

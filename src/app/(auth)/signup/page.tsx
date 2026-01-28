import { Metadata } from "next";
import SignupPage from "@/components/pages/auth/signup/page";

export const metadata: Metadata = {
  title: "Inscription - Campus Master",
  description:
    "Créez un compte sur Campus Master pour accéder à nos services et ressources exclusives.",
};

export default function Signup() {
  return (
    <>
      <SignupPage />
    </>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t mt-10 py-14 px-12 flex justify-center items-center bg-gray-950">
      <p className="text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} Campus Master 2. Tous droits réservés.
      </p>
    </footer>
  );
}

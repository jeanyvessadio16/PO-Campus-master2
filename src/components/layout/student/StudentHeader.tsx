import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { ModeToggle } from "../theme/modeToggle";

export default function StudentHeader() {
  return (
    <>
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl justify-between items-center px-4 sm:px-6 lg:px-8">
          <form className="flex items-center gap-2">
            <Input type="text" placeholder="Search..." required />
            <Button type="submit">Search</Button>
          </form>
          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" />
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

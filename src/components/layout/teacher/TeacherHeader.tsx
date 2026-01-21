import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { ModeToggle } from "../theme/modeToggle";
import { DialogAddCourse } from "./AddCourses";
import { DialogAddDevoirs } from "./AddDevoirs";

// header pour enseignant avec bouton d'ajout de cours et devoirs, barre de recherche, notifications et mode toggle
export default function TeacherHeader() {
  return (
    <>
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl justify-between items-center px-4 sm:px-6 lg:px-8">
          <form className="flex items-center gap-2">
            <Input type="text" placeholder="Search..." required />
            <Button type="submit">Search</Button>
          </form>
          {/* buttons */}
          <div className="flex items-center gap-8">
            <DialogAddCourse />
            <DialogAddDevoirs />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" />
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

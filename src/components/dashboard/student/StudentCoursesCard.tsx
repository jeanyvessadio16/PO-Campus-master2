"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface StudentCoursesCardProps {
  count: number;
}

export function StudentCoursesCard({ count }: StudentCoursesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
        <BookOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <CardDescription className="text-xs text-muted-foreground">
          Courses currently active
        </CardDescription>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface TeacherCoursesCardProps {
    count: number;
}

export function TeacherCoursesCard({ count }: TeacherCoursesCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Created</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">
                    Total active courses
                </p>
            </CardContent>
        </Card>
    );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

interface StudentAssignmentsCardProps {
    count: number;
}

export function StudentAssignmentsCard({ count }: StudentAssignmentsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">
                    Due in the next 7 days
                </p>
            </CardContent>
        </Card>
    );
}

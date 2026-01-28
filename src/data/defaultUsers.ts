import { User } from "@/types/user";

export const defaultUsers: User[] = [
  {
    id: "1",
    firstName: "Ahmed",
    lastName: "Diallo",
    email: "ahmed.diallo@campus.sn",
    passwordHash: "$2b$10$abcd1234efgh5678ijkl9012mnopqrst", // hash pour "password123"
    role: "teacher",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    firstName: "Mariam",
    lastName: "Sow",
    email: "mariam.sow@campus.sn",
    passwordHash: "$2b$10$abcd1234efgh5678ijkl9012mnopqrst", // hash pour "password123"
    role: "student",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "3",
    firstName: "Fatou",
    lastName: "Ba",
    email: "fatou.ba@campus.sn",
    passwordHash: "$2b$10$abcd1234efgh5678ijkl9012mnopqrst", // hash pour "password123"
    role: "admin",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

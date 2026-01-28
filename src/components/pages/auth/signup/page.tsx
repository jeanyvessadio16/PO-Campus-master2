"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { User, userScheme } from "@/lib/zodSchema/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const form = useForm<User>({
    resolver: zodResolver(userScheme),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center py-10">
        <Card className="min-w-96 bg-white text-black shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() => {})}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Role selection */}
                {/* Submit button */}
                <Button type="submit" className="w-full bg-black text-white">
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Link
              href="/login"
              className="text-sm text-blue-500 hover:underline"
            >
              Avez-vous un compte? Connectez-vous
            </Link>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}

"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schema";
import { ILogin } from "@/schema/response";
import { useToast } from "@/components/ui/use-toast";
import { authApi } from "@/api-request";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: "pon",
      password: "123456",
    },
  });

  const onSubmit = async (data: ILogin) => {
    setLoading(true);
    try {
      const res = await authApi.login(data);
      await authApi.auth(res);
      router.push("/");
      toast({
        variant: "success",
        title: "Logged in Successfully",
      });
    } catch (error: any) {
      setLoading(false);

      const fields = ["name", "password"];
      fields.forEach((e) => {
        form.setError(e as "name" | "password", {
          type: "server",
          message: "",
        });
      });

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="username" placeholder="user1" />
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
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

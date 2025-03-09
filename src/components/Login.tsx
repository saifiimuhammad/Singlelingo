import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "../db/db";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const FormSchema = z.object(
    isLogin
      ? {
          email: z.string().email("Must be an Email format"),
          password: z.string().min(8, {
            message: "Password must be 8 characters long.",
          }),
        }
      : {
          name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
          }),
          username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
          }),
          email: z.string().email("Must be an Email format"),
          password: z.string().min(8, {
            message: "Password must be 8 characters long.",
          }),
        }
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : { name: "", username: "", email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      if (isLogin) {
        const { data: loginData, error } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });
        if (error) throw error;
        localStorage.setItem("user", JSON.stringify(loginData?.user));
        alert("Login successful");
        window.location.reload();
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name,
              username: data.username,
            },
          },
        });
        if (error) throw error;
        alert("Email verification link sent to your email.");
        setIsLogin(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
        alert(err.message);
      } else {
        console.error("An unknown error occurred");
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-full mt-[80px] grid place-items-center py-8 gap-y-4">
      <h1 className="text-2xl lg:text-5xl font-medium">
        Welcome to Singlelingo.
      </h1>
      <h3 className="text-sm lg:text-xl font-light">
        Unlock your learning journey with us!
      </h3>
      <div className="w-[80%] lg:w-1/3 mt-8">
        <h2 className="text-2xl font-medium text-zinc-600 mb-8">
          {isLogin ? "Login" : "Register"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!isLogin && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-2 mt-4">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button variant="outline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

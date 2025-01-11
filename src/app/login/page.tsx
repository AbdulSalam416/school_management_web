"use client";
import { useState } from "react";
import { supabase } from "../lib/superbase";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
export default function Login() {
  const [data, setdata] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let { data: userData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (userData) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setdata((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="flex flex-col items-center justify-center mt-[5%] gap-2"
      onSubmit={login}
    >
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <Input
          type="text"
          name="email"
          value={data?.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          value={data?.password}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}

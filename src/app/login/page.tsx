"use client";

import { useState } from "react";
import { supabase } from "../lib/superbase";

export default function Login() {
  const [data, setdata] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      let { data: userData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (userData) console.log(userData);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setdata((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex flex-col items-center justify-center mt-[5%]">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={data?.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={data?.password}
          onChange={handleChange}
          className="border-solid border-1"
        />
      </div>

      <button onClick={login}>Login</button>
    </form>
  );
}

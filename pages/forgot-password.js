import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

export default function ForgotPasswordScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect, emailInput } = router.query;
  const [userEmail, setUserEmail] = useState(emailInput);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/profile");
    }
  }, [router, session, redirect]);

  const sendPasswordResetLinkEmail = async (email) => {
    const res = await axios.post("/api/email/sendPasswordResetLink/", {
      email,
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email }) => {
    try {
      const result = await sendPasswordResetLinkEmail(email);
      if (result?.error) {
        toast.error(result.error);
      }
      toast.success(
        `An email with insctructions to reset your password was sent to ${email}`
      );
    } catch (err) {
      toast.error(getError(err));
      console.log("err", err);
    }
  };

  return (
    <Layout title="Forgot Password?">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Forgot your password?</h1>
        <div className="mb-4">
          <label htmlFor="email">Enter your email</label>
          <input
            type="text"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter a valid email address",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
            value={userEmail ? userEmail : ""}
            onChange={(event) => setUserEmail(event.target.value)}
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button">Send Link</button>
        </div>
        <div className="mb-4 ">
          Already have an account? &nbsp;
          <Link href={`/login?redirect=${redirect || "/"}`}>Login</Link>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}

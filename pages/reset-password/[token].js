import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import db from "../../utils/db";

export default function ResetPasswordScreen(props) {
  console.log("props", props);
  //const { data: session } = useSession();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const router = useRouter();
  const { redirect } = router.query;
  const { user } = props || {};
  // useEffect(() => {
  //   if (session?.user) {
  //     router.push(redirect || "/profile");
  //   }
  // }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const submitHandler = async () => {
    try {
      await db.connect();

      const i = new User({ user });
      await i.save().then((updatedUser) => {
        console.log(updatedUser);
      });
      await db.disconnect();

      //const result = await sendPasswordResetSuccessEmail(email);
      if (result.error) {
        toast.error(result.error);
      }
      router.push(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Reset Password">
      {props.error ? (
        <div>{props.error}</div>
      ) : (
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Reset Your Password</h1>
          <div className="mb-4">
            <label htmlFor="email">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
              className="w-full"
              id="password"
              autoFocus
              onChange={(event) => setNewPassword(event.target.value)}
              onBlur={() => {
                if (newPassword !== confirmPassword) {
                  console.log("newPassword", newPassword);
                  setError("confirmpassword", {
                    type: "passwordMatch",
                    message: "Passwords dont match",
                  });
                } else {
                  clearErrors("confirmpassword");
                }
              }}
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmpassword">Confirm New Password</label>
            <input
              type="password"
              {...register("confirmpassword", {
                required: "Please re-enter password",
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
              className="w-full"
              id="confirmpassword"
              autoFocus
              onChange={(event) => setConfirmPassword(event.target.value)}
              onBlur={() => {
                if (newPassword !== confirmPassword) {
                  console.log("newPassword", newPassword);
                  setError("confirmpassword", {
                    type: "passwordMatch",
                    message: "Passwords dont match",
                  });
                } else {
                  clearErrors("confirmpassword");
                }
              }}
            ></input>
            {errors.confirmpassword && (
              <div className="text-red-500 ">
                {errors.confirmpassword.message}
              </div>
            )}
          </div>
          <div className="mb-4 ">
            <button className="primary-button">Reset Password</button>
          </div>
          <div className="mb-4 ">
            Don&apos;t have an account? &nbsp;
            <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
          </div>
        </form>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.params;
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
    const payload =
      JSON.parse(Buffer.from(token?.split(".")[1], "base64").toString()) || "";
    console.log("payload", payload);
    await db.connect();
    const user = await User.findOne({
      email: payload.email,
    });
    //console.log("user", user);
    await db.disconnect();

    return {
      props: {
        user: JSON.stringify(user),
      },
    };
  } catch (err) {
    const error = JSON.stringify(err);
    console.log("err", error);
    return { props: { error: error } };
  }
}

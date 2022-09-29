import Link from "next/link";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import db from "../../utils/db";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import bcryptjs from "bcryptjs";

export default function ResetPasswordScreen(props) {
  const { session } = useSession();
  console.log("props", props);
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .required("Password is mandatory")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const router = useRouter();
  const { redirect } = router.query;
  const { email } = props;

  // useEffect(() => {
  //   if (session?.user) {
  //     //router.push(redirect || "/profile");
  //   }
  // }, [router, session, redirect]);

  const submitHandler = async (data) => {
    try {
      const { password } = data;
      await axios.put("/api/auth/resetpw", {
        email,
        password: bcryptjs.hashSync(password),
      });
      toast.success("Success! You can now login with your new password.");
    } catch (err) {
      console.log(err);
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Reset Password">
      {props?.error ? (
        <div className="container mt-5">
          <div className="alert-error">
            This link has expired! Please request a new one.
          </div>
          <div className="mb-4 ">
            <Link
              href={`/forgot-password?redirect=${redirect || "/"}&emailInput=`}
            >
              Back
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <h1 className="mb-4 text-xl">Reset Your Password</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                className="w-full"
                type="password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "password is more than 5 chars",
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="w-full"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) => value === getValues("password"),
                  minLength: {
                    value: 6,
                    message: "confirm password is more than 5 chars",
                  },
                })}
              />
              {errors.confirmPassword && (
                <div className="text-red-500 ">
                  {errors.confirmPassword.message}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <div className="text-red-500 ">Password do not match</div>
                )}
            </div>
            <div className="mb-4 ">
              <button className="primary-button">Reset Password</button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.params;
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
    const payload = JSON.parse(
      Buffer.from(token?.split(".")[1], "base64").toString()
    );
    const { email } = payload;

    await db.connect();
    const user = await User.findOne({
      email: email,
    });
    await db.disconnect();
    if (user) {
      console.log("user", user);
      return {
        props: {
          email: email,
        },
      };
    }
  } catch (err) {
    //   const error = JSON.stringify(err);
    console.log("err", err);
    //return { props: { error: "Invalid link!" } };
  }
  return { props: { error: "Invalid link!" } };
}

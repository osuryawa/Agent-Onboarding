// LoginForm.tsx
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../componants/button";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-base font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`mt-2 p-3 w-full border rounded-md text-base ${
        error && touched ? "border-red-500" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
    {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const LoginForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      toast.success("Login successful!");
      router.push(`/dashboard?email=${encodeURIComponent(values.email)}`);
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Input
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          <Button text="Sign In" type="submit" />

          <div className="flex justify-between items-center mt-6 text-sm">
            <div>
              <span>New here? </span>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-blue-600 hover:underline"
              >
                Register Now
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.push("/reset-password")}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

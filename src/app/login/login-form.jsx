// LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../componants/button";
import { useAuth } from "../../context/AuthContext";

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
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);

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
      console.log("Attempting login with:", values.email);
      
      // For testing purposes, let's add some sample users
      const sampleUsers = [
        {
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin'
        },
        {
          email: 'supervisor@example.com',
          password: 'super123',
          name: 'Supervisor User',
          role: 'supervisor'
        },
        {
          email: 'agent@example.com',
          password: 'agent123',
          name: 'Agent User',
          role: 'agent'
        }
      ];
      
      // Check if email/password match any of our sample users
      const user = sampleUsers.find(
        user => user.email === values.email && user.password === values.password
      );
      
      if (user) {
        // Use the login function from AuthContext
        const loggedInUser = login(values.email, values.password);
        
        if (loggedInUser) {
          toast.success("Login successful!");
          console.log("Login successful, redirecting to dashboard");
          router.push('/dashboard');
        } else {
          setLoginError("Login failed. Please check your credentials.");
          toast.error("Login failed. Please check your credentials.");
        }
      } else {
        // For demo purposes, allow any login
        console.log("User not found in sample data, but allowing login for demo");
        toast.success("Login successful (demo mode)!");
        
        // Store a demo user in localStorage
        const demoUser = {
          id: 'demo123',
          name: 'Demo User',
          email: values.email,
          role: 'agent'
        };
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        
        router.push('/dashboard');
      }
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

          {loginError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {loginError}
            </div>
          )}

          <div className="mb-2 text-sm text-gray-600">
            <p>For demo purposes, you can use these credentials:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Admin: admin@example.com / admin123</li>
              <li>Supervisor: supervisor@example.com / super123</li>
              <li>Agent: agent@example.com / agent123</li>
            </ul>
          </div>

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

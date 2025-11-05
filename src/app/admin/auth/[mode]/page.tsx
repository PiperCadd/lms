"use client";

import CustomForm from "@/components/common/CustomForm";
import {
  forgotPasswordFormFields,
  loginFormFields,
  resetPasswordFormFields,
} from "@/config/admin";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Mode = "login" | "forgot" | "reset";

const page = () => {
  const router = useRouter();
  const { mode } = useParams<{ mode: Mode }>();

  useEffect(() => {
    const validateMode: Mode[] = ["login", "forgot", "reset"];

    if (!mode || !validateMode.includes(mode as Mode)) {
      router.replace("/admin/auth/login");
    }
  }, [mode, router]);

  return (
    <div className="absolute w-2/3 p-8 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid md:grid-cols-2 gap-8 shadow-2xl bg-[linear-gradient(127.09deg,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)] text-white">
      {mode === "login" && (
        <>
          <div className="">
            <h1 className="mb-12">Logo</h1>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                my: 2,
              }}
            >
              {/* Left Line */}
              <Box
                sx={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "#ccc",
                  marginBottom: "24px",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                Sign In With
              </Typography>
              {/* Right Line */}
              <Box
                sx={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "#ccc",
                  marginBottom: "24px",
                }}
              />
            </Box>
            <CustomForm
              fields={loginFormFields}
              buttonName="Login"
              onSubmit={() => {}}
              externalLink={[
                {
                  text: "Forgot Password?",
                  href: "/admin/auth/forgot",
                  destination: "above",
                },
              ]}
            />
          </div>
          <div className="bg-[linear-gradient(310deg,#7928ca,#ff0080)] rounded-xl text-center">
            Image
          </div>
        </>
      )}
      {mode === "forgot" && (
        <>
          <div className="">
            <h1>Logo</h1>
            <h2 className="text-xl font-bold mb-6">Forgot Password?</h2>
            <CustomForm
              fields={forgotPasswordFormFields}
              buttonName="Send"
              onSubmit={() => {}}
              externalLink={[
                {
                  text: "Back to Login",
                  href: "/admin/auth/login",
                  destination: "below",
                },
              ]}
            />
          </div>
          <div className="bg-[linear-gradient(310deg,#7928ca,#ff0080)] rounded-xl text-center">
            Image
          </div>
        </>
      )}
      {mode === "reset" && (
        <>
          <div className="">
            <h1>Logo</h1>
            <h2 className="text-xl font-bold mb-1">Genrate New Password</h2>
            <p className="text-sm mb-6">
              We received your reset password request. Please enter your new
              password!
            </p>
            <CustomForm
              fields={resetPasswordFormFields}
              buttonName="Change Password"
              onSubmit={() => {}}
              externalLink={[
                {
                  text: "Back to Login",
                  href: "/admin/auth/login",
                  destination: "below",
                },
              ]}
            />
          </div>
          <div className="bg-[linear-gradient(310deg,#7928ca,#ff0080)] rounded-xl text-center">
            Image
          </div>
        </>
      )}
    </div>
  );
};

export default page;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormHandlerProps {
    apiEndpoint: string;
    onSuccess: string;
    onError: string;
}

export function useFormHandler({ apiEndpoint, onSuccess, onError }: FormHandlerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApiSubmit = async (formData: any) => {
    setLoading(true);

    try {
      let body: any;
      let headers: any = {};

      // If the payload contains a File → use FormData
      const containsFile = Object.values(formData).some(
        (v) => v instanceof File || v instanceof Blob
      );

      if (containsFile) {
        body = new FormData();
        Object.entries(formData).forEach(([k, v]) => {
          if (Array.isArray(v)) v.forEach((f) => body.append(k, f));
          else body.append(k, v as any);
        });
      } else {
        body = JSON.stringify(formData);
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        onError?.(data);
        throw new Error(data.message || "Something went wrong");
      }

      // ------------------------------
      // Smart Success Behavior
      // ------------------------------
      if (apiEndpoint === "/admin/login") {
        document.cookie = `token=${data.token}; path=/`;
        router.push("/admin/dashboard");
      }

      if (apiEndpoint === "/admin/reset-password") {
        router.push("/admin/auth/login");
      }

      if (apiEndpoint.includes("update")) {
        // e.g. designation update, profile update
        onSuccess?.(data);
      }

      if (apiEndpoint.includes("upload")) {
        onSuccess?.(data);
      }

      return data;
    } catch (err) {
      console.error("API error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleApiSubmit, loading };
}

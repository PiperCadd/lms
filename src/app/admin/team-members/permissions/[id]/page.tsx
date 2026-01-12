"use client";
import { permissions } from "@/config/admin";
import CustomForm from "@/components/common/CustomForm";

const Page = () => {
  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Assign Permissions</h1>
      <div className="flex justify-between mb-8 bg-(--admin-card-bg) rounded-xl p-10">
        <CustomForm fields={permissions} apiEndpoint="" buttonName="Save Permissions" />
      </div>
    </main>
  );
};

export default Page;

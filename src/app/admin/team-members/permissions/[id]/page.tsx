"use client";
import Table from "@/components/admin/Table";
import SearchBar from "@/ui/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { addDesignationFormFields, permissions } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";
import Actions from "@/ui/Actions";
import Link from "next/link";
import CustomForm from "@/components/common/CustomForm";

const Page = () => {
  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Assign Permissions</h1>
      <div className="flex justify-between mb-8 bg-[var(--admin-card-bg)] rounded-xl p-10">
        <CustomForm fields={permissions} apiEndpoint="" buttonName="Save Permissions" />
      </div>
    </main>
  );
};

export default Page;

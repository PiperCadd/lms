"use client";
import Table from "@/components/admin/Table";
import Button from "@/ui/Button";
import SearchBar from "@/ui/SearchBar";
import { GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@/ui/Dialog";
import { useUIStore } from "@/store/admin/useUIStore";
import { IconButton, Tooltip } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { HomeOutlined } from "@mui/icons-material";
import Image from "next/image";
import { mockCourseCategories, mockTeamMembers } from "@/mockData";

const Page = () => {
  const { setIsDialogOpen } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 100 },
    {
      field: "categoryName",
      headerName: "Name",
      width: 300,
      editable: true,
    },
  ];

  return (
    <main className="text-white p-6">
      <div className="flex items-end gap-2 mb-8">
        <HomeOutlined className="text-[20px]" />
        <span className="text-sm font-medium">Profile</span>
      </div>
      <div
        className="relative w-full h-64 p-5 flex flex-col rounded-2xl 
                [background-image:var(--admin-bgimg)] bg-[var(--admin-card-bg)] mb-6"
      >
        {/* Centered Absolute Image */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/avatar.png"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-2 border-white shadow-md"
          />
        </div>

        {/* Push content to bottom */}
        <ul className="mt-auto font-medium space-y-1">
          <li>Name:</li>
          <li>Email:</li>
          <li>Phone:</li>
        </ul>
      </div>
      <div className="flex gap-6">
        <Table rows={mockCourseCategories} columns={columns} />
        <Table rows={mockCourseCategories} columns={columns} />
      </div>
    </main>
  );
};

export default Page;

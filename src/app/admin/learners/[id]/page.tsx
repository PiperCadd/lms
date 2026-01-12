"use client";
import Table from "@/components/admin/Table";
import { GridColDef } from "@mui/x-data-grid";
import { HomeOutlined } from "@mui/icons-material";
import Image from "next/image";
import {
  mockCourseDetails,
  mockPaymentHistory,
} from "@/mockData";
import ProgressCell from "@/ui/ProgressCell";
import Chip from "@/ui/Chip";
import { Tooltip } from "@mui/material";

const Page = () => {

  const courseDetailsColumns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 80 },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "progress",
      headerName: "Progress",
      flex: 1,
      renderCell: (params) => <ProgressCell value={params.value} />,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];
  const paymentHistoryColumns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 80 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Chip value={params.value} />
        </Tooltip>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <>
      <div className="flex items-end gap-2 mb-8">
        <HomeOutlined className="text-[20px]" />
        <span className="text-sm font-medium">Profile</span>
      </div>
      <div
        className="relative w-full h-64 p-5 flex flex-col rounded-2xl 
                [background-image:var(--admin-bgimg)] bg-(--admin-card-bg) mb-6"
      >
        {/* Centered Absolute Image */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="p-[3px] rounded-full shadow-md [background-image:var(--admin-bg-grad-danger)] ">
            <Image
              src="/avatar.png"
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full bg-white"
            />
          </div>
        </div>

        {/* Push content to bottom */}
        <ul className="mt-auto font-medium space-y-1">
          <li>Name:</li>
          <li>Email:</li>
          <li>Phone:</li>
        </ul>
      </div>
      <div className="flex gap-6">
        <Table
          rows={mockCourseDetails}
          columns={courseDetailsColumns}
          title="Course Details"
        />
        <Table
          rows={mockPaymentHistory}
          columns={paymentHistoryColumns}
          title="Payment History"
        />
      </div>
    </>
  );
};

export default Page;

"use client";
import Table from "@/components/admin/Table";
import { GridColDef } from "@mui/x-data-grid";
import { useUIStore } from "@/store/admin/useUIStore";
import { HomeOutlined } from "@mui/icons-material";
import Image from "next/image";
import { courseDetailsMock } from "@/mockData";
import ProgressCell from "@/ui/ProgressCell";
import { SchoolOutlined } from "@mui/icons-material";
import { VisibilityOutlined, TaskAlt } from "@mui/icons-material";
import CustomForm from "@/components/common/CustomForm";
import Link from "next/link";

const Page = () => {
  const { setIsDialogOpen } = useUIStore();

  const columns: GridColDef[] = [
    { field: "id", headerName: "SL.No", width: 100 },
    {
      field: "lessonName",
      headerName: "Lesson Name",
      flex: 1,
      editable: true,
    },
    {
      field: "progress",
      headerName: "Progress",
      flex: 1,
      editable: true,
      renderCell: (params) => <ProgressCell value={params.value} />,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <>
      <div
        className="relative w-full h-96 p-12 flex flex-col rounded-2xl 
                [background-image:var(--admin-bgimg)] bg-[var(--admin-card-bg)] mb-6"
      >
        <div className="bg-[#1e1e2f] w-full h-full rounded-xl p-6">
          <h1 className="flex gap-3 text-xl items-end pb-2 border-b border-zinc-700">
            <SchoolOutlined />
            <span className="font-bold">Course details</span>
          </h1>
          <div className="mt-5 grid grid-cols-2">
            <div className="space-y-4 font-medium">
              <div>
                <h3 className="text-gray-400">Course Name</h3>
                <span className="text-sm">{courseDetailsMock.courseName}</span>
              </div>
              <div>
                <h3 className="text-gray-400">Status</h3>
                <div className="text-green">
                  <TaskAlt /> <span className="text-sm">Completed</span>
                </div>
              </div>
              <div>
                <h3 className="text-gray-400">Official Certificate Required</h3>
                <span className="text-sm">Yes</span>
              </div>
            </div>
            <div className="space-y-4 font-medium">
              <div>
                <h3 className="text-gray-400">User Name</h3>
                <span className="text-sm">Mr. Slime</span>
              </div>
              <div>
                <h3 className="text-gray-400">Certificate</h3>
                <Link
                  href={courseDetailsMock.certificateLink ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm border px-3.5 py-1 mt-1.5 rounded inline-flex items-center gap-2 hover:bg-zinc-800"
                >
                  <VisibilityOutlined fontSize="small" />
                  <span>View</span>
                </Link>
              </div>
              <div>
                <h3 className="text-gray-400">Upload Certificate</h3>
                <span className="text-sm">File Input</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <Table
          rows={courseDetailsMock.lessons.map((lesson, i) => ({
            id: i + 1,
            lessonName: lesson.lessonName,
            progress: lesson.progress,
            date: lesson.date,
          }))}
          columns={columns}
          title="Activity Log"
        />
      </div>
    </>
  );
};

export default Page;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomForm from "@/components/common/CustomForm";
import { addCourses } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";

const originalData = {
  courseName: "React for Beginners",
  courseDescription:
    "A complete beginner-friendly guide to learning React with hands-on projects.",
  courseImage: null, // normally File; mock leaves it null
  category: "IT & Software",
  subCategory: "Web Development",
  availableLanguage: "en",
  salePrice: 1999,
  offerPrice: 999,
  keyword: "react, javascript, frontend, hooks",
  certificateType: ["own"], // checkbox multiple values
  chapters: [
    {
      title: "Introduction to React",
      description:
        "Overview of React concepts, SPA architecture, prerequisites, installation.",
    },
    {
      title: "JSX & Components",
      description:
        "Understanding JSX, component structure, props, children, reusability.",
    },
    {
      title: "State & Events",
      description: "Handling state, useState, event binding, UI interactions.",
    },
  ],
};

const EditTeamPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    //  Replace with real API later
    const member = mockTeamMembers.find(
      (item) => String(item.id) === String(id)
    );

    if (member) {
      setInitialData(member);
    }
  }, [id]);

  // if (!initialData) {
  //   return <p className="text-white p-6">Loading...</p>;
  // }

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Edit Courses</h1>
      <div className="flex justify-between mb-8 [background-image:var(--admin-bgimg)] bg-(--admin-card-bg)  text-white rounded-xl p-10">
        <CustomForm
          fields={addCourses}
          apiEndpoint={`/api/team/${id}`}
          method="PUT"
          buttonName="Update"
          initialValues={initialData ?? originalData}
        />
      </div>
    </main>
  );
};

export default EditTeamPage;

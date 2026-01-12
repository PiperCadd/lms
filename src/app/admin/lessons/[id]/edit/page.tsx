"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomForm from "@/components/common/CustomForm";
import { addLessons } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";

export const mockAddLessonData = {
  course: "react-fundamentals",
  chapter: "introduction",
  chapters: [
    {
      title: "What is React?",
      description:
        "This lesson explains what React is, why it is used, and how it helps in building user interfaces.",
      videoFile: new File(["dummy video content"], "react-intro.mp4", {
        type: "video/mp4",
      }),
      audioFile: new File(["dummy audio content"], "react-intro.mp3", {
        type: "audio/mpeg",
      }),
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
      <h1 className="text-2xl mb-4">Edit Lessons</h1>

      <div className="flex justify-between mb-8 bg-(--admin-card-bg) rounded-xl p-10">
        <CustomForm
          fields={addLessons}
          apiEndpoint={`/api/team/${id}`}
          method="PUT"
          buttonName="Update"
          initialValues={initialData ?? mockAddLessonData}
        />
      </div>
    </main>
  );
};

export default EditTeamPage;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomForm from "@/components/common/CustomForm";
import { addQuizzes } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";

export const mockQuizzes = {
  courses: "React Fundamentals",
  lessons: "State and Props",
  timeDuration: 30,
  quizTitle: "React Basics Quiz",
  description: "This quiz tests your understanding of React state and props.",

  question: [
    {
      question: "What is the purpose of useState in React?",
      options: [
        { label: "To manage component state", isCorrect: true },
        { label: "To fetch data from an API", isCorrect: false },
        { label: "To create routes", isCorrect: false },
        { label: "To handle side effects", isCorrect: false },
      ],
    },
    {
      question: "Props in React are:",
      options: [
        { label: "Mutable data", isCorrect: false },
        { label: "Read-only data passed to components", isCorrect: true },
        { label: "Used only for styling", isCorrect: false },
        { label: "Same as state", isCorrect: false },
      ],
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
      <h1 className="text-2xl mb-4">Edit Team Member</h1>

      <div className="flex justify-between mb-8 bg-(--admin-card-bg) rounded-xl p-10">
        <CustomForm
          fields={addQuizzes}
          apiEndpoint={`/api/team/${id}`}
          method="PUT"
          buttonName="Update"
          initialValues={initialData ?? mockQuizzes}
        />
      </div>
    </main>
  );
};

export default EditTeamPage;

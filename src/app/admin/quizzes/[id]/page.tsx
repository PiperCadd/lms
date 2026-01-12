"use client";
import ControlledAccordion from "@/ui/Accordion";

const accordionData = [
  {
    id: "panel1",
    title: "Course Details",
    content: "Course form goes here",
    isCorrect: false,
  },
  {
    id: "panel2",
    title: "Instructor Info",
    content: "Instructor details",
        isCorrect: false,
  },
  {
    id: "panel3",
    title: "Settings",
    content: [
        "Answer",
        "Answer",
        "Answer"
    ],
    disabled: false,
  },
];

const Page = () => {


  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">View Quiz</h1>
      <div className="bg-(--admin-card-bg) w-full h-full rounded-xl p-6">
        <div className="space-y-3 pb-6 border-b border-zinc-700 mb-2.5">
          <div className="flex justify-between">
            <div className="flex gap-2 items-end">
              <h3>Course Name</h3>
              <span className="text-gray-400">Architect Course</span>
            </div>
            <div className="flex gap-2 items-end">
              <h3>Lesson</h3>
              <span className="text-gray-400">AutoCAD Basics</span>
            </div>
            <div className="flex gap-2 items-end">
              <h3>Duration</h3>
              <span className="text-gray-400">30 mins</span>
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <h3>Quiz Title</h3>
            <span className="text-gray-400">Introduction Quiz</span>
          </div>
          <div className="flex gap-2 items-end">
            <h3>Description</h3>
            <span className="text-gray-400">Answer all the questions carefully</span>
          </div>
        </div>
        <ControlledAccordion items={accordionData}/>
      </div>
    </main>
  );
};

export default Page;

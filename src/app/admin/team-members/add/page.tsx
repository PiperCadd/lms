"use client";
import { addTeamMembers } from "@/config/admin";
import CustomForm from "@/components/common/CustomForm";

const Page = () => {
  //   const row = apiRef.current.getRow(id);
  //   if (row?.isNew) {
  //     setRows((prev) => prev.filter((r) => r.id !== id));
  //   }
  // };

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Add Team Members</h1>
      <div className="flex justify-between mb-8 [background-image:var(--admin-bgimg)] bg-(--admin-card-bg)  text-white rounded-xl p-10">
        <CustomForm fields={addTeamMembers} apiEndpoint="/" buttonName="Save" />
      </div>
    </main>
  );
};

export default Page;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomForm from "@/components/common/CustomForm";
import { addTeamMembers } from "@/config/admin";
import { mockTeamMembers } from "@/mockData";

const originalData = {
  name: "Jefnish",
  email: "kk@gmail.com",
  phone: "7777777777",
  gender: "Male",
  dob: "2025-12-09",
  joiningDate: "2025-12-23",
  designation: "software_engineer",
  address: "d",
  status: "Active",
  profileImage: {
    name: "Untitled.jpg",
    size: 317087,
    type: "image/jpeg",
    lastModified: 1765862125374,
  },
  profileImageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400"
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

      <div className="flex justify-between mb-8 bg-[var(--admin-card-bg)] rounded-xl p-10">
        <CustomForm
          fields={addTeamMembers}
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

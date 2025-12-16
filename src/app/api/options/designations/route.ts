// app/api/options/designations/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { label: "Software Engineer", value: "software_engineer" },
    { label: "HR Manager", value: "hr_manager" },
    { label: "Team Lead", value: "team_lead" }
  ]);
}

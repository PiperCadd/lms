// app/api/options/categories/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { label: "IT & Software", value: "it_&_software" },
    { label: "Mechanical Engineering", value: "mechanical_engineering" },
    { label: "Business & Management", value: "business_&_management" }
  ]);
}
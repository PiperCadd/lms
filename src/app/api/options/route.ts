import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keys = searchParams.get("keys")?.split(",") ?? [];

  const data: Record<string, string[]> = {};

  if (keys.includes("categories")) {
    data.categories = [
      "IT & Software",
      "Mechanical Engineering",
      "Business & Management",
      "Design"
    ];
  }

  if (keys.includes("designations")) {
    data.designations = [
      "Software Engineer",
      "Senior Developer",
      "Tech Lead",
      "Project Manager",
      "Product Manager",
      "UI/UX Designer",
    ];
  }

  return NextResponse.json(data);
}

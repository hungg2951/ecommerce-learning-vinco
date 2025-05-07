import { NextResponse } from "next/server";
import { mockDatas } from "../mockdata";

export async function GET() {
  return NextResponse.json(mockDatas);
}

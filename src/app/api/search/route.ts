import { NextRequest, NextResponse } from "next/server"
import { mockDatas } from "../mockdata"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  // Tìm kiếm không phân biệt hoa thường
  const results = mockDatas.filter((product) =>
    product.name.toLowerCase().includes(query)
  )

  return NextResponse.json({ results })
}
import { NextResponse } from "next/server";
import { mockDatas } from "../../mockdata";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = mockDatas.find(
      (item: TProduct) => item.id === parseInt(id)
    );
    if (!product) return NextResponse.json({ message: "product not found" });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
  }
}

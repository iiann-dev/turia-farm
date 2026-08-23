import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const type = body?._type;

    // Target specific paths based on updated content type
    if (type === "homePage") {
      revalidatePath("/");
    } else if (type === "seedling") {
      revalidatePath("/");
      revalidatePath("/bibit-pisang");
    } else if (type === "article") {
      revalidatePath("/");
      revalidatePath("/panduan-tani");
    } else if (type === "processStep") {
      revalidatePath("/");
      revalidatePath("/proses-kultur");
    } else {
      // Revalidate all common routes as fallback
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      type: type || "unknown",
      now: Date.now(),
    });
  } catch (err: any) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating", error: err?.message }, { status: 500 });
  }
}
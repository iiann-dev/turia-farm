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
    const pathsToRevalidate: string[] = [];

    if (type === "homePage") {
      pathsToRevalidate.push("/");
    } else if (type === "seedling") {
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/bibit-pisang");
    } else if (type === "article") {
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/panduan-tani");
    } else if (type === "processStep") {
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/proses-kultur");
    } else if (type === "processPage") {
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/proses-kultur");
    } else if (type === "guidePage") {
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/panduan-tani");
    } else if (type === "catalogPage") {
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/bibit-pisang");
    } else if (type === "siteConfig") {
      // Site config affects contact map and global data
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/kontak");
      pathsToRevalidate.push("/bibit-pisang");
    } else {
      // Revalidate all common routes as fallback
      pathsToRevalidate.push("/", "layout");
    }

    // Revalidate all paths
    for (const path of pathsToRevalidate) {
      if (path === "layout") {
        revalidatePath("/", "layout");
      } else {
        revalidatePath(path);
      }
    }

    return NextResponse.json({
      revalidated: true,
      type: type || "unknown",
      paths: pathsToRevalidate,
      now: Date.now(),
    });
  } catch (err: any) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating", error: err?.message }, { status: 500 });
  }
}
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { profileImageSchema } from "@/lib/validations/upload";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    try {
      profileImageSchema.parse(file);
    } catch (err) {
      if (err instanceof ZodError) {
        return NextResponse.json(
          { error: err.issues[0].message },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    const user = await prisma?.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.image) {
      const url = new URL(user.image);
      const path = url.pathname.replace(
        `/storage/v1/object/public/avatars/`,
        ""
      );
      await supabase.storage.from("avatars").remove([path]);
    }

    const cleanFileName = file.name
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_.]/g, "");
    const filePath = `profile-image/${
      session.user.id
    }-${Date.now()}-${cleanFileName}`;

    const { error: UploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (UploadError) {
      console.error(UploadError.message);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    await prisma?.user.update({
      where: { id: session.user.id },
      data: {
        image: publicUrl,
      },
    });

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};

"use client";

import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { profileImageSchema } from "@/lib/validations/upload";
import { useProfilePicStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

const Profile = () => {
  const { data: session } = useSession();
  const profilePic = useProfilePicStore((state) => state.profilePic);
  const setProfilePic = useProfilePicStore((state) => state.setProfilePic);

  const inputUploadRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      profileImageSchema.parse(file);
    } catch (err) {
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message || "Invalid file");
      }
      toast.error("Invalid file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-profile-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setProfilePic(data.url);
    if (res.ok) {
      toast.success("Profile image updated successfully");
    } else {
      toast.error(data.error || "Upload failed");
    }
  };

  if (!session) {
    return (
      <div className="flex bg-black/30 items-center justify-center min-h-screen">
        <div className="mx-auto w-sm rounded-lg bg-white border border-black space-y-8 p-8 ">
          <div className="flex items-center justify-center w-full">
            <Loader2 className="animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-black/30 items-center justify-center min-h-screen">
      <div className="mx-auto w-sm h-[80vh] rounded-lg bg-white border border-black space-y-8 p-8 ">
        <div className="space-y-8">
          <div className="flex w-full gap-8 items-center">
            {profilePic && (
              <Image
                src={encodeURI(profilePic)}
                alt={session.user.name!}
                width={100}
                height={100}
                className="rounded-full border border-black"
                unoptimized
              />
            )}
            <input
              onChange={handleFileChange}
              type="file"
              ref={inputUploadRef}
              className="hidden"
            />
            <Button
              onClick={() => inputUploadRef.current?.click()}
              className="bg-amber-300 cursor-pointer"
            >
              Update Profile Pic
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <SignOutButton />
        </div>
        <pre className="text-sm overflow-clip">
          {JSON.stringify(session.user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Profile;

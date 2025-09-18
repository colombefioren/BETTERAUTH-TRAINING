"use client";

import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { profileImageSchema } from "@/lib/validations/upload";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

const Profile = () => {
  const { data: session, isPending: sessionLoading } = useSession();
  const user = useUserStore((state) => state.user);
  const profilePic = user?.image;
  const setProfilePic = useUserStore((state) => state.setProfilePic);
  const isLoadingProfilePic = useUserStore(
    (state) => state.isLoadingProfilePic
  );
  const setLoadingProfilePic = useUserStore(
    (state) => state.setLoadingProfilePic
  );

  const inputUploadRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      profileImageSchema.parse(file);
    } catch (err) {
      if (err instanceof ZodError) {
        toast.error(err.issues[0]?.message || "Invalid file");
        return;
      }
      toast.error("Invalid file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoadingProfilePic(true);

      const res = await fetch("/api/upload-profile-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setProfilePic(data.url);
      toast.success("Profile image updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload profile image");
    } finally {
      setLoadingProfilePic(false);
    }
  };

  if (sessionLoading || !user) {
    return (
      <div className="flex bg-black/30 items-center justify-center min-h-screen">
        <div className="mx-auto w-sm rounded-lg bg-white border border-black p-8 flex justify-center items-center">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex bg-black/30 items-center justify-center min-h-screen">
        <div className="mx-auto w-sm rounded-lg bg-white border border-black p-8 text-center">
          UNAUTHORIZED
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-black/30 items-center justify-center min-h-screen">
      <div className="mx-auto w-sm h-[80vh] rounded-lg bg-white border border-black p-8 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {profilePic ? (
              <Image
                src={encodeURI(profilePic)}
                alt={user.name || "Profile"}
                width={100}
                height={100}
                className="rounded-full border border-black"
                unoptimized
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full border border-black flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <input
              type="file"
              ref={inputUploadRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button
              onClick={() => inputUploadRef.current?.click()}
              disabled={isLoadingProfilePic}
              className="mt-2 bg-amber-300"
            >
              {isLoadingProfilePic ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Update Profile Pic"
              )}
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

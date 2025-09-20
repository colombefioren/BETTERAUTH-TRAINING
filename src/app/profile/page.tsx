import ProfileInfo from "@/components/profile-info";
import ProfileUpdate from "@/components/profile-update";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex bg-black/30  items-center justify-center gap-20">
      <ProfileInfo />
      <ProfileUpdate/>
    </div>
  );
};
export default Profile;

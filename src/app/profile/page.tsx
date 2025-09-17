import SignOutButton from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex bg-black/30 items-center justify-center min-h-screen">
        <div className="mx-auto w-sm rounded-lg bg-white border border-black space-y-8 p-8 ">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Unauthorized</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-black/30 items-center justify-center min-h-screen">
      <div className="mx-auto w-sm rounded-lg bg-white border border-black space-y-8 p-8 ">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <SignOutButton/>
        </div>
        <pre className="text-sm overflow-clip">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Profile;

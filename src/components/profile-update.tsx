"use client";

import ChangeEmailForm from "./change-email-form";
import ChangePasswordForm from "./change-password-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import UpdateUserForm from "./update-user-form";

const ProfileUpdate = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto  h-[80vh] rounded-lg bg-white border border-black p-8 space-y-6">
        <h1 className="font-bold uppercase">Update Profile</h1>
        <div className="space-y-4">
          <Tabs defaultValue="update-user">
            <TabsList>
              <TabsTrigger
                className="bg-gray-100 cursor-pointer text-black px-4 py-2  hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
                value="update-user"
              >
                Update User
              </TabsTrigger>
              <TabsTrigger
                className="bg-gray-100 cursor-pointer text-black px-4 py-2  hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
                value="change-password"
              >
                Change Password
              </TabsTrigger>
              <TabsTrigger
                className="bg-gray-100 cursor-pointer text-black px-4 py-2  hover:bg-gray-200 data-[state=active]:bg-black data-[state=active]:text-white"
                value="change-email"
              >
                Change Email
              </TabsTrigger>
            </TabsList>
            <TabsContent value="update-user">
              <UpdateUserForm />
            </TabsContent>
            <TabsContent value="change-password">
              <ChangePasswordForm />
            </TabsContent>
            <TabsContent value="change-email">
              <ChangeEmailForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;

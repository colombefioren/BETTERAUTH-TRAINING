"use client";

import { useSession } from "@/lib/auth-client";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

const ProfileInitializer = () => {
  const session = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);
  const setIsLoadingUser = useUserStore((state) => state.setLoadingUser);

  useEffect(() => {
    if (session.data?.user && !isLoadingUser) {
      setIsLoadingUser(true);
      setUser({
        id: session.data.user.id,
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image,
        emailVerified: session.data.user.emailVerified,
      });
      setIsLoadingUser(false);
    }
  }, [session.data?.user, isLoadingUser, setIsLoadingUser, setUser]);

  return null;
};
export default ProfileInitializer;

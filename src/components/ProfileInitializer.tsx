"use client";

import { useSession } from "@/lib/auth-client";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

const ProfileInitializer = () => {
  const session = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoadingUser = useUserStore((state) => state.setLoadingUser);

  useEffect(() => {
    const initUser = async () => {
      if (!session.data?.user) return;

      setIsLoadingUser(true);

      setUser({
        id: session.data.user.id,
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image,
        emailVerified: session.data.user.emailVerified,
        username: session.data.user.username,
        displayUsername: session.data.user.displayUsername,
      });

      setIsLoadingUser(false);
    };

    initUser();
  }, [session.data?.user, setUser, setIsLoadingUser]);

  return null;
};

export default ProfileInitializer;

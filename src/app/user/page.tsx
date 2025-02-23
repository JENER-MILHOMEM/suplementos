"use client";

import { ProfileLoading } from "@/components/profile-loading";
import UserProfile from "@/components/user-profile";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, User as UserType } from "firebase/auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const User = () => {
  
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdTokenResult();
        setIsAdmin(token.claims.role === "admin");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ProfileLoading/>;
  }

  if (user){
    return <UserProfile isAdmin={isAdmin} user={user}/>
  }else{
    return redirect('/')
  }

};

export default User;

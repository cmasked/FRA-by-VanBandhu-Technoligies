import { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await apiFetch("/auth/me"); // backend must return current officer info
        setUserInfo(data);
      } catch (err) {
        console.error("Failed to load user", err);
      }
    }
    loadUser();
  }, []);

  if (!userInfo) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>{userInfo.name}</h1>
      <p>{userInfo.email}</p>
      {/* the rest of your profile UI */}
    </div>
  );
}

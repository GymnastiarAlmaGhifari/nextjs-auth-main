import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

// mendapatkan semua user yang login
export const currentProfile = async () => {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    select: {
      id: true,
    },
  });
  return user;
};

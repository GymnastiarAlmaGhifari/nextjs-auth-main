"use server";

import { db } from "../db";
import { hash } from "bcrypt";
import { UserRegister } from "types/type";
import { revalidatePath } from "next/cache";

// server actions dengan fungsi register
export const register = async ({ email, username, password, pathname }: UserRegister) => {
  try {
    const exisitngUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (exisitngUserByEmail) {
      // jika email sudah terdaftar throw error dari zod
      throw new Error("User with this email already exists");
    }

    const exisitngUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (exisitngUserByUsername) {
      // jika username sudah terdaftar throw error dari zod
      throw new Error("User with this username already exists");
    }

    const hashedPassword = await hash(password, 10);
    const createdUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    if (pathname === "sign-up") {
      revalidatePath(pathname);
    }

    return {
      user: createdUser, // Mengembalikan data pengguna yang telah dibuat
    };

    // jika berhasil register maka akan mereturn data user
  } catch (error: any) {
    return {
      error: true,
      message: `Failed to create user: ${error.message}`,
    };
  }
};

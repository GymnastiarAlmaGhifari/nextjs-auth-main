import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    // if toke is alredy exist
    const token = await getToken({ req, secret: process.env.SECRET });
    if (token) {
      // Signed in
      return NextResponse.rewrite(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: ({ token }) =>
        // jika ada token dan role nya SUPER atau ADMIN atau TENTOR maka akan diizinkan dan akan re
        token?.role === "user" || token?.role === "admin",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    // "/pembayaran",
    // "/siswa",
    // "/kelompok",
    // "/pengguna",
    // "/profile",
    // "/riwayat",
  ],
};

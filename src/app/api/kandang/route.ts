import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { join } from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  const nama_kandang: string = data.get("nama_kandang") as unknown as string;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExtension = file.name.split(".").pop() || "txt";

  // gunakan uuidv4 untuk membuat nama file untuk gambar_kandang
  const id = uuidv4();
  const namaFile = `${nama_kandang}_${id}.${fileExtension}`;

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = join(process.cwd(), "public", "images", "kandang", namaFile);

  try {
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

    const kandang = await db.kandang.create({
      data: {
        nama_kandang,
        gambar_kandang: `/images/kandang/${namaFile}`,
      },
    });

    return NextResponse.json({ kandang, message: "Kandang berhasil dibuat" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan dalam memuat data kandang." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const kandang = await db.kandang.findMany({
    orderBy: {
      id_kandang: "asc",
    },
  });

  return NextResponse.json(kandang);
}

// try {
//   // const session = await getServerSession(authOptions);
//   // if (!session) {
//   //   return new NextResponse("Unauthorized", { status: 401 });
//   // }

//   // Buat kandang data
//   const { nama_kandang, gambar_kandang } = await req.json();

//   const kandang = await db.kandang.create({
//     data: {
//       nama_kandang,
//     },
//   });

//   // const bytes = await gambar_kandang.arrayBuffer();
//   // const buffer = Buffer.from(bytes);

//   // // Simpan path gambar pada file public/images/kandang
//   // const id_kandang = kandang.id_kandang; // Assuming kandang is defined earlier
//   // const fileExtension = gambar_kandang.name.split(".").pop(); // Get the file extension
//   // const namaFile = `${nama_kandang}_${id_kandang}.${fileExtension}`;

//   // const pathToStoreInPublic = join(process.cwd(), "public", "images", "kandang", namaFile);
//   // await writeFile(pathToStoreInPublic, gambar_kandang);

//   // // Simpan path ke database
//   // const pathToStoreInDatabase = `/images/kandang/${namaFile}`;

//   // // Simpan path ke database (sesuai dengan skema database Anda)
//   // await db.kandang.update({
//   //   where: {
//   //     id_kandang: kandang.id_kandang,
//   //   },
//   //   data: {
//   //     gambar_kandang: pathToStoreInDatabase,
//   //   },
//   // });

//   return NextResponse.json({ kandang, message: "Kandang berhasil dibuat" }, { status: 201 });
// } catch (error) {
//   console.error(error);
//   return NextResponse.json({ message: "Terjadi kesalahan dalam memuat data kandang." }, { status: 500 });
// }

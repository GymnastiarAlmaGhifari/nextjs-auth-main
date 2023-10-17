import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "types/socket";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method === "GET") {
    try {
      const sensors = await db.sensor.findMany({
        select: {
          temperature: true,
        },
      });

      // emit data using server.io if available
      res?.socket?.server?.io?.emit("sensor", sensors);

      res.status(200).json(sensors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { temperature, humidity } = req.body;

      const sensors = await db.sensor.create({
        data: {
          temperature,
          humidity,
        },
      });

      // emit data using server.io if available
      res?.socket?.server?.io?.emit("sensor", sensors);

      res.status(200).json(sensors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

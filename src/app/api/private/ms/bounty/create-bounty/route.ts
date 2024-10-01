import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  const cookies = req.headers.get("cookie") || "";
  const response = await fetch("http://localhost:4000/dev/api/bounty/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      cookie: cookies,
    },
  });
  console.log(response);
  const data = await response.json();
  return NextResponse.json(data);
};

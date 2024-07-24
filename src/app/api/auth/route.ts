import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res?.accessToken;

  if (!sessionToken)
    return Response.json({ message: "Token has expired" }, { status: 400 });

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
      },
    }
  );
}

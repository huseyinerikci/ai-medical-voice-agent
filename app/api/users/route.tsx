import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const primaryEmail = user?.emailAddresses?.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!user || !primaryEmail) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }
  console.log(user);

  try {
    const users = await db
      .select()
      .from(usersTable)
      //@ts-ignore
      .where(eq(usersTable.email, primaryEmail));

    if (users?.length == 0) {
      const name =
        user?.fullName ||
        (user?.firstName || user?.lastName
          ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
          : primaryEmail);
      const result = await db
        .insert(usersTable)
        .values({
          //@ts-ignore
          name: name,
          age: 0,
          email: primaryEmail,
          credits: 10,
        })
        //@ts-ignore
        .returning({ usersTable });
      return NextResponse.json(result[0]?.usersTable);
    }
    return NextResponse.json(users[0]);
  } catch (e) {
    return NextResponse.json(
      { error: "An error occurred while creating or fetching the user." },
      { status: 500 }
    );
  }
}

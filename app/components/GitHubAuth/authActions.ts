"use server";

import { signIn } from "next-auth/react";

export async function signInWithGitHub() {
    await signIn("github");
}

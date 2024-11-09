"use client"
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const onSubmit = async values
  return (
    // set a padding
    <div className="font-[family-name:var(--font-geist-sans)] p-4">
      <SignedIn>
        <UserButton afterSwitchSessionUrl="/" />
      </SignedIn>
      <SignedOut>
        <Button onClick={() => router.push("/sign-in")}>Sign-in</Button>
      </SignedOut>
    </div>
  );
}
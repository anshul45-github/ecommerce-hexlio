"use client"
import { Modal } from "@/components/modal";
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
        <Modal onClose={() => {}} open={true} title={"Create store"} description={"Add a new store to manage products and stores"}>
          children
        </Modal>
      </SignedIn>
      <SignedOut>
        <Button onClick={() => router.push("/sign-in")}>Sign-in</Button>
      </SignedOut>
    </div>
  );
}
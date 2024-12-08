"use client"
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  const router = useRouter();
  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4">
      <SignedIn>
        <UserButton afterSwitchSessionUrl="/" />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-row-reverse">
          <Button>
            <SignInButton />
          </Button>
        </div>
      </SignedOut>
    </div>
  );
}
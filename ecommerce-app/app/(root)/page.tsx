"use client"
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
})

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4">
      <SignedIn>
        <UserButton afterSwitchSessionUrl="/" />
        <Modal onClose={() => {}} open={true} title={"Create store"} description={"Add a new store to manage products and stores"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"outline"} className="mr-2">Cancel</Button>
            <Button type="submit">Continue</Button>
          </form>
        </Form>
        </Modal>
      </SignedIn>
      <SignedOut>
        <Button onClick={() => router.push("/sign-in")}>Sign-in</Button>
      </SignedOut>
    </div>
  );
}
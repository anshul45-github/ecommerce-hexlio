import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),
  })

export const StoreModal = () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
      },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        console.log(JSON.stringify(values));
        
        try {
          const response = await fetch('/api/store', {
            method: 'POST',
            body: JSON.stringify(values),
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Network response was not ok: ${errorMessage}`);
          }      
    
          toast.success("Store created successfully");
    
          const data = await response.json();
          console.log(data);
          window.location.assign(`/${data.id}`);
        } catch (error) {
          console.error(error);
          toast.error("Error creating store");
        } finally {
          setLoading(false);
        }
    
    }
    const [loading, setLoading] = useState(false);
    const storeModal = useStoreModal();
    return (
        <Modal onClose={storeModal.onClose} open={storeModal.isOpen} title={"Create store"} description={"Add a new store to manage products and stores"}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="E-commerce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} variant={"outline"} className="mr-2">Cancel</Button>
                <Button disabled={loading} type="submit">Continue</Button>
              </form>
            </Form>
        </Modal>
    );
}
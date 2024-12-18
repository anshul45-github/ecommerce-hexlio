"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/alert-modal";
import ApiAlert from "@/components/api-alert";

interface settingsFormProps {
    initialData: store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

type formValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<settingsFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/store/${params.storeId}`, {
                method: "PATCH",
                body: JSON.stringify(values),
            });
            router.refresh();
            if(!response.ok) {
                toast.error("Failed to update store");
                throw new Error("Failed to update store");
            }
            toast.success("Store updated successfully");
            const data = await response.json();
            console.log("Response data:", data);
        }
        catch (error) {
            console.error("SettingsForm error:", error);
        }
        finally {
            setLoading(false);
        }
    });
    
    const onDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/store/${params.storeId}`, {
                method: "DELETE",
            });
            router.refresh();
            router.push("/");
            if(!response.ok) {
                toast.error("Failed to delete store");
                throw new Error("Failed to delete store");
            }
            toast.success("Store deleted successfully");
            const data = await response.json();
            console.log("Response data:", data);
        }
        catch (error) {
            console.error("SettingsForm error:", error);
        }
        finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => {setOpen(false)}} onConfirm={onDelete} loading={loading} />
            <div className="flex justify-between space-y-4 p-8 bg-white">
                <Heading title="Settings" description="Manage store preferences" />
                <Button onClick={() => {setOpen(true)}} disabled={loading} variant={"default"} size={"sm"}>
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={onSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="name" disabled={loading} placeholder="Store name" />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" loading={loading} disabled={loading}>
                        Save changes
                    </Button>
                </form> 
            </Form>
            <Separator />
            <div className="space-y-4 p-4">
                <ApiAlert title="POST" description={`${origin}/api/store`} variant="admin" />
                <ApiAlert title="PATCH" description={`${origin}/api/store/${params.storeId}`} variant="admin" />
                <ApiAlert title="DELETE" description={`${origin}/api/store/${params.storeId}`} variant="admin" />
            </div>
        </>
    );
}

export default SettingsForm;
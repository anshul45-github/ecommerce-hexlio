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
import ImageUpload from "@/components/image-upload";
import { billboard } from "@/models/model";

interface billboardsFormProps {
    initialData: typeof billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type formValues = z.infer<typeof formSchema>;

const BillboardsForm: React.FC<billboardsFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
        },
    });

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            setLoading(true);

            const route = initialData ? `/api/${params.storeId}/billboards/${params.billboardId}` : `/api/${params.storeId}/billboards`;
            const method = initialData ? "PATCH" : "POST";

            const response = await fetch(route, {
                method: method,
                body: JSON.stringify(values),
            });

            if(!response.ok) {
                toast.error(initialData ? "Failed to update billboard" : "Failed to create billboard");
                throw new Error(initialData ? "Failed to update billboard" : "Failed to create billboard");
            }

            router.push(`/${params.storeId}/billboards`);

            toast.success(initialData ? "Billboard updated successfully" : "Billboard created successfully");
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
            const response = await fetch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
                method: "DELETE",
            });
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            if(!response.ok) {
                toast.error("Failed to delete billboard");
                throw new Error("Failed to delete billboard");
            }
            toast.success("Billboard deleted successfully");
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
                <Heading title={initialData ? "Edit Billboard" : "Create billboard"} description={initialData ? "Edit a billboard" : "Add a new billboard"} />
                {initialData && (
                    <Button onClick={() => {setOpen(true)}} disabled={loading} variant={"default"} size={"sm"}>
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={onSubmit} className="p-8 space-y-8">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload disabled={loading} onChange={(url) => {field.onChange(url); console.log(field)}} onRemove={(url) => {field.onChange("")}} value={field.value ? [field.value]: []} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="label">Label</FormLabel>
                                    <FormControl>
                                        <Input {...field} id="label" disabled={loading} placeholder="Billboard label" />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        Save changes
                    </Button>
                </form> 
            </Form>
        </>
    );
}

export default BillboardsForm;
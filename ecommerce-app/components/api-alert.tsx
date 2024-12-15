import { Copy, Server } from "lucide-react";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "private";
}

export default function ApiAlert({ title, description, variant }: ApiAlertProps) {
    const copyDescription = () => {
        navigator.clipboard.writeText(description);
        toast.success("Copied to clipboard");
    }
    return (
        <Alert>
            <Server className="w-4 h-4 mr-4" />
            <AlertTitle className="flex">
                {title}
                <Badge variant={variant === "public" ? "secondary" : "destructive"} className="ml-2">
                    {variant === "public" ? "Public" : "Private"}
                </Badge>
            </AlertTitle>
            <AlertDescription className="text-sm mt-2 flex items-center justify-between">
                <code className="text-gray-500 bg-muted font-semibold">{description}</code>
                <Button variant="default" size="icon" className="flex items-center justify-center" onClick={copyDescription}>
                    <Copy className="w-4 h-4" />
                </Button>
            </AlertDescription>
        </Alert>
    );
}
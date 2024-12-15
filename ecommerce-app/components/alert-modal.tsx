"use client";

import { Modal } from "@/components/modal";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface alertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<alertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [isMounted, setIsMounted]);

    if(!isMounted)
        return null;

    return (
        <>
            <Modal open={isOpen} onClose={onClose} title="Delete Store" description="Are you sure you want to delete this store? This action cannot be undone.">
                <div className="flex space-x-4 justify-end mt-4">
                    <Button onClick={onClose} variant="outline" disabled={loading}>Cancel</Button>
                    <Button onClick={onConfirm} variant="destructive" disabled={loading}>Delete</Button>
                </div>
            </Modal>
        </>
    )
}
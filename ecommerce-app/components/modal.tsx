"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

interface ModalProps {
    title: string
    description: string
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

export const Modal = ({ title, description, open, onClose, children }: ModalProps) => {
    const onchange = (open: boolean) => {
        if(!open) {
            onClose()
        }
    }
    return (
        <Dialog open={open} onOpenChange={onchange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {description}
              </DialogDescription>
            </DialogHeader>
            <div>
                {children}
            </div>
          </DialogContent>
        </Dialog>
    )
}
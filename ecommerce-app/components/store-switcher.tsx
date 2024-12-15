"use client";

import { PopoverArrow, PopoverTriggerProps } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Store from "@/models/model";
import { Button } from "./ui/button";
import { use, useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Router, StoreIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { cn } from "@/lib/utils";
import store from "@/models/model";
import { redirect, useParams, useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-store-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

export default function storeSwitcher( { className, items=[] }: StoreSwitcherProps ) {
  
  const storeModal = useStoreModal();

  // Store switcher hook
  const [open, setOpen] = useState(false);

  const frameworks = items.map((item) => ({
      label: item.name,
      value: item.id
  }));

  const params = useParams();
  
  const currentStore = frameworks.find((item) => item.value === params.storeId);

  const router = useRouter();
  
  const onStoreSelect = (store: {value: string, label: string}) => {
      setOpen(false);
      console.log(router.pathname)
      router.push(`/${store.value}`);
  }
    
  return (
    <div>
      {/* This will be a store switcher. */}
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={className}>
              <Button variant={"default"}>
                  <StoreIcon className="h-6 w-6" />
                    {currentStore ? currentStore.label : "Select store"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search stores..." />
                <CommandList>
                  <CommandEmpty>No stores found.</CommandEmpty>
                  <CommandGroup heading="stores">
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        className="flex items-center"
                        onSelect={() => {
                          onStoreSelect(framework);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            currentStore?.value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <StoreIcon className="h-4 w-4 mr-2" />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            onSelect={() => {
                              setOpen(false);
                              storeModal.onOpen();
                            }}
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create new store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
        </Popover>
    </div>
  )
}
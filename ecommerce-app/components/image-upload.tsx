"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
    disabled: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
};

const ImageUpload = ({ disabled, onChange, onRemove, value }: ImageUploadProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onUpload = (result : any) => {
        onChange(result.info.secure_url);
    };

    if(!mounted) return null;

    return (
        <div>
            <div className='flex justify-center'>
                {value.map((url) => (
                    <div key={url} className='relative w-40 h-40'>
                        <div className='z-10 absolute top-0 right-0'>
                            <Button type='button' onClick={() => onRemove(url)} variant='default' size={'sm'}>
                                <Trash className='w-4 h-4' />
                            </Button>
                        </div>
                        <Image alt='image' src={url} layout='fill' objectFit='cover' />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset="ecommerce">
                {({ open }) => {
                    return (
                        <Button onClick={() => open()} disabled={disabled} variant='default' type='button'>
                            <ImagePlus />
                            Upload an image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;
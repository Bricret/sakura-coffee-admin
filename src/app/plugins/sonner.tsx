'use client';

import { toast } from "sonner";

export const ErrorToast = ( message : string ) => {
    console.log()
    toast.error(message, {
        position: 'top-right',
    });
}

export const SuccessToast = ( message : string ) => {
    toast.success(message, {
        position: 'top-right'
    });
}


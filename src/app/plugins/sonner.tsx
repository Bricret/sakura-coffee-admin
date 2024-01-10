'use client';

import { toast } from "sonner";

export const ErrorToast = ( message : string, position? : any ) => {
    console.log()
    toast.error(message, {
        position: position || 'top-right',
    });
}

export const SuccessToast = ( message : string, position? : any ) => {
    toast.success(message, {
        position: position || 'top-right',
    });
}


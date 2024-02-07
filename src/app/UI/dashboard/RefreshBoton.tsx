'use client'

import { revalidatePage } from '@/app/lib/actions';
import { RefreshIcon } from '@/app/plugins/Icons';
import { useRouter } from 'next/navigation';

export default function RefreshBoton() {

    const router = useRouter();
    
    async function revalidateAndReloadPage() {
        revalidatePage('/dashboard/caja')
        router.push('/dashboard/caja');
      };

    return (
        <button onClick={revalidateAndReloadPage}>
            <RefreshIcon />
        </button>
    )
}
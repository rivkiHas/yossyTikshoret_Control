'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
export default function IconButton({ text, onConfirm, contactId }) {
  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    onConfirm(contactId);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen} dir='rtl'>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] transition-[width] delay-150 duration-700 ease-in-out hover:w-auto hover:rounded-3xl hover:px-3 hover:flex-row-reverse"
        >
          <span className="hidden group-hover:inline-block text-black text-base font-bold">{text}</span>
          <Trash2 className="w-5 h-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent dir='rtl' style={{ width: '350px' }}>
        <AlertDialogHeader dir='rtl' style={{ direction: 'rtl', textAlign: 'right' }}>
          <AlertDialogTitle className={'text-2xl font-semibold'}>האם למחוק את איש הקשר?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <AlertDialogCancel className="flex px-6 py-3 rounded-full justify-center items-center gap-2 border border-[#F8BD00] bg-white text-black">
            ביטול
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="flex px-6 py-3 justify-center rounded-full items-center gap-2 border border-[#F8BD00] bg-[#F8BD00] text-black ">
            אישור
            <CheckCircleIcon/>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

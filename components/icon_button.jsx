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

export default function IconButton({ text, onConfirm, contactId }) {
  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    onConfirm(contactId); // קריאה למחיקה
    setOpen(false);    // סגירה ידנית
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="group flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] transition-[width] delay-150 duration-700 ease-in-out hover:w-auto hover:rounded-3xl hover:px-3 hover:flex-row-reverse"
        >
          <span className="hidden group-hover:inline-block text-black text-base font-bold">{text}</span>
          <Trash2 className="w-5 h-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>האם למחוק את איש הקשר?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel >
            ביטול
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}>
            אישור
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

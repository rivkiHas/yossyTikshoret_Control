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

export default function IconButton({ text, onConfirm ,contactId}) {
  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    onConfirm(contactId); // קריאה למחיקה
    setOpen(false);    // סגירה ידנית
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-500 hover:w-auto px-3 transition-all duration-300 overflow-hidden">
          <Trash2 className="w-4 h-4" />
          <span className="ml-2 text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {text}
          </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>האם למחוק את איש הקשר?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ביטול</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>אישור</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

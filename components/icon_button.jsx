'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function IconButton({ text, onConfirm, contactId, headerText }) {
  const [open, setOpen] = useState(false)
  const handleConfirm = () => {
    onConfirm(contactId)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen} dir="rtl">
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="group flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#FEF2CC] text-[#F8BD00] transition-all duration-500 ease-in-out hover:w-auto hover:flex-row-reverse hover:rounded-3xl hover:px-3"
        >
          <span className="hidden text-base font-bold text-black opacity-0 transition-opacity delay-[1500ms] duration-300 ease-in-out group-hover:inline-block group-hover:opacity-100">
            {headerText}
          </span>

          <Trash2 className="h-5 w-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent dir="rtl" style={{ direction: 'rtl', textAlign: 'right', width: '350px' }}>
        <AlertDialogHeader dir="rtl" style={{ direction: 'rtl', textAlign: 'right' }}>
          <AlertDialogTitle className={'text-2xl font-semibold'}> {text}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#F8BD00] bg-white px-6 py-3 text-black">
            ביטול
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#F8BD00] bg-[#F8BD00] px-10 py-3 text-black hover:bg-white"
          >
            אישור
            <CheckCircleIcon />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

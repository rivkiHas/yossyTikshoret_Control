import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog as AlertDialogRoot,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'

export function AlertDialogEdit({ open, onConfirm, onCancel, value, onChange }) {
  return (
    <AlertDialogRoot open={open} dir="rtl" className={'font-assistant'}>
      <AlertDialogContent
        className="flex w-[398px] flex-col items-start justify-center gap-4 p-8"
        style={{ direction: 'rtl' }}
      >
        <AlertDialogHeader className="w-full">
          <AlertDialogTitle className="text-right text-[25px] font-semibold text-black">
            כינוי שם לסניף
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-right text-[16px] leading-6 font-normal text-black">
            כדי לשמור על סדר במערכת הקונטרול, איזה שם תרצה לתת לסניף הזה?
          </AlertDialogDescription>
          <div className="mt-2 flex w-full flex-col items-end gap-[5px]">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="הכנס שם לסניף"
              className="w-full"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 w-full">
          <AlertDialogAction
            onClick={onConfirm}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#F8BD00] bg-[#F8BD00] px-10 py-3 text-black hover:bg-white"
          >
            סיימתי, הולך לסניף הבא
            <ArrowLongLeftIcon className="h-5 w-5" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}

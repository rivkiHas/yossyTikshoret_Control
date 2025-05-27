import {
  AlertDialog as AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

export function AlertDialogEdit({ open, onConfirm, onCancel, value, onChange }) {
  return (
    <AlertDialogRoot open={open} dir="rtl" className={'font-assistant'}>
      <AlertDialogContent
        className="flex w-[398px] p-8 flex-col justify-center items-start gap-4"
        style={{ direction: 'rtl' }}
      >
        <AlertDialogHeader className="w-full">
          <AlertDialogTitle
            className="text-right text-black text-[25px] font-semibold"
          >
            כינוי שם לסניף
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-right text-black text-[16px] font-normal leading-6 mt-2"
          >
            כדי לשמור על סדר במערכת הקונטרול, איזה שם תרצה לתת לסניף הזה?
          </AlertDialogDescription>
          <div className="flex flex-col items-end gap-[5px] w-full mt-2">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="הכנס שם לסניף"
              className="w-full"
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full mt-4">
          <AlertDialogAction
            onClick={onConfirm}
            className="flex cursor-pointer px-10 py-3 justify-center items-center gap-2 border border-[#F8BD00] bg-[#F8BD00] text-black rounded-full hover:bg-white"
          >
            סיימתי, הולך לסניף הבא
            <ArrowLongLeftIcon className="w-5 h-5" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}

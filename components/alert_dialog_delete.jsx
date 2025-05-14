import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialog({ updateName }) {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>כינוי שם לסניף</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogDescription>כדי לשמור על סדר במערכת הקונטרול,איזה שם תרצה לתת לסניף הזה?
            
          </AlertDialogDescription>
          
          <AlertDialogCancel>ביטול</AlertDialogCancel>
          <AlertDialogAction onClick={updateName}>אישור</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

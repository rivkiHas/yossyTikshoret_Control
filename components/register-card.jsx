import { cn } from '@/lib/utils'
import { Tabs } from './desktop/tabs'
import Tabs2 from './desktop/tabs2'

export function RegisterCard({ className, ...props }) {
  return (
    <div className={cn('flex space-x-[28px]', className)} {...props}>
      {/* <div className="w-[368px] flex-none rounded-[40px] bg-white"> */}
        
        {/* מוצג רק במסכים קטנים */}
        <div className="block md:hidden">
          <Tabs2 />
        </div>

        {/* מוצג רק במסכים מ-md ומעלה */}
        <div className="hidden md:block">
          <Tabs />
        </div>

      {/* </div> */}
    </div>
  )
}
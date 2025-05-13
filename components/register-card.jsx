
import { cn } from '@/lib/utils'
import { Tabs } from './tabs'


export function RegisterCard({ className, ...props }) {

 
  return (
    <div className={cn('flex space-x-[28px]', className)} {...props}>
      {/* <div className="w-[368px] flex-none rounded-[40px] bg-white" > */}
        <Tabs/>
      {/* </div> */}
    </div>
  )
}

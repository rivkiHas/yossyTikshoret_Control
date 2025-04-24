import { cn } from '@/lib/utils'

export function RegisterCard({ className, ...props }) {
  return (
    <div className={cn('flex min-h-[888px] space-x-[36px]', className)} {...props}>
      <div className="w-[460px] flex-none rounded-[40px] bg-white"></div>

      <div className="w-[1224px] flex-none rounded-[40px] bg-white"></div>
    </div>
  )
}

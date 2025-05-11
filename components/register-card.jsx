
import { cn } from '@/lib/utils'
import StepOne from './step1'
import AddressSearchMap from './address_search_map'
import StepTwo from './step2'
import StepThree from './step3'
import Step from './step'

export function RegisterCard({ className, ...props }) {

 
  return (
    <div className={cn('flex space-x-[28px]', className)} {...props}>
      <div className="w-[368px] flex-none rounded-[40px] bg-white" >
        <Step/>
      </div>
      {/* <div className="w-[980px] flex-none rounded-[40px] bg-white"> 
        <StepThree/>
      </div> */}
    </div>
  )
}

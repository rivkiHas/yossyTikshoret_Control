import {
  BuildingStorefrontIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

const icons = {
  active_step_one: (
    <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#F8BD00] bg-[#FEF8E5] text-[#F8BD00]">
      <BuildingStorefrontIcon className="aspect-square h-[27px] w-[27px] flex-shrink-0" />
    </div>
  ),
  active_step_Two: (
    <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#F8BD00] bg-[#FEF8E5]">
      <UserCircleIcon className="aspect-square h-[27px] w-[27px] flex-shrink-0 text-[#F8BD00]" />
    </div>
  ),
  active_step_Three: (
    <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#F8BD00] bg-[#FEF8E5]">
      <MapPinIcon className="aspect-square h-[27px] w-[27px] flex-shrink-0 text-[#F8BD00]" />
    </div>
  ),
  done: (
    <div className="flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#F8BD00] bg-[#F8BD00]">
      <ExclamationCircleIcon className="aspect-square h-[27px] w-[27px] flex-shrink-0 text-[#FFF]" />
    </div>
  ),
  complete: (
    <div className="flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#F8BD00] bg-[#F8BD00]">
      <CheckCircleIcon className="aspect-square h-[27px] w-[27px] flex-shrink-0 text-white" />
    </div>
  ),
  default: (
    <div className="flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#F8BD00] bg-white"></div>
  ),
}

export default icons

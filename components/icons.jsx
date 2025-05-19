
import { BuildingStorefrontIcon, CheckCircleIcon, ExclamationCircleIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline'


const icons = {
    active_step_one: (
        <div className="flex items-center justify-center w-[42px] h-[42px] flex-shrink-0 rounded-full border-[1.5px] border-[#F8BD00] bg-[#FEF8E5] text-[#F8BD00]">
            <BuildingStorefrontIcon className="w-[27px] h-[27px] flex-shrink-0 aspect-square" />
        </div>
    ),
    active_step_Two: (
        <div className="flex items-center justify-center w-[42px] h-[42px] flex-shrink-0 rounded-full border-[1.5px] border-[#F8BD00] bg-[#FEF8E5]">
            <UserCircleIcon className="w-[27px] h-[27px] flex-shrink-0 aspect-square text-[#F8BD00]" />
        </div>
    ),
    active_step_Three: (
        <div className="flex items-center justify-center w-[42px] h-[42px] flex-shrink-0 rounded-full border-[1.5px] border-[#F8BD00] bg-[#FEF8E5]">
            <MapPinIcon className="w-[27px] h-[27px] flex-shrink-0 aspect-square text-[#F8BD00]" />
        </div>
    ),
    done: (
        <div className="flex items-center justify-center w-[32px] h-[32px] flex-shrink-0 rounded-full border-[1.5px] border-[#F8BD00] bg-[#F8BD00]">
            <ExclamationCircleIcon />
        </div>

    ),
    complete: (
        <div className="flex items-center justify-center w-[32px] h-[32px] flex-shrink-0 rounded-full border-[1.5px] border-[#F8BD00] bg-[#F8BD00]">
            <CheckCircleIcon className="w-[27px] h-[27px] flex-shrink-0 aspect-square text-white" />
        </div>
    ),
    default:
        <div className="flex items-center justify-center w-[32px] h-[32px] flex-shrink-0 rounded-full border-[1.5px] border-[#F8BD00] bg-white">

        </div>


};

export default icons;
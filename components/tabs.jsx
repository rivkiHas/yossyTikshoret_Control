'use client'

import { cn } from '@/lib/utils'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StepOne from './step1'
import StepTwo from './step2'
import StepThree from './step3'
import icons from './icons'
import { Header } from './header'
import { setActiveBrunch } from '@/store/brunch_store'
import { setActiveStep } from '@/store/step_store'
import { isContactStepComplete, isPertipStepComplete, isBrunchStepComplete } from '../store/selectors'

export function Tabs({ className, ...props }) {
    const brunches = useSelector((state) => state.brunch.brunches || [])
    const selectedIndex = useSelector((state) => state.stepper.activeStep)
    const pertipValid = useSelector(isPertipStepComplete)
    const contactValid = useSelector(isContactStepComplete)
    const brunchValid = useSelector(isBrunchStepComplete)

    const dispatch = useDispatch()

    const totalTabs = 2 + brunches.length

    const renderStepIcon = (index, selected) => {
        if (selected) {
            if (index === 0) return icons.active_step_one
            if (index === 1) return icons.active_step_Two
            if (index === totalTabs - 1) return icons.active_step_Three
        }

        if (index === 0) {
            if (selectedIndex > 0 && pertipValid) return icons.done
            if (selectedIndex > 0 && !pertipValid) return icons.complete
        }

        if (index > 0 && index < totalTabs - 1) {
            if (selectedIndex > index) return icons.complete
        }

        if (index === totalTabs - 1) {
            if (selectedIndex > index && contactValid) return icons.complete
        }

        return icons.default
    }

    return (
        <TabGroup
            selectedIndex={selectedIndex}
            onChange={(index) => dispatch(setActiveStep(index))}
            vertical
        >
            <div className={cn('flex space-x-[36px]', className)} {...props}>
                <div className="w-[368px] flex-none rounded-[40px] bg-white p-8">
                    <div className="w-[280px] pr-5">
                        <Header />
                    </div>
                    <div className="ps-12">
                        <div className="relative border-s-2 border-amber-300">
                            <TabList className="flex translate-x-10.5 flex-col space-y-9">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={cn(
                                                'transition-all duration-300 text-start ps-6 pe-5 py-4 w-full flex flex-row items-center gap-5 rounded-[16px]',
                                                selected && 'bg-[#FDEBB2]'
                                            )}
                                        >
                                            <div>{renderStepIcon(0, selected)}</div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-[22px] font-bold leading-snug">שלב ראשון</div>
                                                <div className="text-[16px] font-normal leading-snug">פרטים על העסק</div>
                                            </div>
                                        </button>
                                    )}
                                </Tab>

                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={cn(
                                                'transition-all duration-300 text-start ps-6 pe-5 py-4 w-full flex flex-row items-center gap-5 rounded-[16px]',
                                                selected && 'bg-[#FDEBB2]'
                                            )}
                                        >
                                            <div>{renderStepIcon(1, selected)}</div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-[22px] font-bold leading-snug">שלב שני</div>
                                                <div className="text-[16px] font-normal leading-snug">כתובת ושעות נוספות</div>
                                            </div>
                                        </button>
                                    )}
                                </Tab>

                                {brunches.slice(1).map((brunch, idx) => (
                                    <Tab as={Fragment} key={brunch.id}>
                                        {({ selected }) => (
                                            <button
                                                className={cn(
                                                    'transition-all duration-300 text-start ps-8 pe-2 py-4 w-full flex flex-row items-center gap-5 rounded-[16px]',
                                                    selected && 'bg-[#FDEBB2]'
                                                )}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none">
                                                        <circle cx="7.265" cy="6.99" r="6.772" fill="#F8BD00" />
                                                    </svg>
                                                    <span className="text-[16px] font-normal leading-snug">
                                                        {brunch.name || 'סניף'}
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Tab>
                                ))}

                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={cn(
                                                'transition-all duration-300 text-start ps-6 pe-5 py-4 w-full flex flex-row items-center gap-5 rounded-[16px]',
                                                selected && 'bg-[#FDEBB2]'
                                            )}
                                        >
                                            <div>{renderStepIcon(totalTabs - 1, selected)}</div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-[22px] font-bold leading-snug">שלב שלישי</div>
                                                <div className="text-[16px] font-normal leading-snug">פרטי איש קשר</div>
                                            </div>
                                        </button>
                                    )}
                                </Tab>
                            </TabList>
                        </div>
                    </div>
                </div>

                <div className="w-[980px] flex-none rounded-[40px] bg-white overflow-hidden">
                    <TabPanels>
                        <TabPanel className="transition-transform duration-500 ease-in-out transform p-3">
                            <StepOne />
                        </TabPanel>
                        <TabPanel className="transition-transform duration-500 ease-in-out transform p-3">
                            <StepTwo brunch={brunches[0]} />
                        </TabPanel>
                        {brunches.slice(1).map((brunch) => (
                            <TabPanel
                                key={brunch.id}
                                className="transition-transform duration-500 ease-in-out transform p-3"
                                onClick={() => dispatch(setActiveBrunch(brunch))}
                            >
                                <StepTwo brunch={brunch} />
                            </TabPanel>
                        ))}
                        <TabPanel className="transition-transform duration-500 ease-in-out transform p-3">
                            <StepThree />
                        </TabPanel>
                    </TabPanels>
                </div>
            </div>
        </TabGroup>
    )
}

'use client'

import { cn } from '@/lib/utils'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Fragment } from 'react'
import StepOne from './step1'
import StepTwo from './step2'
import StepThree from './step3'
import { useSelector } from 'react-redux'
import icons from './icons'
import { useState } from 'react'
import { Header } from './header'

export function Tabs({ className, ...props }) {

    const brunches = useSelector((state) => state.brunch.brunches || [])
    const [selectedIndex, setSelectedIndex] = useState(() => brunches.length > 1 ? 1 : 0)
    const step=useSelector((state)=>state.step)
    return (
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
            <div className={cn('flex space-x-[36px]', className)} {...props}>
                <div className="w-[368px] flex-none rounded-[40px] bg-white p-8 ">
                    <Header />
                    <div className='ps-12 '>
                        <div className="relative border-s-2 border-amber-300">
                            <TabList className="flex translate-x-10 flex-col space-y-9">
                                <Tab as={Fragment}>
                                    {({ hover, selected }) => (
                                        <button className={cn(
                                            'text-start ps-6 pe-5 py-4 w-full',
                                            'flex flex-row items-center gap-5',
                                            'rounded-[16px]',
                                            selected && 'bg-[#FDEBB2]'
                                        )}
                                        >
                                            <div>
                                                {selected
                                                    ? icons.active_step_one
                                                    : selectedIndex > 0
                                                        ? icons.complete
                                                        : icons.default}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-[22px] font-bold leading-snug">שלב ראשון</div>
                                                <div className="text-[16px] font-normal leading-snug">פרטים על העסק</div>
                                            </div>
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment} disabled={brunches.length > 1}>
                                    {({ hover, selected }) => (
                                        <button className={cn(
                                            'text-start ps-6 pe-5 py-4 w-full',
                                            'flex flex-row items-center gap-5',
                                            'rounded-[16px]',
                                            selected && 'bg-[#FDEBB2]'
                                        )}
                                        >
                                            <div>
                                                {selected
                                                    ? icons.active_step_Two
                                                    : selectedIndex > 1
                                                        ? icons.complete
                                                        : icons.default}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-[22px] font-bold leading-snug">שלב שני</div>
                                                <div className="text-[16px] font-normal leading-snug"> כתובת ושעות נוספות </div>
                                            </div>
                                        </button>
                                    )}
                                </Tab>
                                {brunches.slice(1).map((brunch) => (
                                    <Tab as="div" key={brunch.id}>
                                        {({ selected }) => (
                                            <button
                                                className={cn(
                                                    'text-start ps-8 pe-2 py-4 w-full',
                                                    'flex flex-row items-center gap-5',
                                                    'rounded-[16px]',
                                                    selected && 'bg-[#FDEBB2]'
                                                )}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                                        <circle cx="7.26514" cy="6.98962" r="6.77185" fill="#F8BD00" />
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
                                    {({ hover, selected }) => (
                                        <button className={cn(
                                            'text-start ps-6 pe-5 py-4 w-full',
                                            'flex flex-row items-center gap-5',
                                            'rounded-[16px]',
                                            selected && 'bg-[#FDEBB2]'
                                        )}
                                        >
                                            <div>
                                                {selected
                                                    ? icons.active_step_Three
                                                    : selectedIndex > brunches.length+2
                                                        ? icons.complete
                                                        : icons.default}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-[22px] font-bold leading-snug">שלב שלישי</div>
                                                <div className="text-[16px] font-normal leading-snug">פרטי איש קשר </div>
                                            </div>
                                        </button>
                                    )}
                                </Tab>
                            </TabList>
                        </div>
                    </div>
                </div>
                <div className="w-[980px] flex-none rounded-[40px] bg-white">
                    <TabPanels>
                        <TabPanel key="1" className="rounded-xl bg-white/5 p-3">
                            <StepOne />
                        </TabPanel>

                        <TabPanel key="2" className="rounded-xl bg-white/5 p-3">
                            <StepTwo brunch={brunches[0]} />
                        </TabPanel>

                        {brunches.slice(1).map((brunch) => (
                            <TabPanel key={brunch.id} className="rounded-xl bg-white/5 p-3">
                                <StepTwo brunch={brunch} />
                            </TabPanel>
                        ))}

                        <TabPanel key="3" className="rounded-xl bg-white/5 p-3">
                            <StepThree />
                        </TabPanel>
                    </TabPanels>

                </div>
            </div>
        </TabGroup>
    )
}
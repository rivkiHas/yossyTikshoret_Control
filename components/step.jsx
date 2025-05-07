'use client'

import { cn } from '@/lib/utils'
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import StepOne from './step1'
import StepTwo from './step2'
import StepThree from './step3'

const icons = {
  default: `
    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
      <circle cx="21.5" cy="21" r="20" fill="#F4F4F4" stroke="#D0D0D0" stroke-width="1.5"/>
    </svg>
  `,
  active: `
    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
      <circle cx="21.5" cy="21" r="20" fill="#FEF8E5" stroke="#F8BD00" stroke-width="1.5"/>
    </svg>
  `,
  completed: `
    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none">
      <circle cx="21.5" cy="21" r="20" fill="#DCF4E2" stroke="#00A36C" stroke-width="1.5"/>
      <path d="M15 21.5L19.5 26L28.5 17" stroke="#00A36C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
}


export default function Step({ className, ...props }) {
  const brunches = useSelector((state) => state.brunch.brunches || [])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleTabClick = (index) => {
    if (index === 1 && brunches.length > 1) return
    setSelectedIndex(index)
  }

  const allTabs = [
    { title: 'שלב ראשון', subtitle: 'פרטים על העסק' },
    { title: 'שלב שני', subtitle: 'כתובת ושעות פתיחה' },
    ...brunches.length > 1 ? brunches.slice(1).map(b => ({ title: b.name, subtitle: 'סניף נוסף' })) : [],
    { title: 'שלב שלישי', subtitle: 'פרטי איש קשר' },
  ]

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} vertical>
      <div className={cn('flex min-h-[888px] space-x-[36px]', className)} {...props}>
        <div className="w-[360px] flex-none rounded-[40px] bg-white p-10 ps-20">
          <div className="relative border-s-2 border-amber-300">
            <TabList className="flex translate-x-6 flex-col space-y-10">
              {allTabs.map((tab, index) => {
                const isCompleted = index < selectedIndex
                const isActive = index === selectedIndex
                const icon = isActive
                  ? icons.active
                  : isCompleted
                    ? icons.completed
                    : icons.default

                return (
                  <Tab key={index} as={Fragment}>
                    {({ selected }) => (
                      <button onClick={() => handleTabClick(index)}>
                        <StepTab
                          selected={selected}
                          icon={icon}
                          title={tab.title}
                          subtitle={tab.subtitle}
                        />
                      </button>
                    )}
                  </Tab>
                )
              })}
            </TabList>
          </div>
        </div>

        <div className="w-[980px] flex-none rounded-[40px] bg-white">
          <TabPanels>
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <StepOne />
            </TabPanel>

            <TabPanel className="rounded-xl bg-white/5 p-3">
              <StepTwo brunch={brunches[0]} />
            </TabPanel>

            {brunches.length > 1 &&
              brunches.slice(1).map((brunch) => (
                <TabPanel key={brunch.id} className="rounded-xl bg-white/5 p-3">
                  <StepTwo brunch={brunch} />
                </TabPanel>
              ))}

            <TabPanel className="rounded-xl bg-white/5 p-3">
              <StepThree />
            </TabPanel>
          </TabPanels>
        </div>
      </div>
    </TabGroup>
  )
}

const StepTab = ({ title, subtitle, icon, selected }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 pe-6',
        'w-[291.232px] h-[72px] flex-shrink-0 rounded-[16px] text-end',
        selected ? 'bg-[#FDEBB2]' : ''
      )}
    >
      <div
        className="flex justify-center items-center w-[42px] h-[42px] flex-shrink-0"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <div className="text-right">
        <div className="text-[#000] text-[25px] font-semibold leading-none">{title}</div>
        <div className="text-[#4C585B] text-[16px] leading-[24px] font-normal">{subtitle}</div>
      </div>
    </div>
  )
}

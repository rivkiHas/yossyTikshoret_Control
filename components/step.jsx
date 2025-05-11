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
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setActiveStep } from '../store/step_store'
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
  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
  <circle cx="16.4009" cy="16.9897" r="14.81" fill="#F8BD00" stroke="#F8BD00" stroke-width="2.37993"/>
  <path d="M10.2799 13.7699L12.6206 16.1105L16.5217 10.649M22.7635 12.9896C22.7635 14.2192 22.5213 15.4367 22.0508 16.5726C21.5803 17.7085 20.8906 18.7407 20.0212 19.6101C19.1518 20.4795 18.1197 21.1691 16.9837 21.6396C15.8478 22.1102 14.6303 22.3523 13.4008 22.3523C12.1713 22.3523 10.9538 22.1102 9.81783 21.6396C8.6819 21.1691 7.64976 20.4795 6.78036 19.6101C5.91095 18.7407 5.2213 17.7085 4.75078 16.5726C4.28026 15.4367 4.03809 14.2192 4.03809 12.9896C4.03809 10.5065 5.02451 8.12507 6.78036 6.36922C8.5362 4.61338 10.9176 3.62695 13.4008 3.62695C15.8839 3.62695 18.2654 4.61338 20.0212 6.36922C21.777 8.12507 22.7635 10.5065 22.7635 12.9896Z" stroke="white" stroke-width="1.11233" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `,
  brunch: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
  <circle cx="7.26746" cy="7.49991" r="6.77185" fill="#F8BD00"/>
 </svg>`
}




export default function Step({ className, ...props }) {
  const brunches = useSelector((state) => state.brunch.brunches || [])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeStep = useSelector(state => state.stepper.active);
  const dispatch = useDispatch();

  const handleTabClick = (index) => {
    if (index === 1 && brunches.length > 1) return;
    dispatch(setActiveStep(index));
    setSelectedIndex(index);
  };

  const allTabs = [
    { title: 'שלב ראשון', subtitle: 'פרטים על העסק' },
    { title: 'שלב שני', subtitle: 'כתובת ושעות פתיחה' },
    ...brunches.length > 1
      ? brunches.slice(1).map(b => ({
        subtitle: b.name || 'סניף ללא שם',
      }))
      : [],

    { title: 'שלב שלישי', subtitle: 'פרטי איש קשר' },
  ]
  useEffect(() => {
    setSelectedIndex(activeStep);
  }, [activeStep]);

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={(index) => {
      if (index === 1 && brunches.length > 1) return;
      dispatch(setActiveStep(index)); // עדכון ב־Redux
      setSelectedIndex(index); // עדכון מקומי
    }}
      vertical
    >
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

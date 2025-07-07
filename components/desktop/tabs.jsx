'use client'

import { cn } from '@/lib/utils'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StepOne from './step1'
import StepTwo from './step2'
import StepThree from './step3'
import icons from '../icons'
import { Header } from '../header'
import { setActiveBrunch } from '@/store/brunch_store'
import { setActiveStep } from '@/store/step_store'
import { isContactStepComplete, isPertipStepComplete, isBrunchStepComplete } from '@/store/selectors'
import { useFormikContext } from 'formik';

export function Tabs({ className, ...props }) {
    const brunches = useSelector((state) => state.brunch.brunches || [])
    const activeStep = useSelector((state) => state.stepper.activeStep)
    const pertipValid = useSelector(isPertipStepComplete)
    const contactValid = useSelector(isContactStepComplete)
    const brunchValid = useSelector(isBrunchStepComplete)
    const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer)
    const formik = useFormikContext();

    const dispatch = useDispatch()

    const generateSteps = () => {
        const steps = [
            { id: 'step1', type: 'main', title: 'שלב ראשון', subtitle: 'פרטים על העסק' },
            { id: 'step2', type: 'main', title: 'שלב שני', subtitle: 'כתובת ושעות נוספות', disabled: typeMarketer === "חנות" && brunches.length > 1 }
        ];

        if (typeMarketer === "חנות" && brunches.length > 1) {
            brunches.forEach(brunch => {
                steps.push({
                    id: brunch.id,
                    type: 'branch',
                    title: ' סניף ' + (brunch.name || 'סניף'),
                    brunchData: brunch
                });
            });
        }

        steps.push({ id: 'step3', type: 'main', title: 'שלב שלישי', subtitle: 'פרטי איש קשר' });

        return steps;
    }

    const steps = generateSteps();

    const handleTabChange = (index) => {

        const selectedStep = steps[index];

        if (selectedStep.type === 'branch') {
            dispatch(setActiveBrunch(selectedStep.id));
        }

        dispatch(setActiveStep(index));
    }
    const renderStepIcon = (step, index, selected) => {
        if (step.type === 'branch') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <circle cx="7.26514" cy="6.98962" r="6.77185" fill="#F8BD00" />
                </svg>
            );
        }

        if (selected) {
            if (step.id === 'step1') return icons.active_step_one;
            if (step.id === 'step2') return icons.active_step_Two;
            if (step.id === 'step3') return icons.active_step_Three;
        }
        else {
            const stepNumber = parseInt(step.id.replace('step', ''));
            const currentActiveStep = activeStep + 1;

            if (stepNumber < currentActiveStep) {
                if (step.id === 'step1') {
                    return pertipValid ? icons.complete : icons.done;
                }
                if (step.id === 'step2') {
                    return contactValid ? icons.complete : icons.done;
                }
                if (step.id === 'step3') {
                    return brunchValid ? icons.complete : icons.done;
                }
            }
            else if (stepNumber > currentActiveStep) {
                return icons.default;
            }
        }

        return icons.default;
    }

    const getTabClass = (step, selected) => {
        if (step.type === 'branch') {
            return cn(
                'text-start ps-8 pe-5 py-4 w-full flex flex-row items-center gap-5 rounded-[16px]',
                selected && 'bg-[#FDEBB2] border-[#FDEBB2]'
            );
        }

        const baseClass = 'text-start ps-6 pe-5 py-4 w-full flex flex-row items-center gap-5 rounded-[16px]';
        const selectedClass = selected ? 'bg-[#FDEBB2] ps-5 [#FDEBB2]' : '';
        const disabledClass = step.id === 'step2' && typeMarketer === "חנות" && brunches.length > 1
            ? ' cursor-not-allowed bg-[#FEF8E5] ps-5'
            : 'cursor-pointer';

        return cn(baseClass, selectedClass, disabledClass);
    }

    const renderPanelContent = (step) => {
        if (step.id === 'step1') {
            return <StepOne />;
        }

        if (step.id === 'step2') {
            return <StepTwo brunch={{}}  />;
        }

        if (step.id === 'step3') {
            return <StepThree  />;
        }

        if (step.type === 'branch') {
            return <StepTwo brunch={step.brunchData} />;
        }

        return null;
    }

    return (
        <TabGroup
            selectedIndex={activeStep}
            onChange={handleTabChange}
            vertical
        >
            <div className={cn('flex space-x-[36px]', className)} {...props}>
                <div className="w-[368px] flex-none rounded-[40px] bg-white lg:p-6">
                    <div className="w-[280px] pr-10">
                        <Header />
                    </div>
                    <div className="ps-12">
                        <div className="relative border-s-2 border-amber-300">
                            <TabList className="flex translate-x-10.5 flex-col space-y-9 ">
                                {steps.map((step, index) => (
                                    <Tab
                                        key={`${step.id}-${index}`}
                                        as={Fragment}
                                        disabled={step.id === 'step2' && typeMarketer === "חנות" && brunches.length > 1}
                                    >
                                        {({ selected }) => (
                                            <button className={getTabClass(step, selected)}>
                                                <div>{renderStepIcon(step, index, selected)}</div>
                                                <div className="flex flex-col justify-center cursor-pointer">
                                                    {step.type === 'branch' ? (
                                                        <span className="text-[16px] font-normal leading-snug">
                                                            {step.title}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <div className="text-[22px] font-bold leading-snug">{step.title}</div>
                                                            <div className="text-[16px] font-normal leading-snug">{step.subtitle}</div>
                                                        </>
                                                    )}
                                                </div>
                                            </button>
                                        )}
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                    </div>
                </div>

                <div className="w-[980px] flex-none rounded-[40px] bg-white">
                    <TabPanels>
                        {steps.map((step, index) => (
                            <TabPanel key={`panel-${step.id}-${index}`} className="rounded-xl bg-white/5 p-3">
                                {renderPanelContent(step)}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </div>
            </div>
        </TabGroup>
    )
}
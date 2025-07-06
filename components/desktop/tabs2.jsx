import React, { useState, useEffect, useRef } from 'react';
import StepOne from './step1';
import StepTwo from './step2';
import StepThree from './step3';
import { BuildingStorefrontIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from "framer-motion";
import { useFormikContext } from 'formik';
import { validateBrunch, validatePertip, validateContact } from '@/store/validation';


const stepsData = [
  {
    id: 1,
    title: 'שלב ראשון',
    subtitle: 'פרטים על העסק',
    icon: BuildingStorefrontIcon,
    targetId: 'step-one',
    statusIcon: validatePertip ? '!' : '✓',
  },
  {
    id: 2,
    title: 'שלב שני',
    subtitle: 'כתובת ושעות העסק',
    icon: MapPinIcon,
    targetId: 'step-two',
    statusIcon: validateBrunch ? '!' : '✓',
  },
  {
    id: 3,
    title: 'שלב שלישי',
    subtitle: 'פרטי איש קשר',
    icon: UserCircleIcon,
    targetId: 'step-three',
    statusIcon: validateContact ? '!' : '✓',
  },
];

export function Tabs2() {
  const [activeStep, setActiveStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const sectionRefs = useRef([]);
  const [openedStep, setOpenedStep] = useState(null);
    const formik = useFormikContext();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepId = parseInt(entry.target.dataset.stepId, 10);
          setActiveStep(stepId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const refs = sectionRefs.current;
    refs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    if (activeStep === 3) {
      setIsCompleted(true);
    }
  }, [activeStep]);

  const handleStepClick = (step) => {
    setActiveStep(step.id);
    setOpenedStep(step.id === openedStep ? null : step.id);
    if (isCompleted) {
      setIsCompleted(false);
    }
    document.getElementById(step.targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitForm = () => {
    alert("הטופס נשלח!");
  };

  return (
    <div>
      <div className="flex justify-center -mb-4">
      </div>
      <div id="step-one" ref={el => sectionRefs.current[0] = el} data-step-id="1"><StepOne /></div>
      <div id="step-two" ref={el => sectionRefs.current[1] = el} data-step-id="2"><StepTwo /></div>
      <div id="step-three" ref={el => sectionRefs.current[2] = el} data-step-id="3">
        <StepThree /> 
      </div>

      <div className="fixed bottom-6 left-6 right-6 flex">
        {isCompleted ? (
          <div className="flex w-full bg-yellow-400 rounded-[40px] mx-auto p-3 shadow-lg justify-between items-center" dir="rtl">
            <div className="flex items-center">
              {stepsData.map(step => {
                const Icon = step.icon;
                return (
                  <button key={step.id} onClick={() => handleStepClick(step)} className="relative mx-1 cursor-pointer bg-white rounded-full w-[55px] h-[55px] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-black" />
                    {step.statusIcon && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-7 h-7 flex items-center justify-center border-2 border-yellow-400 font-bold">
                        {step.statusIcon}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <button onClick={submitForm} className="bg-white text-black rounded-full flex items-center justify-center px-6 py-2 mr-1 font-bold">
              <span>שלח</span>
              <span className="text-lg ml-2">←</span>
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center w-full bg-yellow-400 justify-between rounded-[40px] mx-auto p-3 shadow-lg'>
            <div className="flex justify-between items-center w-full ">
              {stepsData.map(step => {
                const Icon = step.icon;
                return (
                  <div key={step.id}>
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step)}
                      className="flex items-center justify-center transition-all duration-300 ease-in-out"
                    >
                      {activeStep === step.id ? (
                        <div className="flex items-center gap-2">
                          <div className="bg-black rounded-full w-[70px] h-[70px] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-right text-black px-4">
                            <div className="text-base font-bold">{step.title}</div>
                            <div className="text-sm">{step.subtitle}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-full w-[55px] h-[55px] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-8 h-8 text-black" />
                        </div>
                      )}
                    </button>

                  </div>
                );
              })}
            </div>
            {openedStep && (
              <p className="text-black text-sm font-medium leading-relaxed w-5/6 bg-yellow-400 p-3">
                להצטרפות כמשווק רשמי בחברת 'יוסי תקשורת', יש למלא את פרטי העסק שלך.
                המידע יסייע לנו להעניק לך את הכלים והמשאבים להצלחה מירבית.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import StepOne from './step1';
import StepTwo from './step2';
import StepThree from './step3';
import { BuildingStorefrontIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const stepsData = [
  {
    id: 1,
    title: 'שלב ראשון',
    subtitle: 'פרטים על העסק',
    icon: BuildingStorefrontIcon,
    targetId: 'step-one',
    statusIcon: '✓',
  },
  {
    id: 2,
    title: 'שלב שני',
    subtitle: 'כתובת ושעות העסק',
    icon: MapPinIcon,
    targetId: 'step-two',
    statusIcon: '!',
  },
  {
    id: 3,
    title: 'שלב שלישי',
    subtitle: 'פרטי איש קשר',
    icon: UserCircleIcon,
    targetId: 'step-three',
    statusIcon: '3',
  },
];

const Tabs2 = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isCompleted) {
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
  }, [isCompleted]);

  const handleStepClick = (step) => {
    setActiveStep(step.id);
    if (isCompleted) {
      setIsCompleted(false);
    }
    document.getElementById(step.targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitForm = () => {
    alert("הטופס נשלח!");
  };

  const completeProcess = () => {
    setIsCompleted(true);
  };

  return (
    <div>
      <div id="step-one" ref={el => sectionRefs.current[0] = el} data-step-id="1"><StepOne /></div>
      <div id="step-two" ref={el => sectionRefs.current[1] = el} data-step-id="2"><StepTwo /></div>
      <div id="step-three" ref={el => sectionRefs.current[2] = el} data-step-id="3">
        <StepThree onComplete={completeProcess} />
      </div>

      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
        {isCompleted ? (
          <div className="flex items-center justify-between bg-yellow-400 rounded-full mx-auto w-[345px] py-2 px-[22px] shadow-lg">
            <div className="flex items-center">
              {stepsData.map(step => {
                const Icon = step.icon;
                return (
                  <button key={step.id} onClick={() => handleStepClick(step)} className="relative bg-white rounded-full w-[43px] h-[43px] flex items-center justify-center mx-1 cursor-pointer">
                    <Icon className="w-5 h-5 text-black" />
                    {step.statusIcon && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-yellow-400 font-bold">
                        {step.statusIcon}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <button onClick={submitForm} className="bg-white text-black rounded-full flex items-center px-6 py-2 ml-1 font-bold">
              <span className="text-lg mr-2">→</span>
              <span>שלח</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-evenly bg-yellow-400 rounded-full mx-auto w-[345px] py-2 px-[22px] shadow-lg">
            {stepsData.map(step => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step)}
                  className="flex items-center justify-center transition-all duration-300 ease-in-out"
                >
                  {activeStep === step.id ? (
                    <div className="flex items-center gap-2 px-2">
                      <div className="bg-black rounded-full w-[53px] h-[53px] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" /> 
                      </div>
                      <div className="text-left text-black">
                        <div className="text-sm font-bold">{step.title}</div>
                        <div className="text-xs">{step.subtitle}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-full w-[43px] h-[43px] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs2;
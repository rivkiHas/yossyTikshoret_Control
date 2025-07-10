import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from '@/lib/axios'
import StepOne from './step1';
import StepTwo from './step2';
import StepThree from './step3';
import { BuildingStorefrontIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from "framer-motion";
import { useFormikContext } from 'formik';
import { validateBrunch, validatePertip, validateContact } from '@/store/validation';
import { setActiveBrunch } from '@/store/brunch_store'
import { setActiveStep } from '@/store/step_store'

const stepsData = [
  {
    id: 1,
    title: 'שלב ראשון',
    subtitle: 'פרטים על העסק',
    icon: BuildingStorefrontIcon,
    targetId: 'step-one',
  },
  {
    id: 2,
    title: 'שלב שני',
    subtitle: 'כתובת ושעות העסק',
    icon: MapPinIcon,
    targetId: 'step-two',
  },
  {
    id: 3,
    title: 'שלב שלישי',
    subtitle: 'פרטי איש קשר',
    icon: UserCircleIcon,
    targetId: 'step-three',
  },
];

export function Tabs2() {

  const [activeStep, setActiveStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const sectionRefs = useRef([]);
  const [openedStep, setOpenedStep] = useState(null);
  const formik = useFormikContext();
  const contactMans = useSelector(state => state.conectMan.contactMans || []);
  const user = useSelector((state) => state.form.pertip);
  const brunches = useSelector((state) => state.brunch.brunches);
  const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer)
  const activeBrunch = useSelector((state) => state.brunch.activeBrunch);
  const salesMap = {
    "קווי": 1,
    "סלולרי": 2,
    "רכבים": 3,
  };
  const resellerTypeIds = user.typeSales.map((sale) => salesMap[sale]);
  const dispatch = useDispatch()

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
          if (stepId === 3) {
            setIsCompleted(true);
          }
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
    const noErrors = Object.keys(formik.errors).length === 0;
    const allFieldsFilled = Object.values(formik.values).every(
      (value) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    );

    setIsCompleted(noErrors && allFieldsFilled);
  }, [formik.errors, formik.values]);


  const handleStepClick = (step) => {
    setActiveStep(step.id);
    setOpenedStep(step.id === openedStep ? null : step.id);
    if (isCompleted) {
      setIsCompleted(false);
    }
    document.getElementById(step.targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitForm = async () => {
    const payload = {
      business_name: user.name,
      email: user.email,
      tax_id: user.id,
      phone: user.phone,
      type: user.typeMarketer,
      reseller_type_id: resellerTypeIds,
      brunches: brunches.map(b => ({
        address: b.address,
        brunchName: b.name,
        hours_open: b.hoursOpen.map(day => ({
          morning: {
            open: {
              open: day.morning.open,
              close: day.morning.close
            },
            close: {
              open: "00:00",
              close: "00:00"
            }
          },
          evening: {
            open: {
              open: day.evening.open,
              close: day.evening.close
            },
            close: {
              open: "00:00",
              close: "00:00"
            }
          }
        }))
      })),
      contact: contactMans.map(c => ({
        contactName: c.contactName,
        contactPhone: c.contactPhone,
        contactEmail: c.contactEmail,
        contactRole: c.contactRole
      }))
    };
    console.log(payload, "payload");

    try {
      const csrf = () => axios.get('/sanctum/csrf-cookie')
      await csrf();
      const response = await axios.post(
        '/api/register',
        payload,
      );
      return response.data;
    } catch (error) {
      let errorMsg = 'שגיאה בשליחת הנתונים לשרת';

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 400:
            errorMsg = data.message || 'נתונים לא תקינים';
            break;
          case 401:
            errorMsg = 'שגיאת הרשאה - אנא התחבר מחדש';
            break;
          case 422:
            if (data.errors) {
              const serverErrors = Object.values(data.errors).flat();
              errorMsg = serverErrors.join(', ');
            } else {
              errorMsg = data.message || 'שגיאת תקינות נתונים';
            }
            break;
          case 500:
            errorMsg = 'שגיאת שרת פנימית - אנא נסה שוב מאוחר יותר';
            break;
          default:
            errorMsg = data.message || `שגיאה ${status}`;
        }
      } else if (error.request) {
        errorMsg = 'שגיאת חיבור לשרת - אנא בדק את החיבור לאינטרנט';
      } else {
        errorMsg = error.message || 'שגיאה לא צפויה';
      }

      throw new Error(errorMsg);
    }
  };

  return (
    <>
      <div className="fixed top-0 z-10 w-full flex flex-col items-center p-2 px-3 gap-4 flex-shrink-0 bg-[#F4F4F4]">
        <svg
          xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
          width="251"
          height="34"
          viewBox="0 0 251 34"
          fill="none"
        >
          <path d="M0.113647 7.22974H11.739C16.1227 7.22974 18.5741 9.89999 18.5741 14.6839V26.8596H0.113647V7.22974ZM13.6713 22.7635V14.759C13.6713 12.489 12.6082 11.3195 10.5633 11.3195H5.01016V22.7635H13.6713Z" fill="#F8BD03" />
          <path d="M21.8634 11.3197H19.6309V7.22363H26.7974V19.9808H21.8634V11.3197Z" fill="#F8BD03" />
          <path d="M42.3 11.3197H28.8111V7.22363H47.4904V11.2071L41.9685 26.8535H36.8531L42.3 11.3197ZM28.9612 16.729H33.8577V31.5686H28.9612V16.729Z" fill="#F8BD03" />
          <path d="M51.6615 11.3197H49.429V7.22363H56.633V26.8535H51.6615V11.3197Z" fill="#F8BD03" />
          <path d="M61.1668 11.3197H58.9343V7.22363H66.1384V26.8535H61.1668V11.3197Z" fill="#F8BD03" />
          <path d="M68.7398 16.0347V7.22974H73.3799V15.3843C73.3799 16.1535 73.4174 16.8477 73.5613 17.5043C76.7756 16.9165 78.1701 15.2405 78.1701 11.6948V7.23599H82.7039V11.9136C82.7039 16.8852 80.3276 19.4804 74.8057 20.6123C75.9751 22.3695 77.9137 23.3513 80.2525 23.3513C84.605 23.3513 87.4879 20.062 87.4879 15.0154V7.22974H92.128V15.4531C92.128 22.5446 87.3003 27.3723 80.14 27.3723C73.3799 27.3723 68.7398 23.0949 68.7398 16.0347Z" fill="#F8BD03" />
          <path d="M104.379 27.0409V22.9448C104.892 23.0887 105.623 23.1262 106.242 23.1262C109.607 23.1262 111.289 21.0813 111.289 17.0603C111.289 13.1831 109.719 10.9568 107.011 10.9568C105.004 10.9568 103.61 12.1638 102.734 14.6464C102.077 16.216 101.677 18.4486 101.089 23.2763L100.652 27.0784H95.7926C96.049 23.8266 96.7807 18.4486 97.6187 13.9898L93.9291 7.22972H99.4885L101.133 10.1189C102.703 7.96139 104.86 6.90454 107.643 6.90454C112.977 6.90454 116.16 10.5629 116.16 16.7351C116.16 23.3888 112.652 27.2973 106.655 27.2973C105.736 27.2973 105.035 27.2223 104.379 27.0409Z" fill="#F8BD03" />
          <path d="M127.41 11.3196H117.392V0.682373H122.22V7.22356H132.638V11.0632L126.604 26.8534H121.451L127.41 11.3196Z" fill="black" />
          <path d="M136.734 11.3197H134.502V7.22363H141.706V26.8535H136.734V11.3197Z" fill="black" />
          <path d="M150.63 11.3197H143.613V7.22363H151.874C156.258 7.22363 158.672 9.85637 158.672 14.6778V26.8535H153.775V14.7591C153.769 12.4891 152.712 11.3197 150.63 11.3197Z" fill="black" />
          <path d="M160.804 17.5732V7.22986H165.701V17.2855C165.701 20.9751 167.383 23.2076 170.16 23.2076C173.155 23.2076 175.131 20.7562 175.131 17.0291C175.131 14.3964 175.094 13.152 174.512 12.314C173.999 11.5073 173.124 11.1446 171.804 11.1446C171.073 11.1446 170.084 11.3259 169.134 11.6574V7.78017C170.378 7.34242 171.986 7.01099 173.518 7.01099C175.531 7.01099 177.501 7.5613 178.633 9.28102C179.84 10.9632 180.021 13.2645 180.021 16.704C180.021 23.0638 175.963 27.3787 169.966 27.3787C164.312 27.3725 160.804 23.6016 160.804 17.5732Z" fill="black" />
          <path d="M181.091 22.87H183.648C185.256 22.87 186.062 21.9945 186.062 20.3498V11.3197H181.566V7.22363H190.959V20.5999C190.959 24.696 188.726 26.9222 184.78 26.9222H181.091V22.87Z" fill="black" />
          <path d="M195.355 11.3197H193.122V7.22363H200.327V26.8535H195.355V11.3197Z" fill="black" />
          <path d="M215.935 11.3197H202.447V7.22363H221.126V11.2071L215.604 26.8535H210.489L215.935 11.3197ZM202.59 16.729H207.487V31.5686H202.59V16.729Z" fill="black" />
          <path d="M248.985 7.22974H225.297C224.246 7.22974 223.396 8.08022 223.396 9.13081V24.971C223.396 26.0216 224.246 26.8721 225.297 26.8783H248.985C250.036 26.8783 250.893 26.0278 250.893 24.971V9.16833C250.911 8.11774 250.08 7.2485 249.029 7.22974H248.985ZM239.786 20.4247L236.572 23.6578H227.373C227.004 23.6703 226.698 23.3826 226.685 23.0136V16.116C226.673 15.7345 226.973 15.4219 227.354 15.4156H239.161C239.542 15.4156 239.849 15.722 239.849 16.1035V16.1223L239.786 20.4247ZM239.105 15.9472H227.298C227.211 15.9534 227.135 16.0284 227.129 16.116V22.9886C227.129 23.0824 227.204 23.1575 227.298 23.1575H236.284L239.274 20.187V16.0972C239.267 16.0159 239.192 15.9534 239.105 15.9472ZM229.85 21.2064C229.868 21.6754 229.506 22.0756 229.037 22.0944C229.012 22.0944 228.987 22.0944 228.955 22.0944C228.474 22.0944 228.08 21.7004 228.08 21.2189C228.092 20.7374 228.48 20.3559 228.955 20.3434C229.431 20.3559 229.812 20.7436 229.812 21.2189L229.85 21.2064ZM232.401 21.2064C232.413 21.6754 232.038 22.0694 231.569 22.0819C231.557 22.0819 231.544 22.0819 231.532 22.0819C231.050 22.0819 230.656 21.6941 230.656 21.2064C230.669 20.7248 231.056 20.3434 231.532 20.3309C232.007 20.3434 232.388 20.7311 232.388 21.2064H232.401ZM234.952 21.2064C234.965 21.6816 234.590 22.0694 234.114 22.0819C234.102 22.0819 234.089 22.0819 234.077 22.0819C233.595 22.0819 233.201 21.6941 233.201 21.2064C233.214 20.7248 233.595 20.3434 234.077 20.3309C234.552 20.3434 234.934 20.7311 234.934 21.2064H234.952ZM235.772 27.4912V32.2313C235.772 33.2569 235.215 33.4570 234.571 32.6878L230.018 27.4912H235.772Z" fill="#F8BD03" />
        </svg>
      </div>
      <div>
        <div className="flex flex-col gap-0 m-0 p-0">
          <div id="step-one" ref={el => sectionRefs.current[0] = el} data-step-id="1"><StepOne /></div>
          <div id="step-two" ref={el => sectionRefs.current[1] = el} data-step-id="2">
            {console.log("Rendering StepTwo, activeBrunch =", activeBrunch)}
            <StepTwo activeBrunch={activeBrunch} /></div>

          <div id="step-three" ref={el => sectionRefs.current[2] = el} data-step-id="3">
            <StepThree />
          </div>
        </div>


        <div className="fixed bottom-[calc(theme('spacing.6')+90px)] left-0 right-0 h-20
            rounded-t-[58px]
            bg-gradient-to-t from-[rgba(255,255,255,0.50)] via-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.00)]
            backdrop-blur-[2.2px] z-5">
        </div>


        <div className="fixed bottom-6 left-6 right-6 flex z-10"> 
          {isCompleted ? (
            <div className="flex w-full bg-yellow-400 rounded-[40px] h-[90px] mx-auto p-3 shadow-lg justify-between items-center" dir="rtl">
              <div className="flex items-center">
                {stepsData.map(step => {
                  const Icon = step.icon;
                  return (
                    <button key={step.id} onClick={() => handleStepClick(step)} className="relative mx-1 cursor-pointer bg-white rounded-full w-[60px] h-[60px] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-black" />
                      {step.statusIcon && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-7 h-7 flex items-center justify-center border-2 border-yellow-400 font-bold">
                          {step.statusIcon}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <button onClick={submitForm} className="bg-white text-black rounded-full flex items-center justify-center px-5 py-3 mr-1 font-bold gap-3">
                <span>שלח</span>
                <span className="text-lg ml-2">←</span>
              </button>
            </div>
          ) : (
            <div className='flex flex-col items-center w-full bg-yellow-400 justify-between rounded-[40px] mx-auto p-3 shadow-lg'>
              <div className="flex justify-between items-center w-full">
                {stepsData.map(step => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id}>
                      <button
                        onClick={() => handleStepClick(step)}
                        className="flex items-center justify-center transition-all duration-300 ease-in-out"
                      >
                        {activeStep === step.id ? (
                          <div className="flex items-center gap-2">
                            <div className="bg-black rounded-full w-[70px] h-[70px] flex items-center justify-center flex-shrink-0">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-right text-black px-2">
                              <div className="text-lg font-bold">{step.title}</div>
                              <div className="text-base">{step.subtitle}</div>
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

              {typeMarketer === "store" && activeStep === 2 && brunches.length > 1 && (
                <div className="flex gap-3 mt-4 justify-center items-center w-full">
                  {brunches.map((brunch, index) => (
                    <div key={brunch.id} className="flex items-center gap-2 ">
                      <button
                        onClick={() => {
                          dispatch(setActiveBrunch(brunch.id));
                        }}
                        className={`w-5 h-5 rounded-full border-2 border-white transition-all duration-200 ${activeBrunch === brunch.id ? 'bg-white border-white shadow-md w-[190px] pb-6' : 'bg-white p-3'}`}
                      >
                        {activeBrunch === brunch.id && (
                          <span className="text-xs text-black ">{' כתובת ושעות סניף ' + brunch.name || 'סניף'}</span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {openedStep && (
                <p className="text-black text-sm font-medium leading-relaxed w-full bg-yellow-400 p-3">
                  להצטרפות כמשווק רשמי בחברת 'יוסי תקשורת', יש למלא את פרטי העסק שלך.
                  המידע יסייע לנו להעניק לך את הכלים והמשאבים להצלחה מירבית.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="fixed top-[calc(100vh-theme('spacing.6'))] left-0 right-0 h-10 bg-white bg-opacity-20 backdrop-blur-md border-t border-white border-opacity-30 z-5"></div>
      </div>
    </>
  );
};

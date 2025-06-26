// components/desktop/step2.js
'use client';

import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "../../store/step_store";
import { addBrunch, removeBrunch, setActiveBrunch, updateBrunch } from "../../store/brunch_store";
import { branchSchema } from "@/lib/validation_schema"; 
import AddressSearchMap from '../address_search_map';
import HoursOpen from '../hours_open';
import { Button } from '../ui/button';
import { ArrowLongLeftIcon, PlusCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';


export default function StepTwo({ brunch }) { 
    const dispatch = useDispatch();
    const activeStep = useSelector((state) => state.stepper.activeStep);
    const brunches = useSelector((state) => state.brunch.brunches);
    const typeMarketer = useSelector((state) => state.form.pertip.typeMarketer);

    if (!brunch) {
        return null;
    }
    
    const updateReduxState = (values) => {
        dispatch(updateBrunch(values));
    };

    const handleNext = (values) => {
        updateReduxState(values);
        // לוגיקת ניווט מורכבת נשארת כפי שהייתה
        const currentBrunchIndex = brunches.findIndex(b => b.id === brunch.id);
        if (typeMarketer !== "חנות" || currentBrunchIndex === brunches.length - 1) {
            dispatch(setActiveStep(activeStep + 1));
        } else {
            const nextBrunch = brunches[currentBrunchIndex + 1];
            dispatch(setActiveBrunch(nextBrunch.id));
        }
    };
    
    const handlePrev = (values) => {
        updateReduxState(values);
        dispatch(setActiveStep(activeStep - 1));
    };

    return (
        <Formik
            initialValues={brunch}
            validationSchema={branchSchema}
            onSubmit={(values) => handleNext(values)}
            enableReinitialize // קריטי! מאתחל את Formik כשה-prop `brunch` משתנה
        >
            {({ values, setFieldValue }) => (
                <Form onBlur={() => updateReduxState(values)}>
                    <div className="flex justify-center ">
                        <div className="flex flex-col items-end w-full max-w-[1440px] px-[20px]  py-[30px]">
                            <div className="flex flex-col lg:flex-row w-full h-full gap-[24px] lg:gap-[36px]">
                                <div className="flex flex-col lg:w-1/2 w-full h-full">
                                    {/* העבר את setFieldValue לקומפוננטת המפה כדי שתוכל לעדכן את הכתובת והמיקום */}
                                    <AddressSearchMap 
                                       setFieldValue={setFieldValue} 
                                       currentLocation={values.location}
                                    />
                                </div>
                                <div className="flex flex-col lg:w-1/2 w-full h-full lg:h-auto p-4 bg-white rounded-[40px]">
                                     {/* העבר את setFieldValue לקומפוננטת השעות */}
                                    <HoursOpen 
                                       setFieldValue={setFieldValue} 
                                       hours={values.hoursOpen}
                                    />
                                    {/* ... */}
                                </div>
                            </div>
                            <div className="flex w-full mt-6 items-start justify-between">
                                {/* לוגיקת כפתורי הוספה/מחיקה נשארת זהה */}
                                <div>
                                    {/* ... */}
                                </div>
                                
                                <div className="hidden lg:flex gap-4">
                                     <Button type="button" onClick={() => handlePrev(values)}
                                        className="cursor-pointer flex items-center gap-1 bg-white text-black border border-[#F8BD00] p-5 rounded-full hover:border-black">
                                        <ArrowLongRightIcon className="h-6 w-6"/>
                                        שלב קודם
                                    </Button>
                                    <Button type="button" onClick={() => handleNext(values)}
                                        className="cursor-pointer flex items-center gap-2 bg-yellow-400 text-black p-5 rounded-full border border-transparent hover:bg-white hover:text-black hover:border-[#F8BD03]">
                                        שלב הבא
                                        <ArrowLongLeftIcon className="h-6 w-6"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { RegisterForm1 } from "../register_form1";
import { RegisterFormButton } from "../register_form_button";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "../../store/step_store";
import { setFormData } from "../../store/form_store";
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'

export default function StepOneMobile({ index }) {
    const dispatch = useDispatch();
    const activeStep = useSelector((state) => state.stepper.activeStep);
    const user = useSelector((state) => state.form.pertip);

    const form = useForm({
        defaultValues: {
            name: user?.name || "",
            mail: user?.email || "",
            id: user?.id || "",
            phone: user?.phone || "",
            logo: null,
        },
        mode: "onChange",
    });


    return (

        <div className="flex flex-col w-full justify-center items-center min-h-screen ">
            <div className="flex flex-col text-right rounded-[40px] bg-white p-6 ">
                <RegisterForm1 form={form} />
            </div>
            <div className="flex flex-col text-right rounded-[40px] bg-white p-6 ">
                <RegisterFormButton />
            </div>
        </div>

    );
}

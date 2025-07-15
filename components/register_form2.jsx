"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Typography } from "./typhography";
import IconButton from "./icon_button";
import TooltipValid from "./tooltip_valid";
import { addContactMan, deleteContactMan } from "@/store/contact_man_store";
import { Button } from "./ui/button";
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setFormData } from "../store/contact_man_store";

// עדכון RegisterForm2 - ודא שהשדות מסומנים נכון כ-touched:

export function RegisterForm2({ OkFunction, contactId, canDelete }) {
  const dispatch = useDispatch();
  const formik = useFormikContext();
  const contactMans = useSelector((state) => state.conectMan.contactMans || []);
  const brunches = useSelector((state) => state.brunch.brunches || []);
  const contactIndex = contactMans.findIndex((c) => c.id === contactId);
  
  const addContactManHandler = () => {
    dispatch(addContactMan());
  };

  return (
    <div className="flex flex-col w-full lg:w-1/2 p-5 gap-4">
      <div className="flex justify-between items-center mb-4">
        <Typography className="text-2xl font-bold">פרטי איש קשר</Typography>
        {canDelete && contactIndex > 0 && (
          <IconButton
            headerText="מחיקה"
            onConfirm={() => OkFunction(contactId)}
            contactId={contactId}
            text="האם ברצונך למחוק את איש קשר זה?"
          />
        )}
      </div>

      <div className="space-y-8 h-60vh">
        <div className="relative">
          <label className="block mb-1">שם מלא</label>
          <Input
            name={`contactMans[${contactIndex}].contactName`} 
            placeholder="יש להזין שם מלא"
            value={formik.values.contactMans?.[contactIndex]?.contactName || ""}
            onChange={(e) => {
              const fieldPath = `contactMans[${contactIndex}].contactName`;
              formik.setFieldValue(fieldPath, e.target.value);
              formik.setFieldTouched(fieldPath, true); 
              
              dispatch(setFormData({
                name: "contactName",
                value: e.target.value,
                contactId: contactId
              }));
            }}
            onBlur={() => {
              formik.setFieldTouched(`contactMans[${contactIndex}].contactName`, true);
            }}
          />
          {formik.touched.contactMans?.[contactIndex]?.contactName &&
            formik.errors.contactMans?.[contactIndex]?.contactName && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].contactName} />
            )}
        </div>

        <div className="relative">
          <label className="block mb-1">טלפון אישי</label>
          <Input
            name={`contactMans[${contactIndex}].contactPhone`} 
            placeholder="יש להזין מספר טלפון אישי"
            value={formik.values.contactMans?.[contactIndex]?.contactPhone || ""}
            onChange={(e) => {
              const fieldPath = `contactMans[${contactIndex}].contactPhone`;
              formik.setFieldValue(fieldPath, e.target.value);
              formik.setFieldTouched(fieldPath, true); 
              
              dispatch(setFormData({
                name: "contactPhone",
                value: e.target.value,
                contactId: contactId
              }));
            }}
            onBlur={() => {
              formik.setFieldTouched(`contactMans[${contactIndex}].contactPhone`, true);
            }}
          />
          {formik.touched.contactMans?.[contactIndex]?.contactPhone &&
            formik.errors.contactMans?.[contactIndex]?.contactPhone && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].contactPhone} />
            )}
        </div>

        <div className="relative">
          <label className="block mb-1">אימייל אישי</label>
          <Input
            name={`contactMans[${contactIndex}].contactEmail`}
            placeholder="יש להזין אימייל אישי"
            value={formik.values.contactMans?.[contactIndex]?.contactEmail || ""}
            onChange={(e) => {
              const fieldPath = `contactMans[${contactIndex}].contactEmail`;
              formik.setFieldValue(fieldPath, e.target.value);
              formik.setFieldTouched(fieldPath, true);
              
              dispatch(setFormData({
                name: "contactEmail",
                value: e.target.value,
                contactId: contactId
              }));
            }}
            onBlur={() => {
              formik.setFieldTouched(`contactMans[${contactIndex}].contactEmail`, true);
            }}
          />
          {formik.touched.contactMans?.[contactIndex]?.contactEmail &&
            formik.errors.contactMans?.[contactIndex]?.contactEmail && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].contactEmail} />
            )}
        </div>

        {contactMans.length > 1 && (
          <>
            <div>
              <label className="block mb-1">סניף</label>
              <Select
                value={formik.values.contactMans?.[contactIndex]?.brunchId || ""}
                onValueChange={(val) => {
                  const fieldPath = `contactMans[${contactIndex}].brunchId`;
                  formik.setFieldValue(fieldPath, val);
                  formik.setFieldTouched(fieldPath, true); 
                  
                  dispatch(setFormData({
                    name: "contactBrunchId",
                    value: val,
                    contactId: contactId
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="בחר סניף" />
                </SelectTrigger>
                <SelectContent>
                  {brunches.map((brunch) => (
                    <SelectItem key={brunch.id} value={String(brunch.id)}>
                      {brunch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1">תפקיד</label>
              <Select
                value={formik.values.contactMans?.[contactIndex]?.contactRole || ""}
                onValueChange={(val) => {
                  const fieldPath = `contactMans[${contactIndex}].contactRole`;
                  formik.setFieldValue(fieldPath, val);
                  formik.setFieldTouched(fieldPath, true); 
                  
                  dispatch(setFormData({
                    name: "contactRole",
                    value: val,
                    contactId: contactId
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="בחר תפקיד" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">בעלים</SelectItem>
                  <SelectItem value="seller">מוכר</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
      
      <div className="lg:hidden">
        <Button onClick={addContactManHandler}
          className="w-full cursor-pointer bg-black border hover:bg-white hover:text-black hover:border-black text-white p-5 gap-2 rounded-full">
          <PlusCircleIcon />
          הוספת איש קשר נוסף
        </Button>
      </div>
    </div>
  );
}

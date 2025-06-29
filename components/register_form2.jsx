"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Typography } from "./typhography";
import IconButton from "./icon_button";
import TooltipValid from "./tooltip_valid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterForm2({ OkFunction, contactId, canDelete }) {
  const dispatch = useDispatch();
  const formik = useFormikContext();

  const contactMans = useSelector((state) => state.conectMan.contactMans || []);
  const brunches = useSelector((state) => state.brunch.brunches || []);
  const contactIndex = contactMans.findIndex((c) => c.id === contactId);

  return (
    <div className="flex flex-col gap-[15px] w-full lg:w-1/2 mb-6 h-[60vh]">
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

      <form className="space-y-5 h-60vh">
        {/* שם מלא */}
        <div className="relative">
          <label className="block mb-1">שם מלא</label>
          <Input
            name={`contactMans.${contactIndex}.name`}
            placeholder="יש להזין שם מלא"
            value={formik.values.contactMans?.[contactIndex]?.name || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contactMans?.[contactIndex]?.name &&
            formik.errors.contactMans?.[contactIndex]?.name && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].name} />
            )}
        </div>

        {/* טלפון */}
        <div className="relative">
          <label className="block mb-1">טלפון אישי</label>
          <Input
            name={`contactMans.${contactIndex}.phone`}
            placeholder="יש להזין מספר טלפון אישי"
            value={formik.values.contactMans?.[contactIndex]?.phone || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contactMans?.[contactIndex]?.phone &&
            formik.errors.contactMans?.[contactIndex]?.phone && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].phone} />
            )}
        </div>

        {/* אימייל */}
        <div className="relative">
          <label className="block mb-1">אימייל אישי</label>
          <Input
            name={`contactMans.${contactIndex}.email`}
            placeholder="יש להזין אימייל אישי"
            value={formik.values.contactMans?.[contactIndex]?.email || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contactMans?.[contactIndex]?.email &&
            formik.errors.contactMans?.[contactIndex]?.email && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].email} />
            )}
        </div>

        {/* סניף */}
        {contactMans.length > 1 && (
          <>
            <div>
              <label className="block mb-1">סניף</label>
              <Select
                value={formik.values.contactMans?.[contactIndex]?.brunchId || ""}
                onValueChange={(val) =>
                  formik.setFieldValue(`contactMans.${contactIndex}.brunchId`, val)
                }
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

            {/* תפקיד */}
            <div>
              <label className="block mb-1">תפקיד</label>
              <Select
                value={formik.values.contactMans?.[contactIndex]?.role || ""}
                onValueChange={(val) =>
                  formik.setFieldValue(`contactMans.${contactIndex}.role`, val)
                }
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
      </form>
    </div>
  );
}

'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addContactMan } from '@/store/contact_man_store'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData } from '../store/contact_man_store'
import IconButton from './icon_button'
import TooltipValid from './tooltip_valid'
import { Typography } from './typhography'
import { Button } from './ui/button'

export function RegisterForm2({ OkFunction, contactId, canDelete }) {
  const dispatch = useDispatch()
  const formik = useFormikContext()
  const contactMans = useSelector((state) => state.conectMan.contactMans || [])
  const brunches = useSelector((state) => state.brunch.brunches || [])
  const contactIndex = contactMans.findIndex((c) => c.id === contactId)

  const addContactManHandler = () => {
    dispatch(addContactMan())
  }

  return (
    <div className="flex w-full flex-col gap-4 p-5 lg:w-1/2">
      <div className="mb-4 flex items-center justify-between">
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

      <div className="h-60vh space-y-8">
        <div className="relative">
          <label className="mb-1 block">שם מלא</label>
          <Input
            name={`contactMans[${contactIndex}].contactName`}
            placeholder="יש להזין שם מלא"
            value={formik.values.contactMans?.[contactIndex]?.contactName || ''}
            onChange={(e) => {
              const fieldPath = `contactMans[${contactIndex}].contactName`
              formik.setFieldValue(fieldPath, e.target.value)
              formik.setFieldTouched(fieldPath, true)

              dispatch(
                setFormData({
                  name: 'contactName',
                  value: e.target.value,
                  contactId: contactId,
                })
              )
            }}
            onBlur={() => {
              formik.setFieldTouched(`contactMans[${contactIndex}].contactName`, true)
            }}
          />
          {formik.touched.contactMans?.[contactIndex]?.contactName &&
            formik.errors.contactMans?.[contactIndex]?.contactName && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].contactName} />
            )}
        </div>

        <div className="relative">
          <label className="mb-1 block">טלפון אישי</label>
          <Input
            name={`contactMans[${contactIndex}].contactPhone`}
            placeholder="יש להזין מספר טלפון אישי"
            value={formik.values.contactMans?.[contactIndex]?.contactPhone || ''}
            onChange={(e) => {
              const fieldPath = `contactMans[${contactIndex}].contactPhone`
              formik.setFieldValue(fieldPath, e.target.value)
              formik.setFieldTouched(fieldPath, true)
              dispatch(
                setFormData({
                  name: 'contactPhone',
                  value: e.target.value,
                  contactId: contactId,
                })
              )
            }}
            onBlur={() => {
              formik.setFieldTouched(`contactMans[${contactIndex}].contactPhone`, true)
            }}
          />
          {formik.touched.contactMans?.[contactIndex]?.contactPhone &&
            formik.errors.contactMans?.[contactIndex]?.contactPhone && (
              <TooltipValid tooltipText={formik.errors.contactMans[contactIndex].contactPhone} />
            )}
        </div>

        <div className="relative">
          <label className="mb-1 block">אימייל אישי</label>
          <Input
            name={`contactMans[${contactIndex}].contactEmail`}
            placeholder="יש להזין אימייל אישי"
            value={formik.values.contactMans?.[contactIndex]?.contactEmail || ''}
            onChange={(e) => {
              const fieldPath = `contactMans[${contactIndex}].contactEmail`
              formik.setFieldValue(fieldPath, e.target.value)
              formik.setFieldTouched(fieldPath, true)

              dispatch(
                setFormData({
                  name: 'contactEmail',
                  value: e.target.value,
                  contactId: contactId,
                })
              )
            }}
            onBlur={() => {
              formik.setFieldTouched(`contactMans[${contactIndex}].contactEmail`, true)
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
              <label className="mb-1 block">סניף</label>
              <Select
                value={formik.values.contactMans?.[contactIndex]?.brunchId || ''}
                onValueChange={(val) => {
                  const fieldPath = `contactMans[${contactIndex}].brunchId`
                  formik.setFieldValue(fieldPath, val)
                  formik.setFieldTouched(fieldPath, true)

                  dispatch(
                    setFormData({
                      name: 'contactBrunchId',
                      value: val,
                      contactId: contactId,
                    })
                  )
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
              <label className="mb-1 block">תפקיד</label>
              <Select
                value={formik.values.contactMans?.[contactIndex]?.contactRole || ''}
                onValueChange={(val) => {
                  const fieldPath = `contactMans[${contactIndex}].contactRole`
                  formik.setFieldValue(fieldPath, val)
                  formik.setFieldTouched(fieldPath, true)

                  dispatch(
                    setFormData({
                      name: 'contactRole',
                      value: val,
                      contactId: contactId,
                    })
                  )
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
        <Button
          onClick={addContactManHandler}
          className="w-full cursor-pointer gap-2 rounded-full border bg-black p-5 text-white hover:border-black hover:bg-white hover:text-black"
        >
          <PlusCircleIcon />
          הוספת איש קשר נוסף
        </Button>
      </div>
    </div>
  )
}

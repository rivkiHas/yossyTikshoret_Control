'use client'

import { Input } from '@/components/ui/input'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData } from '../store/form_store'
import TooltipValid from './tooltip_valid'
import { Typography } from './typhography'

export function RegisterForm1() {
  const dispatch = useDispatch()
  const errorsPertip = useSelector((state) => state.formErrors.pertip)
  const formik = useFormikContext()

  const fields = [
    {
      name: 'name',
      label: 'שם העסק',
      placeholder: 'יש להזין שם העסק',
    },
    {
      name: 'email',
      label: 'אימייל העסק',
      placeholder: 'יש להזין את אימייל העסק',
    },
    {
      name: 'id',
      label: 'ח.פ / ע.מ העסק',
      placeholder: 'יש להזין ח.פ / ע.מ העסק',
    },
    {
      name: 'phone',
      label: 'טלפון העסק',
      placeholder: 'יש להזין את טלפון העסק',
    },
  ]

  return (
    <div className="flex w-full flex-col justify-center gap-4 rounded-[40px] bg-white p-8 lg:gap-2.5 lg:p-4">
      <Typography className="block w-full text-[24px] font-bold">פרטים על העסק</Typography>
      <div className="flex flex-col space-y-10">
        {fields.map(({ name, label, placeholder }) => (
          <div key={name} className="relative flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <Input
              name={name}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={(e) => {
                formik.handleChange(e)
                dispatch(setFormData({ [name]: e.target.value }))
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched[name] && (formik.errors[name] || errorsPertip[name]) && (
              <TooltipValid tooltipText={formik.errors[name] || errorsPertip[name]} />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">לוגו העסק</label>
          <div className="relative">
            <input
              id="upload"
              type="file"
              accept=".jpg,.png,.pdf"
              className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0]
                formik.setFieldValue('logo', selectedFile)
                // dispatch(setFormData({ logo: selectedFile }));
              }}
            />
            <div className="flex h-9 items-center justify-between rounded-md border border-input bg-background px-4 text-sm text-muted-foreground transition-colors peer-hover:border-primary peer-focus-visible:ring-1 peer-focus-visible:ring-ring">
              <span className="truncate">{formik.values.logo?.name || 'יש לבחור קובץ'}</span>
              {formik.values.logo ? (
                <button
                  type="button"
                  className="text-gray-500 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    formik.setFieldValue('logo', null)
                    // dispatch(setFormData({ logo: null }));
                  }}
                >
                  ✕
                </button>
              ) : (
                <ArrowUpTrayIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <label className="text-sm font-normal">ניתן להעלות קבצים בפורמטים JPG, PNG ו-PDF בלבד.</label>
          </div>
          {/* {formik.touched.logo && formik.errors.logo && (
                        <TooltipValid tooltipText={formik.errors.logo} />
                    )} */}
        </div>
      </div>
    </div>
  )
}

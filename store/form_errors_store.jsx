import { createSlice } from '@reduxjs/toolkit'

const formErrorsSlice = createSlice({
  name: 'formErrors',
  initialState: {
    pertip: {},
    brunches: [],
    contacts: [],
  },
  reducers: {
    setFormErrors: (state, action) => {
      return action.payload
    },
    clearFormErrors: () => ({
      pertip: {},
      brunches: [],
      contacts: [],
    }),
  },
})

export const { setFormErrors, clearFormErrors } = formErrorsSlice.actions
export default formErrorsSlice.reducer

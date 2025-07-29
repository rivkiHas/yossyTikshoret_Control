import { createSlice } from '@reduxjs/toolkit'

const conectManSlice = createSlice({
  name: 'conectManSlice',
  initialState: {
    contactMans: [
      {
        id: 1,
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        brunch: '',
        contactRole: 'seller',
      },
    ],
  },
  reducers: {
    setFormData: (state, action) => {
      const { name, value, contactId } = action.payload
      const contactIndex = state.contactMans.findIndex((contact) => contact.id === contactId)
      if (contactIndex !== -1) {
        state.contactMans[contactIndex][name] = value
      }
    },

    addContactMan: (state) => {
      const newId = state.contactMans.length > 0 ? state.contactMans[state.contactMans.length - 1].id + 1 : 1
      state.contactMans.push({
        id: newId,
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        brunch: '',
        contactRole: '',
      })
    },

    deleteContactMan: (state, action) => {
      state.contactMans = state.contactMans.filter((contact) => contact.id !== action.payload)
    },

    removeLastContactMan: (state) => {
      if (state.contactMans.length > 1) {
        state.contactMans.splice(-1, 1)
      }
    },
  },
})

export const { setFormData, addContactMan, deleteContactMan } = conectManSlice.actions
export default conectManSlice.reducer

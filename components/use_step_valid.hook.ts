import { useSelector } from 'react-redux'

export default function useStepValidation() {
  const pertip = useSelector((state) => state.pertip)
  const brunches = useSelector((state) => state.brunch?.brunches || [])
  const contacts = useSelector((state) => state.contactMans || [])

  const isStepValid = (stepIndex) => {
    switch (stepIndex) {
      case 0: // שלב ראשון – פרטי העסק
        return (
          pertip?.name &&
          pertip?.email &&
          pertip?.phone &&
          pertip?.typeMarketer &&
          Array.isArray(pertip?.typeSales) &&
          pertip.typeSales.length > 0
        )

      case 1: // שלב שני – סניפים
        return (
          Array.isArray(brunches) &&
          brunches.length > 0 &&
          brunches.every(
            (brunch) =>
              brunch?.address &&
              brunch?.name &&
              Array.isArray(brunch.hoursOpen) &&
              brunch.hoursOpen.some(
                (day) => day?.morning?.open && day?.morning?.close && day?.evening?.open && day?.evening?.close
              )
          )
        )

      case 2: // שלב שלישי – אנשי קשר
        return (
          Array.isArray(contacts) &&
          contacts.length > 0 &&
          contacts.every(
            (contact) => contact?.name && contact?.phone && contact?.email && contact?.brunch && contact?.role
          )
        )

      default:
        return false
    }
  }

  const getCompletedSteps = () => {
    return [0, 1, 2].filter((stepIndex) => isStepValid(stepIndex))
  }

  return { isStepValid, getCompletedSteps }
}

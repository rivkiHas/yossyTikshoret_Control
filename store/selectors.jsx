import { createSelector } from '@reduxjs/toolkit';

export const isPertipStepComplete = createSelector(
    state => state.form.pertip,
    (pertip) => {
        const { name, email, id, phone, typeMarketer, typeSales } = pertip;
        console.log({name, email, id, phone, typeMarketer, typeSales });
    
        return (name && email && id && phone && typeMarketer && typeSales.length > 0);
    }

);

export const isContactStepComplete = createSelector(
    state => state.conectMan.contactMans,
    (contactMans) => {
        return contactMans.every(({ contactManName, contactManPhone, contactManEmail, brunch, role }) =>
            contactManName && contactManPhone && contactManEmail && brunch && role
        );
    }
);

export const isBrunchStepComplete = createSelector(
    state => state.brunch.brunches,
    (brunches) => {
        return brunches.every(brunch => {
            const { address, location, name, weekday, hoursOpen } = brunch;
            const isFilled = address && location?.lat && location?.lng && name;
            const weekdayFilled = weekday?.morning?.open && weekday?.morning?.close &&
                weekday?.evening?.open && weekday?.evening?.close;
            const hoursFilled = hoursOpen.every(day =>
                day.morning.open && day.morning.close && day.evening.open && day.evening.close
            );
            return isFilled && weekdayFilled && hoursFilled;
        });
    }
);

export const isAllStepsComplete = createSelector(
    isPertipStepComplete,
    isContactStepComplete,
    isBrunchStepComplete,
    (pertipComplete, contactComplete, brunchComplete) =>
        pertipComplete && contactComplete && brunchComplete
);

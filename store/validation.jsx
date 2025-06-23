
export const validatePertip = (pertip) => {
    const errors = {};
    if (!pertip.name || pertip.name.trim().length < 2) errors.name = "שם העסק חייב להכיל לפחות 2 תווים";
    if (!pertip.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pertip.email)) errors.email = "אימייל לא תקין";
    if (!pertip.id || pertip.id.length < 7) errors.id = "מספר זיהוי עסק חייב להכיל לפחות 7 תווים";
    if (!pertip.phone || !/^0\d{1,2}-?\d{7}$/.test(pertip.phone)) errors.phone = "מספר טלפון לא תקין";
    if (!pertip.typeMarketer) errors.typeMarketer = "יש לבחור סוג משווק";
    if (!pertip.typeSales || pertip.typeSales.length === 0) errors.typeSales = "יש לבחור לפחות ערך אחד";

    return errors;
};
export const validateBrunch = (brunch) => {
    const errors = {};
    if (!brunch.adress || brunch.name.trim().length < 2) errors.name = "כתובת העסק חייב להכיל לפחות 2 תווים";
    return errors;
};

export const validateContact = (contactMan) => {
    const errors = {};
    if (!contactMan.name || contactMan.name.trim().length < 2) errors.name = "שם איש הקשר חייב להכיל לפחות 2 תווים";
    if (!contactMan.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactMan.email)) errors.email = "אימייל לא תקין";
    if (!contactMan.phone || !/^0\d{1,2}-?\d{7}$/.test(contactMan.phone)) errors.phone = "מספר טלפון לא תקין";

    return errors;
};
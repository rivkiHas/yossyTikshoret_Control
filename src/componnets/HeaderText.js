import React from 'react';
import Typography from '@mui/material/Typography';

function HeaderText({ placeholder, color ,textAlign}) {
  return (
    <Typography
      style={{
        // height: '31.928px',  // גובה של הטקסט
        flexShrink: 0,  // מונע מהאלמנט להתכווץ
        alignSelf: 'stretch',  // משתרע על כל הרוחב
        color: color,  // צבע הטקסט
        textAlign:textAlign,  // מיישר את הטקסט לימין
        fontFamily: 'SimplerPro_HLAR',  // הגדרת הגופן המותאם אישית
        fontSize: '20px',  // גודל הגופן
        fontStyle: 'normal',  // סגנון גופן רגיל
        fontWeight: 700,  // משקל הגופן
        lineHeight: 'normal',  // גובה שורה רגיל
        gap:'12px'
      }}
    >
      {placeholder} </Typography>
  );
}

export default HeaderText;  // ייצוא ברירת מחדל של הקומפוננטה

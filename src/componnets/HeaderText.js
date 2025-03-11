import React from 'react';
import Typography from '@mui/material/Typography';

function HeaderText({ placeholder, color }) {
  return (
    <Typography
      style={{
        height: '31.928px',  // גובה של הטקסט
        flexShrink: 0,  // מונע מהאלמנט להתכווץ
        alignSelf: 'stretch',  // משתרע על כל הרוחב
        // color: 'var(--Color-3, #000)',  // צבע הטקסט
        color: color,  // צבע הטקסט
        textAlign: 'right',  // מיישר את הטקסט לימין
        fontFamily: 'SimplerPro_HLAR',  // הגדרת הגופן המותאם אישית
        fontSize: '28px',  // גודל הגופן
        fontStyle: 'normal',  // סגנון גופן רגיל
        fontWeight: 700,  // משקל הגופן
        lineHeight: 'normal',  // גובה שורה רגיל
        marginBottom: '24px'
      }}
    >
      {placeholder}   </Typography>
  );
}

export default HeaderText;  // ייצוא ברירת מחדל של הקומפוננטה

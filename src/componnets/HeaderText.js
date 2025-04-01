import React from 'react';
import Typography from '@mui/material/Typography';

function HeaderText({ placeholder, color }) {
  return (
    <Typography
      sx={{
        flexShrink: 0,  // מונע מהאלמנט להתכווץ
        alignSelf: 'stretch',  // משתרע על כל הרוחב
        color: color,  // צבע הטקסט
        fontFamily: 'SimplerPro_HLAR',  // הגדרת הגופן המותאם אישית
        fontSize: '28px',  // גודל הגופן
        fontStyle: 'normal',  // סגנון גופן רגיל
        fontWeight: 700,  // משקל הגופן
        lineHeight: 'normal',  // גובה שורה רגיל
        justifyContent:'end'
      }}
    >
      {placeholder} </Typography>
  );
}

export default HeaderText;  // ייצוא ברירת מחדל של הקומפוננטה

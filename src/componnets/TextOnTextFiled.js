import React from 'react';
import Typography from '@mui/material/Typography';

function TextOnTextFiled({header, textAlign}) {
  return (
    <Typography
      sx={{
        color: 'var(--Dark-Dark, #111928)',  // צבע הטקסט
        textAlign: textAlign,  // מיישר את הטקסט לימין
        fontFamily: 'SimplerPro_HLAR',  // הגדרת הגופן
        fontSize: '16px',  // גודל הגופן
        fontStyle: 'normal',  // סגנון גופן רגיל
        fontWeight: 600,  // משקל הגופן
        lineHeight: 'normal',  // גובה שורה רגיל
        marginBottom:"10px"
      }}
    >
      {header}
    </Typography>
  );
}

export default TextOnTextFiled;

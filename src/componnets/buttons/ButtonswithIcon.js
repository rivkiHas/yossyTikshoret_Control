import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import CustomIcon from './CustomIcon'; // ודא שהקובץ קיים

export const ButtonsWithIcon = ({ variant, color, iconPosition, children, icon, ...props }) => {

    const iconElement = icon || <CustomIcon />;

    return (
        <Button
            variant={variant}
            startIcon={iconPosition === 'start' ? iconElement : null}
            endIcon={iconPosition === 'end' ? iconElement : null}
            sx={{
                display: 'flex',
                height: '46px',
                padding: '12px 24px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                borderRadius: '50px',
                border: variant === 'outlined'
                    ? `1px solid ${color === '#FFF' ? '#000' : color === '#000' ? '#FFF' : '#F8BD00'}`
                    : 'none',
                background: variant === 'contained' ? color || '#F8BD00' : 'none', // מותאם ל-contained
                color: color === '#000' ? '#FFF' : '#000', // אם הצבע הוא #000, אז צבע הטקסט יהיה #3FFF
                textAlign: 'right',
                fontFamily: 'SimplerPro_HLAR',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal',
                whiteSpace: 'nowrap',
            }}
            {...props} // מעביר פרופס נוספים
        >
            {children || 'שלב הבא'}
        </Button>
    );
};

ButtonsWithIcon.propTypes = {
    variant: PropTypes.string,
    children: PropTypes.node,
    iconPosition: PropTypes.oneOf(['start', 'end']),
    color: PropTypes.string,
    icon: PropTypes.element,
};

export default ButtonsWithIcon;

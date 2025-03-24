import * as React from 'react';
import Switch from '@mui/material/Switch';
import TextOnTextFiled from '../TextOnTextFiled';

export default function SwitchButton() {
    return (
        <div style={{
            display: 'flex',
            width: '222px',
            height: '48px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '40px',
            background: '#F4F4F4'
        }}>
            <TextOnTextFiled header={"שעות פתיחה בתיאום מראש"} />
            <Switch
                defaultChecked
                sx={{
                 color:"#FEF2CC"
                }}
            />
        </div>
    );
}

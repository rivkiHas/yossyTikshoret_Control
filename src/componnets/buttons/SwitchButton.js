import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import TextOnTextFiled from '../TextOnTextFiled';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': { width: 15 },
        '& .MuiSwitch-switchBase.Mui-checked': { transform: 'translateX(9px)' },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#FFF',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#F8BD00',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], { duration: 200 }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

export default function SwitchButton({ checked, onChange }) {
    return (
        <FormGroup sx={{
            alignItems:'end'
        }}>
            <Stack 
                direction="row" 
                spacing={1} 
                sx={{  backgroundColor: '#F4F4F4', borderRadius: '40px', padding: '5px 10px' }}
            >
                <TextOnTextFiled header={"שעות בתיאום מראש"} />
                <AntSwitch checked={checked} onChange={onChange} />
            </Stack>
        </FormGroup>
    );
}

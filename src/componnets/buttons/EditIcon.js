import { useState } from 'react';
import TextOnTextFiled from "../TextOnTextFiled";

export default function EditIcon({ setIsEditing }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        // הפיכת המצב (true/false)
        setIsEditing(prevState => !prevState);
        console.log("Icon clicked!");
    };

    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex',
                    height: '48px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#FEF2CC',
                    borderRadius: '50%',
                    cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHovered(true)} // הצגת הטקסט בעת ריחוף
            onMouseLeave={() => setIsHovered(false)} // הסתרת הטקסט לאחר הריחוף
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M17.5287 4.48708L19.2157 2.79908C19.5674 2.44741 20.0444 2.24984 20.5417 2.24984C21.0391 2.24984 21.5161 2.44741 21.8677 2.79908C22.2194 3.15076 22.417 3.62774 22.417 4.12508C22.417 4.62243 22.2194 5.09941 21.8677 5.45108L11.2487 16.0701C10.7201 16.5984 10.0681 16.9868 9.35173 17.2001L6.66673 18.0001L7.46673 15.3151C7.68001 14.5987 8.06837 13.9468 8.59673 13.4181L17.5287 4.48708ZM17.5287 4.48708L20.1667 7.12508M18.6667 14.0001V18.7501C18.6667 19.3468 18.4297 19.9191 18.0077 20.3411C17.5858 20.763 17.0135 21.0001 16.4167 21.0001H5.91673C5.32 21.0001 4.7477 20.763 4.32574 20.3411C3.90379 19.9191 3.66673 19.3468 3.66673 18.7501V8.25008C3.66673 7.65335 3.90379 7.08105 4.32574 6.65909C4.7477 6.23714 5.32 6.00008 5.91673 6.00008H10.6667" stroke="#F8BD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {isHovered && (
                <TextOnTextFiled
                    
                    header={"עריכת שעות שבועיות"}
                >
                </TextOnTextFiled>
            )}
        </div>
    );
}

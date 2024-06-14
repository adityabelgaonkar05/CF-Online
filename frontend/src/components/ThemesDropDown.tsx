import { useState } from "react";

interface ThemesDropDownProps {
    setTheme: (theme: string) => void;
}

export default function ThemesDropDown({ setTheme }: ThemesDropDownProps) {
    const [header, setHeader] = useState<string>("Dark");
    const [open, setOpen] = useState<boolean>(false);

    function upOrDown() {
        setOpen(!open);
    }

    function handleClick(number: number) {
        return () => {
            if (number === 1) {
                setHeader("Dark");
                setTheme("vs-dark");
            } else {
                setHeader("Light");
                setTheme("vs-light");
            }

            setOpen(false);
        }
    }

    return (
        <div className="dropdown">
            <button onClick={upOrDown} className="dropbtn">{header}</button>
            <div className={open ? "dropdown-content": "dropdown-content-hidden"}>
                <div className="dropdown-option" onClick={handleClick(1)}>Dark</div>
                <div className="dropdown-option" onClick={handleClick(2)}>Light</div>
            </div>
        </div>
    )
}
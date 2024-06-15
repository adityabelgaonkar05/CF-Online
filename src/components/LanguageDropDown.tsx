import { useState } from "react";
import "../styles/LanguageDropDown.scss";

interface LanguageDropDownProps {
    setFileName: (fileName: string) => void;
}

export default function LanguageDropDown({ setFileName }: LanguageDropDownProps) {
    const [header, setHeader] = useState<string>("C++");
    const [open, setOpen] = useState<boolean>(false);

    function upOrDown() {
        setOpen(!open);
    }

    function handleClick(number: number) {
        return () => {
            setOpen(!open);

            if (number === 1) {
                setHeader("C++");
                setFileName("script.cpp");
            } else if (number === 2) {
                setHeader("Java");
                setFileName("script.java");
            } else {
                setHeader("Python");
                setFileName("script.py");
            }
        }
    }

    return (
        <div className="dropdown">
            <button onClick={upOrDown} className="dropbtn">{header}</button>
            <div className={open ? "dropdown-content": "dropdown-content-hidden"}>
                <div className="dropdown-option" onClick={handleClick(1)}>C++</div>
                <div className="dropdown-option" onClick={handleClick(2)}>Java</div>
                <div className="dropdown-option" onClick={handleClick(3)}>Python</div>
            </div>
        </div>
    )
}
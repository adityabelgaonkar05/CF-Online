import LanguageDropDown from "./LanguageDropDown"
import ThemesDropDown from "./ThemesDropDown"
import "../styles/Options.scss"

interface OptionsProps {
    setFileName: (fileName: string) => void;
    setTheme: (theme: string) => void;
    setClickCompile: (clickCompile: boolean) => void;
}

export default function Options({ setFileName, setTheme, setClickCompile }: OptionsProps) {
    function setCompile() {
        setClickCompile(true);
    }    

    return (
        <div className="options-container">
            <LanguageDropDown setFileName={setFileName}/>
            <ThemesDropDown setTheme={setTheme} />
            <button onClick={setCompile} className="dropbtn">Compile</button>
        </div>
    )
}
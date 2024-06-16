import LanguageDropDown from "./LanguageDropDown"
import ThemesDropDown from "./ThemesDropDown"
import "../styles/Options.scss"

interface OptionsProps {
    setFileName: (fileName: string) => void;
    setTheme: (theme: string) => void;
}

export default function Options({ setFileName, setTheme }: OptionsProps) {
    return (
        <div className="options-container">
            <LanguageDropDown setFileName={setFileName}/>
            <ThemesDropDown setTheme={setTheme} />
        </div>
    )
}
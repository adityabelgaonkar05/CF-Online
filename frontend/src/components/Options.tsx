import LanguageDropDown from "./LanguageDropDown"
import ThemesDropDown from "./ThemesDropDown"
import "../styles/Options.scss"

export default function Options() {
    return (
        <div className="options-container">
            <LanguageDropDown />
            <ThemesDropDown />
        </div>
    )
}
import { useState } from 'react';
import styles from './dropdown.module.css'
import { filterListProps } from '../Searchbar/searchBar';


export type InputSearchProps = {
    category: keyof filterListProps
    options: string[],
    updateValue: (catergory: keyof filterListProps, selectedValue: any[]) => void
}

export const Dropdown: React.FC<InputSearchProps> = ({category, options, updateValue}) => {

    const [isActive, setIsActive] = useState(false)
    const [selectedValue, setSelectedValue] = useState<any[]>([])

    // * selected option
    const handleOption = (value: string) => {
        let tempValue = selectedValue
        tempValue = [value]
        setSelectedValue(tempValue)
        updateValue(category, tempValue)
    }


    // * for open and close list of options
    const handleToggleDropdown = () => {
        setIsActive(!isActive);
    }

    return (
        <div id="dropdown" 
        className={`${styles.dropdown} ${isActive ? styles.active : styles.inactive}`}>
            <input
            id="selectedText"
            className={styles.currentDisplay} 
            type="text" 
            value={selectedValue.length === 0? 'Select ' + category :selectedValue[0]}
            onClick={handleToggleDropdown} 
            readOnly></input>
            <div className={styles.options}>
                {options.map((option) => {
                    return <div key={option} onClick={() => handleOption(option)}>
                        {option}
                    </div>
                })}
            </div>
        </div>
    )
}
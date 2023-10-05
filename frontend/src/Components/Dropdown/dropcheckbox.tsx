import { useState } from 'react';
import styles from './dropdown.module.css'
import { InputSearchProps } from './dropdown';

export const DropCheckbox: React.FC<InputSearchProps> = ({category, options, updateValue}) => {

    const [isActive, setIsActive] = useState(false)
    const [selectedValue, setSelectedValue] = useState<any[]>([])
    const [selectedNumber, setSelectedNumber] = useState<Number>(0)


    // * for open and close list of options
    const handleToggleDropdown = () => {
        setIsActive(!isActive);
    }

    // * selected option
    const handleOption = (value: string) => {

        let checkbox = document.getElementById(
            'check-' + value 
        ) as HTMLInputElement

        let tempValue = selectedValue
        if (checkbox.checked) {
                tempValue = [...tempValue, value]
        } else {
            tempValue= tempValue.filter((option) => option !== value)
        }
        setSelectedValue(tempValue)
        setSelectedNumber(tempValue.length)
        updateValue(category, tempValue)
    }



    return (
        <div id="dropdown" 
        className={`${styles.dropdown} ${isActive ? styles.active : styles.inactive}`}>
            <input
            className={styles.currentDisplay} 
            type="text" 
            value={selectedNumber === 0? `Select ${category}`  
            :selectedNumber + " selected"}
            onClick={handleToggleDropdown} 
            readOnly></input>
            {options != undefined && <div className={styles.options}>
            {options.map((option) => {
                const key = category + "-" + option
                return (
                    
                <div key={key} className={styles.checkboxWrapper}>
                <input
                    type='checkbox'
                    id={'check-' + option}
                    onChange={() => handleOption(option)}
                />
                {/* // ! option of dropdown */}
                <label>{option}</label>
                </div>
                )
                })}
            </div>}
        </div>
    )
}
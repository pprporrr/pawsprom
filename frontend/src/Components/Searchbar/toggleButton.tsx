import { useState } from 'react'
import styles from './toggleButton.module.css'

type ToggleButtonProps = {
    selectType: (toggle: boolean) => void
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({selectType}) => {
    const [toggle, setToggle] = useState(true)

    const toggleType = () => {
        setToggle(!toggle)
        selectType(!toggle)
    }

    return (
        <div className={styles.switchDeco}>
            <label className={styles.switch}>
                <input type='checkbox' onClick={toggleType}></input>
                <span className={styles.sliderRound}></span>
                <span className={styles.paw}></span>
                <span className={styles.labels} data-left="Pets" data-right="Shelters"></span>
            </label>
        </div>
    )
}
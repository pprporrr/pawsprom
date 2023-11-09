import styles from './rangeInput.module.css'
import { useEffect, useState } from 'react'
import { SelectedFilter } from '../../newSearch/newFilter'

type InputRangeProps = {
    category: keyof SelectedFilter
    options: number[] | undefined,
    updateValue: (category: keyof SelectedFilter, selectedValue: any[]) => Promise<void>
}

export const RangeInput: React.FC<InputRangeProps> = (
    {category, options, updateValue}) => {
        const [range, setRange] = useState<any[]>([])
        const [textDisplay, setTextDisplay] = useState('')

        const handleChange = (event: any) => {
            const target = event.target as HTMLInputElement;
            console.log(target.value)
            let tempRange = range

            if ((target.id).includes('From')) {
                tempRange[0] = Number(target.value)
            } else {
                tempRange[1] = Number(target.value)
            }
            setRange(tempRange)  
            updateValue(category, range) 
        }

        useEffect(() => {
            if (category === 'ageRange') {
                setTextDisplay('Age')
            } else {
                setTextDisplay('Weight')
            }

            if (options !== undefined) {
                setRange(options)
            }
        }, [])


        return (
            <div>
                <p>{textDisplay}</p>
            <div className={styles.rangeWrapper}>
                <div className={styles.InputWrapper}>
                    <p>From</p>
                    <input 
                    type='number'
                    id={category + 'From'}
                    onChange={handleChange}
                    value={range.length >= 1 
                    && range[0] !== 0
                    && range[0] !== 100
                    ? range[0].toString() : ''}
                    ></input>
                </div>
                <div className={styles.InputWrapper}>
                <p>To</p>
                    <input
                    id={category + 'To'} 
                    type='number'
                    onChange={handleChange}
                    value={range.length >= 2 
                    && range[1] !== 0
                    && range[1] !== 100
                    ? range[1].toString() : ''}
                    ></input>
                </div>
            </div>
            </div>
        )
    }
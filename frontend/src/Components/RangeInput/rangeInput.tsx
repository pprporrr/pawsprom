import styles from './rangeInput.module.css'
import { InputSearchProps } from '../Dropdown/dropdown'
import { useEffect, useState } from 'react'
import { filterListProps } from '../Searchbar/searchBar'

type InputRangeProps = {
    category: keyof filterListProps
    options: number[],
    updateValue: (catergory: keyof filterListProps, selectedValue: any[]) => void
}

export const RangeInput: React.FC<InputRangeProps> = (
    {category, options, updateValue}) => {
        const [range, setRange] = useState<Number[]>(options)
        const [textDisplay, setTextDisplay] = useState('')

        const handleChange = (event) => {
            const target = event.target as HTMLInputElement;
            console.log(target.value)
            let tempRange = range

            if ((target.id).includes('From')) {
                tempRange[0] = Number(target.value)
            } else {
                tempRange[1] = Number(target.value)
            }
            setRange(tempRange)
            
            // updateValue(category, range)
        }

        useEffect(() => {
            if (category === 'ageRange') {
                setTextDisplay('Age')
            } else {
                setTextDisplay('Weight')
            }
        }, [])


        return (
            <div className={styles.rangeWrapper}>
                <p>{textDisplay}</p>
                <div className={styles.InputWrapper}>
                    <p>From</p>
                    <input 
                    type='number'
                    id={category + 'From'}
                    onChange={handleChange}
                    // value={range.length >= 1 ? range[0].toString() : ''}
                    ></input>
                </div>
                <div className={styles.InputWrapper}>
                <p>To</p>
                    <input
                    id={category + 'To'} 
                    type='number'
                    onChange={handleChange}
                    // value={range.length >= 2 ? range[1].toString() : ''}
                    ></input>
                </div>
            </div>
        )
    }
import styles from './newMoreFilter.module.css'
import { useEffect, useState } from 'react'
import { NewDropDown } from '../Dropdown/newDropdown'
import { RangeInput } from '../RangeInput/rangeInput'
import { SelectedFilter } from './newFilter'

type MoreFilterProps = {
    onConfirm: () => void
    color: { value: string, label: string } []
    handleSelectsOption: (category: keyof SelectedFilter, selectedValue: string[]) => Promise<void>
    handleSelectsRange: (category: keyof SelectedFilter, selectedValue: any[]) => Promise<void>
    selectedOptions: SelectedFilter | undefined 
}

export const NewMoreFilter: React.FC<MoreFilterProps> = (
    {onConfirm, handleSelectsOption, handleSelectsRange, 
        color, selectedOptions}) => {
            

    return (
        <div className={styles.modalbackground}>
            <div className={styles.modalcontent}>
                <h1>More Filter</h1>
                <div className={styles.dropWrapper}>
                <NewDropDown
                currentOption={selectedOptions? 
                selectedOptions['color']: []}
                category={"color"}
                options={color}
                handleSelect={handleSelectsOption}/>
                <RangeInput
                category='ageRange'
                options={selectedOptions? 
                selectedOptions['ageRange']: []}
                updateValue={handleSelectsRange}
                ></RangeInput>
                <RangeInput
                category='weight'
                options={selectedOptions? 
                selectedOptions['weight']: []}
                updateValue={handleSelectsRange}
                ></RangeInput>
                </div>
                <div className={styles.buttonWrapper}>
                    <button onClick={onConfirm}>confirm</button>
                </div>
            </div>
        </div>
    )
}
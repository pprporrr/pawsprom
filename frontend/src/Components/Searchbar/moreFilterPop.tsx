import styles from './moreFilterPop.module.css'
import { DropCheckbox } from '../Dropdown/dropcheckbox'
import { filterProps } from './searchBar'
import { useEffect, useState } from 'react'
import { filterListProps } from './searchBar'
import { RangeInput } from '../RangeInput/rangeInput'

type MorePopProps = {
    handleSelects: (catergory: keyof filterListProps, selectedValue: any[]) => void
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
    colorList: string[]
    ageRange: number[]
    // weightList: Number[]
}

export const MorePop: React.FC<MorePopProps> = (
    {isOpen, onCancel, onConfirm, handleSelects, 
        colorList, ageRange}) => {

    if (!isOpen) {
        return null
    }

    console.log('check color',colorList)

    return (
        <div className={styles.modalbackground}>
            <div className={styles.modalcontent}>
                <h1>More Filter</h1>
                <div className={styles.dropWrapper}>
                    <DropCheckbox category='color' 
                    options={colorList} 
                    updateValue={handleSelects}/>
                    <DropCheckbox category='gender' 
                    options={['Male', 'Female']} 
                    updateValue={handleSelects}/>
                <RangeInput
                category='ageRange'
                options={ageRange}
                updateValue={handleSelects}
                ></RangeInput>
                <RangeInput
                category='weightRange'
                options={ageRange}
                updateValue={handleSelects}
                ></RangeInput>
                </div>
                <div className={styles.buttonWrapper}>
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}
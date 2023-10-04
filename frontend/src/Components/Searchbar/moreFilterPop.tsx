import styles from './moreFilterPop.module.css'
import { DropCheckbox } from '../Dropdown/dropcheckbox'
import { filterProps } from './searchBar'
import { useEffect, useState } from 'react'
import { filterListProps } from './searchBar'

type MorePopProps = {
    handleSelects: (catergory: keyof filterListProps, selectedValue: any[]) => void
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
    colorList: string[]
    // ageList: Number[]
    // weightList: Number[]
}

export const MorePop: React.FC<MorePopProps> = (
    {isOpen, onCancel, onConfirm, handleSelects, colorList}) => {

    if (!isOpen) {
        return null
    }

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
                    {/* <DropCheckbox category='breed' 
                    options={['hello', 'eat']} 
                    updateValue={handleSelects}/>
                    <DropCheckbox category='breed' 
                    options={['hello', 'eat']} 
                    updateValue={handleSelects}/> */}
                    <DropCheckbox category='breed' 
                    options={['hello', 'eat']} 
                    updateValue={handleSelects}/>
                </div>
                <div className={styles.buttonWrapper}>
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}
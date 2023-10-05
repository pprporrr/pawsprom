import { useState } from "react"
import styles from './moreFilterButton.module.css'
import { MorePop } from "./moreFilterPop"
import { filterProps } from "./searchBar"
import { filterListProps } from "./searchBar"

type MoreFilterButtonProps = {
    handleSelects: (catergory: keyof filterListProps, selectedValue: any[]) => void
    onClick: () => void,
    colorList: string[]
    ageRange:number[]
    // weightList: Number[]
}

export const MoreFilterButton: React.FC<MoreFilterButtonProps> = (
    {onClick, handleSelects, colorList, ageRange}) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    //* when click more button
    const handleClick = () => {
        // open pop up
        setIsConfirmOpen(true)
    }

    //* when click more delete
    const handleCancel = () => {
        // close pop up
        setIsConfirmOpen(false)
    }

    const handleConfirm = () => {
        onClick()
        setIsConfirmOpen(false)
    }

    
    return (
        <div>
        <button 
        className={styles.moreButton}
        onClick={handleClick}>
            <p>More Filter</p>
            <img src="age-symbol.svg"></img>
        </button>
        <MorePop
        handleSelects={handleSelects} 
        isOpen={isConfirmOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        colorList={colorList}
        ageRange={ageRange}
        ></MorePop>
        </div>
    )
}
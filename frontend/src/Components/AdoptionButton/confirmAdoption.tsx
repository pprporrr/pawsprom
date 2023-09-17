import React, { useEffect, useState } from 'react';
import styles from './confirmAdoption.module.css'

interface ConfirmAdoptionProps {
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
    isLoading: boolean
    resultText: string

}

export const ConfirmAdoption: React.FC<ConfirmAdoptionProps> = ({ 
    isOpen, onCancel, onConfirm, isLoading, resultText}) => {

    if (!isOpen) {
        // Don't render the dialog if it's not open
        return null
    }

    return (

    <div className={styles.modalbackground}>
        <div className={styles.modalcontent}>
            {/* //! display loading */}
            {isLoading && resultText === "" && (
                <p className={styles.loadingText}>Loading...</p>
            )}
            {/* //! display confirmation */}
            {!isLoading && resultText === "" && (
            <div>
                <p>Are you sure you want to apply adoption application?</p>
                <button className={styles.buttonCancel}onClick={onCancel}>Cancel</button>
                <button className={styles.buttonAdopt}onClick={onConfirm}>Adopt</button>
            </div>
            )}
            {/* // ! display success or failed */}
            {resultText != "" &&
            <div>
                <p>{resultText}</p>
            </div>
            }
        </div>
    </div>
    )
}


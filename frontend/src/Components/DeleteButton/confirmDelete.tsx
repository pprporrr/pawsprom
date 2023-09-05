import React, { useEffect, useState } from 'react';
import styles from './confirmDelete.module.css'

interface ConfirmDeleteProps {
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
    isLoading: boolean
    resultText: string

}

export const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ 
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
                <p>Loading...</p>
            )}
            {/* //! display confirmation */}
            {!isLoading && resultText === "" && (
            <div>
                <p>Are you sure you want to delete?</p>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Delete</button>
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


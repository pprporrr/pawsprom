import React, { useEffect, useState } from 'react';
import styles from './confirmDelete.module.css'

interface ConfirmDeleteProps {
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
    isLoading: boolean
    apiResponse: boolean | null
    resultText: string

}

export const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ 
    isOpen, onCancel, onConfirm, isLoading, apiResponse, resultText}) => {

    if (!isOpen) {
        return null // Don't render the dialog if it's not open
    }


    return (

    <div className={styles.modalbackground}>
        <div className={styles.modalcontent}>
            {isLoading && resultText === "" && (
                <p>Loading...</p>
            )}
            {!isLoading && resultText === "" && (
            <div>
                <p>Are you sure you want to delete?</p>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Delete</button>
            </div>
            )}
            {resultText != "" &&
            <div>
                <p>{resultText}</p>
            </div>
            }
        </div>
    </div>
    )
}


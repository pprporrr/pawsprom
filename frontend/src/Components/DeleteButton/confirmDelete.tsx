
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
        <div className={styles.boxDeco}>
        <div className={styles.modalcontent}>
            {/* //! display loading */}
            {isLoading && resultText === "" && (
                <p className={styles.loadingText}>Loading...</p>
            )}
            {/* //! display confirmation */}
            {!isLoading && resultText === "" && (
            <div>
                <h3>Are you sure you want to delete?</h3>
                <button className= {styles.buttonCancel} onClick={onCancel}>Cancel</button>
                <button className={styles.buttonDelete} onClick={onConfirm}>Delete</button>
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
    </div>
    )
}


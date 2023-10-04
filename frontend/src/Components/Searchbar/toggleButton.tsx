import styles from './toggleButton.module.css'

export const ToggleButton = () => {

    return (
        <div className={styles.switchDeco}>
            <label className={styles.switch}>
                <input type='checkbox'></input>
                <span className={styles.sliderRound}></span>
                <span className={styles.paw}></span>
                <span className={styles.labels} data-left="Pets" data-right="Shelters"></span>
            </label>
        </div>
    )
}
import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'

export const Home = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/search")
    }

    return (
    <div className={styles.bgContainer}>
    <section id='homeHead'className={styles.homeHead}>
        <div className={styles.headerImage}>
        <h1 className={styles.headerText}>
            Every wag, purr, and cuddle is 
            a reminder of the difference 
            adoption makes</h1>
        </div>
    </section>
    <section>
    <div className={styles.homeSearch}>
        <button className={styles.searchButton}
        onClick={handleClick}>
        Find your paw-some
        buddy right here!</button>
    </div>
    </section>
    </div>
    )
}
import styles from './iconText.module.css'
import { SpeciesSymbol } from '../../assets/Icons/Pets/speciesSymbol'

interface IconTextProps {
    text: string | number | null
}

export const IconText: React.FC<IconTextProps> = ({text}) => {


    return (
        <div className={styles.iconTextWrapper}>
            <div className={styles.symbol}>
            <SpeciesSymbol></SpeciesSymbol>
            </div>
            {text}
        </div>
    )
}
import styles from './iconText.module.css'
import { SpeciesSymbol } from '../../assets/Icons/Pets/speciesSymbol'
import { EditPetSymbol } from '../../../public/editPetSymbol'
import { LoveChildrenSymbol } from '../../assets/Icons/Features/loveChildrenSymbol'

interface IconTextProps {
    text: string | number | Date | null
    fontSize: number
}

export const IconText: React.FC<IconTextProps> = ({text, fontSize}) => {


    return (
        <div className={styles.iconTextWrapper}>
            <span className={styles.symbol}>

            </span>
            { text instanceof Date ? <span style={{ fontSize: `${fontSize}rem`}}>{text.toLocaleDateString('en-GB', 
                    { day: '2-digit', month: 'short', year: 'numeric' })
                    .split(' ').join('-')}</span> : 
            <span style={{ fontSize: `${fontSize}rem`}}>{text}</span>}
        </div>
    )
}
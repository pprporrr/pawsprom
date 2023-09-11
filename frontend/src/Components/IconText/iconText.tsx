import styles from './iconText.module.css'

interface IconTextProps {
    text: string | number | Date | null
    fontSize: number
    svgName: string
}

export const IconText: React.FC<IconTextProps> = ({text, fontSize, svgName}) => {

    //* recieve 'text' for display text (can be Date Object)
    //* 'fontSize' = fontsize in rem (1 rem=16px)
    //* 'isVisible' to display component or not (not display some feature)

    //TODO: make svg as an icon/ image as icon

    return (
        <div className={styles.iconTextWrapper}>
            <span className={styles.symbol}>
            {/* //! check if 'Date' Object then display in different format else normal text*/}
            <object data={svgName} className={styles.svgDeco}></object>
            </span>
            { text instanceof Date ? <span style={{ fontSize: `${fontSize}rem`}}>{text.toLocaleDateString('en-GB', 
                { day: '2-digit', month: 'short', year: 'numeric' })
                .split(' ').join('-')}</span> : 
            <span className={styles.textDeco} style={{ fontSize: `${fontSize}rem`}}>{text}</span>}
        </div>
    )
}
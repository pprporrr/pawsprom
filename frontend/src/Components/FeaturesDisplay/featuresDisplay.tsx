import styles from "./featuresDisplay.module.css"
import { IconText } from "../IconText/iconText"

interface FeaturesProps {
    features:  {
        [key:string]: boolean | null
    }
}


export const Features: React.FC<FeaturesProps> = ({features}) => {

    //* receive 'features' then map it and display according to the the value

    //TODO: change from key (ex. feature1) ==> text
    
    return (
        <div className={styles.featuresWrapper}>
            {Object.entries(features).map(([feature, value]) => {
                if (value !== null){
                return <IconText key={feature} text={feature} 
                fontSize={1} isVisible={value}></IconText>
                }
            })}
        </div>
    )
}



import styles from "./featuresDisplay.module.css"
import { IconText } from "../IconText/iconText"

interface FeaturesProps {
    features:  {
        [key:string]: boolean | null
    }
}


export const Features: React.FC<FeaturesProps> = ({features}) => {

    const featuresList = [
        "Can live with children of any age",
        "Can live with other dogs",
        "Can live with other cats",
        "Shots up to date",
        "Microchipped",
        "House-trained",
        "Purebred",
        "Special Needs",
        "Behavioral Issues",
        "Neutered",
        "Handicap",
    ]

    //* receive 'features' then map it and display according to the the value

    //TODO: change from key (ex. feature1) ==> text
    
    return (
        <div className={styles.featuresWrapper}>
            {Object.entries(features).map(([feature, value], index) => {
                if (value !== null){
                return <IconText key={feature} text={featuresList[index]} 
                fontSize={1} isVisible={value}></IconText>
                }
            })}
        </div>
    )
}



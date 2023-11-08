import styles from "./featuresDisplay.module.css"
import { IconText } from "../IconText/iconText"

type FeaturesProps = {
    features:  {
        [key:string]: boolean
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

    const featuresImg = [
        "feature1-symbol.svg",
        "feature2-symbol.svg",
        "feature3-symbol.svg",
        "feature4-symbol.svg",
        "feature5-symbol.svg",
        "feature6-symbol.svg",
        "feature7-symbol.svg",
        "feature8-symbol.svg",
        "feature9-symbol.svg",
        "feature10-symbol.svg"
    ]

    //* receive 'features' then map it and display according to the the value

    //TODO: change from key (ex. feature1) ==> text
    
    return (
        <div className={styles.featuresWrapper}>
            {Object.entries(features).map(([feature, value], index) => {
                if (value === true){
                return <IconText key={feature}
                text={featuresList[index]}
                fontSize={1}
                svgName={featuresImg[index]} ></IconText>
                }
            })}
        </div>
    )
}



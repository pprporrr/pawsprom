import styles from "./featuresDisplay.module.css"
import { IconText } from "../IconText/iconText"

interface FeaturesProps {
    features:  {
        feature1: boolean,
				feature2: boolean,
				feature3: boolean,
				feature4: boolean,
				feature5: boolean,
				feature6: boolean,
				feature7: boolean,
				feature8: boolean,
				feature9: boolean,
				feature10: boolean,
    }
}


export const Features: React.FC<FeaturesProps> = ({features}) => {

    //* receive 'features' then map it and display according to the the value

    //TODO: change from key (ex. feature1) ==> text
    
    return (
        <div className={styles.featuresWrapper}>
            {Object.entries(features).map(([feature, value]) => {
                return <IconText key={feature} text={feature} 
                fontSize={0.75} isVisible={value}></IconText>
            })}
        </div>
    )
}



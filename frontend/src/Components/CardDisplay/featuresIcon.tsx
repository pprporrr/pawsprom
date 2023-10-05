
import styles from './featuresIcon.module.css'

type FeatureIconProps = {
    features: {
        feature1: boolean
        feature2: boolean
        feature3:boolean
        feature4: boolean
        feature5: boolean
        feature6: boolean
        feature7: boolean
        feature8: boolean
        feature9: boolean
        feature10: boolean
    }
}

export const FeaturesIcon: React.FC<FeatureIconProps> = ({features}) => {
    const featuresSvg = [
        'feature1-symbol.svg',
        'feature2-symbol.svg',
        'feature3-symbol.svg',
        'feature4-symbol.svg',
        'feature5-symbol.svg',
        'feature6-symbol.svg',
        'feature7-symbol.svg',
        'feature8-symbol.svg',
        'feature9-symbol.svg',
        'feature10-symbol.svg',
        'feature11-symbol.svg',
    ]


    return (
        <div className={styles.featureDeco}>
        {Object.values(features).map((value, index) => {
            if (value == true){
            return <img key={index} src={featuresSvg[index]}></img>
        }
        })}  
        </div>
    )
}
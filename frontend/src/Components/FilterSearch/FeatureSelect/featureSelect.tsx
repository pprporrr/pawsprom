import { Features } from '../../FeaturesDisplay/featuresDisplay'
import { IconText } from '../../IconText/iconText'
import { SelectedFilter } from '../../newSearch/newFilter'
import styles from './featureSelect.module.css'

// React.FC<InputRangeProps>

export type FeaturesProps = {
    features:  {
        [key:string]: boolean
    } | undefined
    updateValue: (category: keyof SelectedFilter, selectedValue: any) => Promise<void>
}
export const FeatureSelect: React.FC<FeaturesProps> = ({features, updateValue}) => {

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
        "feature10-symbol.svg",
        "feature11-symbol.svg"
    ]


    const handleCheck = (event: any, feature: string) => {
        const target = event.target as HTMLInputElement;
        console.log(target.checked)
        if (features !== undefined) {
            features[feature] = target.checked
            updateValue('features', features)
        }
    }

    return (
        <div>
            <p>Features</p>
            <div className={styles.featuresWrapper}>
            <div>
            {features !== undefined &&
            Object.entries(features).map(([feature, value], index) => {
                if (index <= 5){
                return  <div key={feature} className={styles.flexFeature}>
                <label className={styles.featureBox} >
                <input className={styles.checkBox}
                type='checkbox'
                defaultChecked={value}
                onChange={(event) => handleCheck(event, feature)}/>
                <span className={styles.checkmark}></span>
                </label> 
                <IconText
                text={featuresList[index]}
                fontSize={1}
                svgName={featuresImg[index]} ></IconText>
                </div>
                } })}
            </div>
            <div>
            {features !== undefined &&
            Object.entries(features).map(([feature, value], index) => {
                if (index > 5){
                return <div key={feature} className={styles.flexFeature}>
                <label className={styles.featureBox}>
                    <input className={styles.checkBox}
                    defaultChecked={value}
                    type='checkbox'/>
                    <span className={styles.checkmark}></span>
                </label>
                <IconText
                text={featuresList[index]}
                fontSize={1}
                svgName={featuresImg[index]} ></IconText>
                </div>
                } })}
            </div>
            </div>
        </div>
    )
}
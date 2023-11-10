import { IconText } from '../IconText/iconText'
import styles from './FeaturesPet.module.css'

export const FeaturesPet = () => {


  return (
    <section className={styles.features_con}>
      <p>Features</p>
      <div className={styles.flex_seperate}>
        <label
        htmlFor="feature1" >
        <IconText
        text='Can live with children of any age'
        fontSize={1}
        svgName='feature1-symbol.svg'/>
        </label>
        <input
        type="checkbox" id='feature1'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature2">
        <IconText
        text='Can live with other dogs'
        fontSize={1}
        svgName='feature2-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature2'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature3">
        <IconText
        text='Can live with other cats'
        fontSize={1}
        svgName='feature3-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature3'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature4">
        <IconText
        text='Shots up to date'
        fontSize={1}
        svgName='feature4-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature4'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature5">
        <IconText
        text='Microchipped'
        fontSize={1}
        svgName='feature5-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature5'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature6">
        <IconText
        text='House-trained'
        fontSize={1}
        svgName='feature6-symbol.svg'/>
          </label>
        <input type="checkbox" id='feature6'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature7">
        <IconText
        text='Purebred'
        fontSize={1}
        svgName='feature7-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature7'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature8">
        <IconText
        text='Special Needs'
        fontSize={1}
        svgName='feature8-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature8'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature9">
        <IconText
        text='Behavioral Issues'
        fontSize={1}
        svgName='feature9-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature9'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature10">
        <IconText
        text='Neutered'
        fontSize={1}
        svgName='feature10-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature10'/>
      </div>
      <div className={styles.flex_seperate}>
        <label htmlFor="feature11">
        <IconText
        text='Handicap'
        fontSize={1}
        svgName='feature11-symbol.svg'/>
        </label>
        <input type="checkbox" id='feature11'/>
      </div>
    </section>
  )
}

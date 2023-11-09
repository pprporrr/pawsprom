import styles from './newMoreFilter.module.css'
import { useEffect, useState } from 'react'
import { NewDropDown } from '../FilterSearch/Dropdown/newDropdown'
import { RangeInput } from '../FilterSearch/RangeInput/rangeInput'
import { SelectedFilter } from './newFilter'
import { FeatureSelect } from '../FilterSearch/FeatureSelect/featureSelect'

type MoreFilterProps = {
	onConfirm: () => void
	color: { value: string, label: string } []
    features: { [key:string]: boolean } | undefined
	handleSelectsOption: (category: keyof SelectedFilter, selectedValue: string[]) => Promise<void>
	handleSelectsRange: (category: keyof SelectedFilter, selectedValue: any[]) => Promise<void>
	handleFeatures: (category: keyof SelectedFilter, selectedValue: any) => Promise<void>
    selectedOptions: SelectedFilter | undefined 
}

export const NewMoreFilter: React.FC<MoreFilterProps> = (
	{onConfirm, handleSelectsOption, handleSelectsRange, 
		handleFeatures, color, selectedOptions, features}) => {

	return (
		<div className={styles.modalbackground}>
			<div className={styles.modalcontent}>
            <div className={styles.buttonWrapper}>
				<button 
                className={styles.buttonClose}
                onClick={onConfirm}>
                </button>
			</div>
            <h1>More Filter</h1>
            <div className={styles.dropWrapper}>
            <NewDropDown
                currentOption={selectedOptions !== undefined
                && selectedOptions['color']? 
                selectedOptions['color']: []}
                category={"color"}
                options={color}
                handleSelect={handleSelectsOption}/>
            <RangeInput
                category='ageRange'
                options={selectedOptions !== undefined
                && selectedOptions['ageRange']?
                selectedOptions['ageRange']: [0, 100]}
                updateValue={handleSelectsRange}
            ></RangeInput>
            <RangeInput
                category='weight'
                options={selectedOptions !== undefined
                && selectedOptions['weight']? 
                selectedOptions['weight']: [0, 100]}
                updateValue={handleSelectsRange}
            ></RangeInput>
            <FeatureSelect
                updateValue={handleFeatures}
                features={features}
            ></FeatureSelect>
            </div>
			</div>
		</div>
	)
}
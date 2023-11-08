import { useEffect, useState } from "react";
import Select, { OptionProps, components } from "react-select";
import styles from './newDropdown.module.css'
import { SelectedFilter } from "../newSearch/newFilter";

type InputOptionProps = OptionProps<any> & {
    getStyles: any;
    // Icon: any;
};

const InputOption: React.FC<InputOptionProps> = ({
    getStyles,
    // Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
    }) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = styles.bg;
    if (isFocused) bg = styles.bgFocused;
    if (isActive) bg = styles.bgActive;

    // prop assignment
    const props = {
        ...innerProps,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
    };
    

    return (
        <components.Option
        className={bg}
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
        >
        <input 
        type="checkbox" 
        checked={isSelected} 
        onChange={() => {}}
        />
        {children}
        </components.Option>
    );
};

export type OptionsProps = {
    category: keyof SelectedFilter
    options: {
        value: string
        label: string
    }[]
    handleSelect: (category: keyof SelectedFilter, options: string[]) => void
    currentOption: string[] | undefined
}

export const NewDropDown: React.FC<OptionsProps> = (
    {options, category, currentOption, handleSelect}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [currentValue, setCurrentValue] = useState<any>(currentOption?.map((value: string) => ({
        label: value,
        value: value
    })))

    const handleSelectChange = (options: any) => {
        if (Array.isArray(options)) {
            setSelectedOptions(options.map(
                (option) => option.value))

            setCurrentValue(options.map((value: string) => ({
                    label: value,
                    value: value
            })))
        }

        handleSelect(category, options.map(
            (option: any) => option.value))
    }

    console.log(options)


    return (
    <div>
        <p>{category[0].toLocaleUpperCase() + category.slice(1)}</p>
        <Select
        defaultValue={currentValue}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}

        options={options}
        components={{Option: InputOption,}}
        onChange={handleSelectChange}
        />
    </div>
    )
}
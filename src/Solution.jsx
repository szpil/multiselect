import React, { useRef, useState } from 'react';
import useOnClickOutside from './useOnClickOutside';
import './app.css';

const options = ['option-1', 'option-2', 'option-3', 'option-4', 'option-5', 'option-6', 'option-7', 'option-8', 'option-9', 'option-10']

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchedOptions, setSearchedOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    useOnClickOutside(wrapperRef, () => setIsMenuOpen(false));

    const onInputChange = (event) => {
        const newSearchedOptions = options.filter((option) => option.includes(event.target.value));
        setSearchedOptions([...newSearchedOptions]);
        setIsMenuOpen(true);
    }

    const addOption = (option) => {
        const newSelectedOptions = selectedOptions;
        newSelectedOptions.push(option);
        setSelectedOptions([...newSelectedOptions]);
        inputRef.current.value = '';
        inputRef.current.focus();
    }

    const removeOption = (option) => {
        let newSelectedOptions = selectedOptions;
        newSelectedOptions = newSelectedOptions.filter((_option) => _option !== option);
        setSelectedOptions([...newSelectedOptions]);
        inputRef.current.focus();
    }

    const onClickOption = (option) => {
        let newSelectedOptions = selectedOptions;
        if (newSelectedOptions.includes(option)) {
            removeOption(option);
        } else {
            addOption(option);
        }
    }

    return (
        <div className='wrapper' ref={wrapperRef}>
            {selectedOptions.map((option, index) => (
                <div className='tag' key={index}>
                    <p>{option}</p>
                    <div className='x-button' onClick={() => removeOption(option)}></div>
                </div>
            ))}
            <input type='text' onChange={onInputChange} ref={inputRef} />
            {isMenuOpen &&
                <div className='options'>
                    {searchedOptions.map((option, index) => (
                        <div className='option' key={index} onClick={() => onClickOption(option)}>
                            <input className='cb' type='checkbox' checked={selectedOptions.includes(option)} />
                            <p>{option}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default App;
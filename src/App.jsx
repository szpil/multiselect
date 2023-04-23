import React, { useRef, useState } from 'react';
import useOnClickOutside from './useOnClickOutside';
import './app.css';

const options = ['option-1', 'option-2', 'option-3', 'option-4', 'option-5', 'option-6', 'option-7', 'option-8', 'option-9', 'option-10'];

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchedOptions, setSearchedOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    
    const onInputChange = (event) => {
        const searchText = event.target.value;
        setIsMenuOpen(true);
        setSearchedOptions(options.filter(option => option.includes(searchText)));
    }
    

    const removeOption = (option) => {
        setSelectedOptions(selectedOptions.filter(selectedOption => selectedOption !== option));
    }

    const onClickOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(selectedOption => selectedOption !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
        inputRef.current.value = '';
        setIsMenuOpen(false);
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
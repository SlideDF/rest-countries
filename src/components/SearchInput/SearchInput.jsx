import styled from 'styled-components'
import './SearchInput.css'
import { ThemeStyle } from '../../features/Theme/Theme'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchCountrie } from '../../features/Home/Home'

const Input = styled.input`
    ::placeholder {
        color: ${({ colorPlaceholder }) => colorPlaceholder}
    }
`

const SearchInput = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const { color, backgroundColorElement, boxShadow, colorElement, colorPlaceholder } = ThemeStyle()

    const searchCountries = (value) => {
        setInput(value)
        dispatch(searchCountrie(value))
    }
 
    return (
        <div className='search-input' style={{color: color, backgroundColor: backgroundColorElement, boxShadow: boxShadow}}>
            <ion-icon style={{fontSize: 20, color: colorElement}} name="search-outline"></ion-icon>
            <Input value={input} colorPlaceholder={colorPlaceholder} type="text" className='input-search' style={{color: color, backgroundColor: backgroundColorElement}} placeholder="Search for a country..." onChange={(e) => searchCountries(e.target.value)} />
        </div>
    )
}

export default SearchInput
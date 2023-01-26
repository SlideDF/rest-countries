import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchRegionCountries, fetchCountries } from '../../features/Home/Home'
import { ThemeStyle } from '../../features/Theme/Theme'
import './Select.css'

const Select = () => {
    const [input, setInput] = useState('Filter By Region')
    const [openSelect, setOpenSelect] = useState(false)
    const dispatch = useDispatch()

    const { color, backgroundColorElement, boxShadow, colorElement } = ThemeStyle()
    const regionList = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

    const selectRegion = (region) => {
        if(input === region) {
            setInput('Filter By Region')
            dispatch(fetchCountries)
        } else {   
            setInput(region)
            dispatch(fetchRegionCountries(region))
        }
    }

    return (
        <div className='select' style={{color: color, backgroundColor: backgroundColorElement, boxShadow: boxShadow}} onClick={() => setOpenSelect(openSelect ? false : true)}>
            <div className='select-region' style={{color: colorElement, backgroundColor: backgroundColorElement}}>
                <p>{input}</p>
                <ion-icon style={{color: colorElement}} name="chevron-down-outline"></ion-icon>
            </div>

            {openSelect ? (
                <div className='select-wrapper' style={{color: colorElement, backgroundColor: backgroundColorElement, boxShadow: boxShadow}}>
                    {regionList.map((region, index) => {
                        return (
                            <div key={index} className='region' style={{color: colorElement}} onClick={() => selectRegion(region)}>{region}</div>
                        )
                    })}
                </div>
            ) : null}

        </div>
    )
}

export default Select
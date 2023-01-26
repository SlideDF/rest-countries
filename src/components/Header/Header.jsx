import { useDispatch, useSelector } from 'react-redux'
import { ThemeStyle, toggle } from '../../features/Theme/Theme'
import { selectTheme } from '../../utils/selector'
import './Header.css'

const Header = () => {
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

    const { boxShadow, backgroundColorElement } = ThemeStyle()

    return (
        <header style={{boxShadow: boxShadow, backgroundColor: backgroundColorElement}}>
            <p className='title-header'>Where in the World ?</p>
            <div onClick={() => dispatch(toggle())}>
                {theme === 'light' ? (
                    <div className='theme'>
                        <ion-icon name="moon-outline" style={{fontSize: 16}} ></ion-icon>
                        <p>Dark Mode</p>
                    </div>
                ) : (
                    <div className='theme'>
                        <ion-icon name="moon" style={{fontSize: 16}}></ion-icon>
                        <p>Light Mode</p>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
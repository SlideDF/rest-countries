import { ThemeStyle } from '../../features/Theme/Theme'
import './BackButton.css'

const BackButton = () => {
    const { backgroundColorElement, boxShadow } = ThemeStyle()

    return (
        <div className='back-button' style={{backgroundColor: backgroundColorElement, boxShadow: boxShadow}} >
            <ion-icon name="arrow-back-outline" style={{fontSize: 18}}></ion-icon>
            <p >Back</p>
        </div>
    )
}

export default BackButton
import { ThemeStyle } from '../../features/Theme/Theme'
import './Loader.css'

const Loader = () => {
    const { color } = ThemeStyle()

    return (
        <div className="loader">
            <div style={{backgroundColor: color}}></div>
            <div style={{backgroundColor: color}}></div>
            <div style={{backgroundColor: color}}></div>
        </div>
    )
}

export default Loader
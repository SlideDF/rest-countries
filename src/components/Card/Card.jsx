import { ThemeStyle } from '../../features/Theme/Theme'
import './Card.css'

const Card = ({ countrie }) => {
    const { color, backgroundColorElement, colorElement, boxShadow } = ThemeStyle() 

    return (
        <div className='card' style={{color: color, backgroundColor: backgroundColorElement, boxShadow: boxShadow}}>
            <img className='flag' src={countrie.flags.png} alt="" />
            <div className='card-details'>
                <h2 className='name-countrie'>{countrie.translations.fra.common}</h2>

                <div className='details-wrapper'>
                    <div className='details-card'>
                        <p className='name-details'>Population:</p>
                        <p className='data-details' style={{color: colorElement}} >{new Intl.NumberFormat('de-DE').format(countrie.population)}</p>
                    </div>
                    <div className='details-card'>
                        <p className='name-details'>Region:</p>
                        <p className='data-details' style={{color: colorElement}} >{countrie.region}</p>
                    </div>
                    <div className='details-card'>
                        <p className='name-details'>Capital:</p>
                        <p className='data-details' style={{color: colorElement}} >{countrie.capital}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
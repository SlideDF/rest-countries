import './Info.css'
import Header from '../../components/Header/Header';
import { ThemeStyle } from '../../features/Theme/Theme';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import { selectInfo } from '../../utils/selector';
import { fetchCountrie } from '../../features/Info/Info';
import Loader from '../../components/Loader/Loader';

const Info = () => {
    const { color, backgroundColor, backgroundColorElement, boxShadow } = ThemeStyle()
    const { id: countrieCode } = useParams()

    const { countrie, status, nativeName, currencie, languages, borders } = useSelector(selectInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountrie(countrieCode))
    }, [countrieCode, dispatch])

    document.querySelector('body').style.backgroundColor = backgroundColor
    document.querySelector('body').style.color = color

    const isLoading = status === 'updating' || status === 'pending'

    return (
        <div className='info'>
            <Header />

            <main>
                <Link to={'/'} style={{textDecoration: 'none', color: color, display: 'flex', width: 'max-content'}}>
                    <BackButton />
                </Link>

                {isLoading ? (
                    <div className='loading'>
                        <Loader />
                    </div>
                ) : (
                    <div className='countrie-info'>
                        <img className='countrie-flag' src={countrie?.flags?.png} alt="" />

                        <div className='countrie-detail'>
                            <h1 className='countrie-name'>{countrie?.translations.fra.common}</h1>

                            <div className='details-content'>
                                <div className='details'>
                                    <p className='name-details'>Native Name:</p>
                                    <p className='data-details'>{nativeName}</p>
                                </div>
                                <div className='details'>
                                    <p className='name-details'>Population:</p>
                                    <p className='data-details'>{new Intl.NumberFormat('de-DE').format(countrie?.population)}</p>
                                </div>
                                <div className='details'>
                                    <p className='name-details'>Region:</p>
                                    <p className='data-details'>{countrie?.region}</p>
                                </div>
                                <div className='details'>
                                    <p className='name-details'>Sub Region:</p>
                                    <p className='data-details'>{countrie?.subregion}</p>
                                </div>
                                <div className='details'>
                                    <p className='name-details'>Capital:</p>
                                    <p className='data-details'>{countrie?.capital}</p>
                                </div>
                            </div>

                            <div className='details-content'>
                                <div className='details'>
                                    <p className='name-details'>Top Level Domain:</p>
                                    <p className='data-details'>{countrie?.tld}</p>
                                </div>
                                <div className='details'>
                                    <p className='name-details'>Currencies:</p>
                                    <p className='data-details'>{currencie}</p>
                                </div>
                                <div className='details'>
                                    <p className='name-details'>Languages:</p>
                                    <p className='data-details'>{languages}</p>
                                </div>
                            </div>

                            <div className='border-details'>
                                <p className='border-countrie'>Border Countries</p>
                                <div className='borders'>
                                    {borders.map((data, index) => {
                                        return (
                                            <Link key={index} to={`/${data.code}`} style={{textDecoration: 'none', color: color}}>
                                                <div className="border" style={{backgroundColor: backgroundColorElement, boxShadow: boxShadow}} >{data.name}</div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Info
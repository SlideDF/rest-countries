import './Home.css';
import Header from '../../components/Header/Header';
import SearchInput from '../../components/SearchInput/SearchInput';
import Select from '../../components/Select/Select';
import { ThemeStyle } from '../../features/Theme/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectHome } from '../../utils/selector';
import { useEffect } from 'react';
import { fetchCountries } from '../../features/Home/Home';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  const { countries } = useSelector(selectHome)
  const { color, backgroundColor } = ThemeStyle()
  const dispatch = useDispatch()

  document.querySelector('body').style.backgroundColor = backgroundColor
  document.querySelector('body').style.color = color

  useEffect(() => {
    dispatch(fetchCountries)
  }, [dispatch])

  return (
    <div className="home">
      <Header />
      <main>
        <div className='header-main'>
          <SearchInput />
          <Select />
        </div>

        <div className='countries-wrapper'>
          {countries.map((countrie, index) => {
            return (
              <Link key={`${index}-${countrie.name.common}`} to={`/rest-countries/${countrie.cca2}`} style={{textDecoration: 'none'}} >
                <Card countrie={countrie} />
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  );
}

export default Home

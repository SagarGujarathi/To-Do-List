import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell, faBars } from '@fortawesome/free-solid-svg-icons'
import '../css/SearchBar.css'
function SearchBar({ setSidebar }) {
    return (
        <div className="search-bar-container">
            <div className="search-bar-with-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" className='search-bar' placeholder='Search...' />
            </div>
            <div className="common-access">
                <FontAwesomeIcon icon={faBell} />
                <FontAwesomeIcon icon={faBars} onClick={() => setSidebar(prev => !prev)} />
            </div>
        </div>
    )
}

export default SearchBar
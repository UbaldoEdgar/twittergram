import {React, useState, useEffect }from 'react'
import axios from 'axios';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                //do twitter api fetch request
                const fetchData = async () => {
                    await axios.get('/api/search', {
                        params: {
                            user: searchTerm,
                        },
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => console.log(error.message))
                }
                fetchData();
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm])

    const handleSearch = (ev) => {
        setSearchTerm(ev.target.value);
    }
    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type='text' placeholder='enter twitter username...' onChange={handleSearch}/>
                <div className='searchButton'>
                    <p>Search</p>
                </div>
            </div>
            <div className='results'></div>

        </div>
    )
}

export default SearchBar
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Gallery from './components/gallery';
//import SearchBar from './components/searchBar';



function App() {

  const [gallery, setGallery] = useState([]);
  const [user, setUser] = useState({});
  const [twitterHandle, setTwitterHandle] = useState('');
  const [endOfPage, setEndOfPage] = useState(false);
  const [searchType, setSearchType] = useState('user');
  const developerMode = false;

  useEffect(()=> {

  }, [gallery]);
  
  const renderUsers = () => {
    if(searchType === 'list')
      return;
    if(Object.keys(user).length > 0){
      return (
        <div className='userProfile'>
          <img className='userProfileImg' src={user.profile_image_url} alt='profile_img' />
          <div className='userProfileStats'>
            <section className='userprofileName'>
              <p>{user.name}</p>
              <p>@{user.username}</p>
            </section>
            <section className='userFollowers'>
              <p>Followers: {user.public_metrics.followers_count}</p>
              <p>Following: {user.public_metrics.following_count}</p>
            </section>
          </div>
        </div>
      )
    }
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    setEndOfPage(false);

    const getTweets = () => {
      if(!twitterHandle || developerMode){
        return;
      }
      axios.get('/api/timeline', {
        params: {
          user: twitterHandle,
        },
      })
      .then(response => {
        const  newGallery = response.data.page._realData.includes.media;
        setGallery(newGallery);
        
        setUser(response.data.user.data);

      })
      .catch(error => console.log(error.message))
    }

    const getList = () => {
      if(!twitterHandle || developerMode)
        return;
      axios.get('/api/list', {
        params: {
          user: twitterHandle, //this is the list id in this case, we keep the same name
        },
      })
      .then(response => {
        //trying something new... set gallery here
        const  newGallery = response.data._realData.includes.media;
        setGallery(newGallery);
        setUser({twitterHandle:''})


      })
      .catch(error => console.log(error.message))

    }
    if(searchType === 'user')
      getTweets();
    if(searchType === 'list')
      getList();
    setTwitterHandle('');
  }

  const  fetchNextPage = async () =>{
  
        await axios.get('/api/nextpage')
        .then(response => {
          if(!response.data.error){
            //console.log('the next page response data', response.data);
            const newGallery = [...gallery, ...response.data.page._realData.includes.media];
            setGallery(newGallery);
          }
          else
            setEndOfPage(true);
        })
        .catch(error => console.log(error.message))
    }

  const fetchNextListPage = async () => {
      await axios.get('/api/listnextpage')
        .then(response => {
          if(!response.data.error){
            //console.log('the next page response data', response.data);
            const newGallery = [...gallery, ...response.data.page._realData.includes.media];
            setGallery(newGallery);
          }
          else
            setEndOfPage(true);
        })
        .catch(error => console.log(error.message))
  } 

  const renderMoreBtn = () => {

    const moreBtnClick = async () => {
      if(searchType === 'user')
        await fetchNextPage();
      if(searchType === 'list')
        await fetchNextListPage();
    }
    return (
      <div className='loadMore' onClick={moreBtnClick}>
        <p>Load More</p>
      </div>
    )
  }

  const softReset = () => {
    setGallery([]);
    setTwitterHandle('');
    setEndOfPage(false);
    setUser({});
  }

  const handleUserType = () => {
    if(searchType === 'user')
      return;
    setSearchType('user');
    softReset();
  }

  const handleListType = () => {
    if(searchType === 'list')
      return;
    setSearchType('list');
    softReset();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='titleName'>Twitter Gram+</h1>
        <div className='buttonSwitch'>
          <p style={{backgroundColor: searchType === 'user' ? '#454a55': '#282c34'}} className='button__user' onClick={handleUserType}>User</p>
          <p style={{backgroundColor: searchType === 'user' ? '#282c34':'#454a55'}} className='button__list' onClick={handleListType}>List</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name='user' value={twitterHandle} onChange={event => setTwitterHandle(event.target.value)} />
          <button type="submit">Search</button>
        </form>
        <div className="cellTags">
          {renderUsers()}
        </div> 
      </header>
      <section className='tweets'>
          <Gallery gallery={gallery} />
      </section>
      {(Object.keys(user).length > 0) && !endOfPage && renderMoreBtn()}
    </div>
  );
}

export default App;

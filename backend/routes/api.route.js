const router = require('express').Router();
const {TwitterApi} = require('twitter-api-v2');


const pages = {};
const listpages = {};

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_API_KEY,
  appSecret: process.env.TWITTER_CONSUMER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET
});

router.get('/timeline', async (req, res, next) => {
  try{
    //console.log(req.query.user);
    if(Object.keys(pages).length > 0)
      delete pages[Object.keys(pages)[0]];
    const user = req.query.user
    const foundUsers = await client.v2.userByUsername(user, {
      'tweet.fields':['id', 'text'], 'user.fields':['entities', 'profile_image_url', 'public_metrics'], 
    });
    //console.log('myuser', foundUsers);
    
    const userid = foundUsers.data.id;
    const homeTimeline = await client.v2.userTimeline(userid, {
      expansions: ['attachments.media_keys'], 'media.fields':['url'],
    });
    const timeLine = await homeTimeline.fetchLast(25);
    pages[user] = timeLine;

    res.send({'page':homeTimeline, 'user': foundUsers});
  } catch(error) {
      next(error);
  }
  
});

router.get('/nextpage', async (req, res, next) => {
  const user = Object.keys(pages)[0];
  try{
    //console.log(user);
    
    if(!pages[user].done){
      const timelinePage2 = await pages[user].next(25);
      pages[user] = timelinePage2;
      res.send({'page':timelinePage2, 'error': ''});
    }
    else
      res.send({'page':'', 'error': 'Done.'});
    
  } catch(error){
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try{
    const user = req.query.user;
    //console.log('does this work', user);

    const foundUsers = await client.v1.searchUsers('alki');
    res.send(foundUsers.users);
    
  } catch(error){
    next(error);
  }
});

router.get('/list', async (req, res, next) => {
  try{
    if(Object.keys(listpages).length > 0)
      delete listpages[Object.keys(listpages)[0]];
    const list = req.query.user;
    //console.log('does this work', list);

    const foundList = await client.v2.listTweets(list, {expansions: ['attachments.media_keys'], 'media.fields':['url']});
    const timeLine = await foundList.fetchLast(25);
    listpages[list] = timeLine;
    res.send(timeLine);
    
  } catch(error){
    next(error);
  }
});

router.get('/listnextpage', async (req, res, next) => {
  const list = Object.keys(listpages)[0];
  try{
    //console.log('does this work', list);

    if(!listpages[list].done){
      const timelinePage2 = await listpages[list].next(25);
      listpages[list] = timelinePage2;
      res.send({'page':timelinePage2, 'error': ''});
    }
    else
      res.send({'page':'', 'error': 'Done.'});
    
  } catch(error){
    next(error);
  }
});


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;

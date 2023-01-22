# Twittergram
A new way to browse tweets from specific users, focused on image content! 

![twitterGram_preview](https://user-images.githubusercontent.com/39749288/213898289-9ab355b0-0c03-4ba4-9222-cdc7eb1c1f45.png)

<h2>FEATURES</h2>

There are two options for viewing Tweets from twitter!

<b>Firstly</b>, you can pull tweet images using a user's twitter handle! This will display any images from their timeline (including retweets).

![user-search](https://user-images.githubusercontent.com/39749288/213898461-0d90430e-5ac8-4252-89a3-efc50e3ea39c.gif)

You are able to keep loading more tweets from their timeline until it reaches either the request limit set by twitter (this will take a while) or until there are no more tweets to pull from!

<b>Secondly</b>, you can pull tweets from a Twitter List using the id located in the url. Twitter Lists is a good idea but it does not have a media tab so if you are trying to browse a list of users and want to ignore non-media tweets, this will work well.

![list-search](https://user-images.githubusercontent.com/39749288/213898961-90fbbf5a-99e7-4198-b690-b65e52de661d.gif)

You can click on any image to inspect it closer (in a slideshow) and download any image as well!

![pop-up-modal](https://user-images.githubusercontent.com/39749288/213899771-068fec5f-6067-47ce-9fb2-2211de0730c9.gif)


<h2>HOW TO USE</h2>

To use this, you have to run the command  <b>npm install</b> in <b>BOTH</b> directories (twitlist/backend) to install the dependencies!

Then, you need to setup your Twitter Keys/Tokens (generate them here http://developer.twitter.com/) inside a .env file in the backend directory. Make it exactly as shown below!

![twitter-setup-keys](https://user-images.githubusercontent.com/39749288/213900842-89156d40-ade1-410f-a621-a992067699be.gif)

Finally, you want to run the server/backend and the twitlist app/frontend. Run the command <b>npm run dev</b> inside the backend directory and the command <b>npm start</b> inside the twitlist directory!

![twitter-startup](https://user-images.githubusercontent.com/39749288/213901320-a176eb95-9dd5-431b-8fce-77061489e58a.gif)

That should be it! Enjoy your browsing!

The backend/server was made using a template by express-draft from here https://www.npmjs.com/package/express-draft!

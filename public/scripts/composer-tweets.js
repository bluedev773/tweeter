
//Example tweets
const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": "10 days ago"
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": "11 days ago"
  }
]

//create tweet element
const createTweetElement = function (tweetObject) {
  const tweetElement = `<article>
    <header>
      <div class="avatar">
        <img src=${tweetObject.user.avatars}/>
        <p>${tweetObject.user.name}</p>
      </div>
      <p class="handle">${tweetObject.user.handle}</p>
    </header>
    <div class="content">
      <p>${tweetObject.content.text}</p>
    </div>
    <div class="line">
      <hr>
    </div>
    <footer>
      <p>${tweetObject.created_at}</p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      <div>
    </footer>
  </article>`;

  return tweetElement;
};

//render tweets to specified target
const renderTweetElements = function (target) {
  for(const tweetObj of tweets) {
    const newElement = createTweetElement(tweetObj);
    target.append(newElement);
  }
};


$(document).ready(function() {

  const tweetContainer = $(".tweets");

  renderTweetElements(tweetContainer);


  
});
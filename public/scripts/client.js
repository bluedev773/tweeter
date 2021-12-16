/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
    <footer>
      <p>${timeago.format(tweetObject.created_at, 'en_US')}</p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      <div>
    </footer>
  </article>`;

  return tweetElement;
};

//render tweets
const renderTweetElements = function (tweets) {
  for(const tweetObj of tweets) {
    const newElement = createTweetElement(tweetObj);
    $(".tweets").append(newElement);
  }
};


$(document).ready(function() {

  //load tweets from server and render to page
  const loadTweets = function(){
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .done(function(data){
      console.log(data);
      renderTweetElements(data);
    })
  }
  loadTweets();


  //handle form submission for new tweets
  $(function(){
    $('form').submit(function(event) {
      event.preventDefault();
  
      const fd = $('form').serialize();
      console.log($('#tweet-text').val().length);
      console.log(fd);
      let url = $('form').attr('action');
      console.log(url);
      
      //validate that tweet is more than 0 chars but less than or equal to 140 chars
      if($('#tweet-text').val().length > 140) {
        alert("tweet is greater than 140 characters!");
        return false;
      }
      if($('#tweet-text').val().length === 0) {
        alert("tweet is empty!");
        return false;
      }
  
      $.ajax({
        type: "POST",
        url: url,
        data: fd,
      })
      //empty and reload tweets when a new one is added
      .done(function(){
        $(".tweets").empty();
        loadTweets();
      });
    })
  });
  
});

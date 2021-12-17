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
  tweets.slice().reverse().forEach(function(tweetObj){
    const newElement = createTweetElement(tweetObj);
    $(".tweets").append(newElement);
  }) 
};


$(document).ready(function() {

  //expand text area when in focus
  $("textarea").focus(function(){
    $("textarea").attr("rows", 4);
  });

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

  //set focus on textarea when write new tweet button is pressed
  $(".navTweet").click(function(){
    $("#tweet-text").focus();
  });

  //handle form submission for new tweets
  $(function(){
    $('form').submit(function(event) {
      event.preventDefault();

      const fd = $('#tweet-text').serialize();
      let url = $('form').attr('action');
      console.log(fd);

      //validate that tweet is more than 0 chars but less than or equal to 140 chars
      if($('#tweet-text').val().length > 140) {
        $(".error").empty();
        $(`<i class="fas fa-exclamation-triangle"> Tweet exceeds character limit!</i>`).appendTo('.error');
        $(".error").slideDown().delay(1500).slideUp();
        return false;
      }
      if($('#tweet-text').val().length === 0) {
        $(".error").empty();
        $(`<i class="fas fa-exclamation-triangle"> Tweet is Empty!</i>`).appendTo('.error');
        $(".error").slideDown().delay(1500).slideUp();
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

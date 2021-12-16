
$(document).ready(function(){
  const textArea = $("#tweet-text");
  
  //keep track of character count in textArea
  textArea.on('input', function(event) {
    const counter = $(this).next().children('output');
    const maxLength = 140;
    const currentLength = $(this).val().length;
    let charLeft = maxLength - currentLength;

    //change color of counter to red if less than 0 chars
    $(counter).css("color", "");
    if(charLeft < 0) {
      $(counter).css("color", "red");
    } 
    $(counter).text(charLeft);
  });
}); 
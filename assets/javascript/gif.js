$ (document).ready(function() {
    var sports= ["Football", "Soccer", "Baseball", "Hockey", "Cricket", "Volleyball"];
function displayGifButtons(){
    $("#gifButtonsView").empty();
    for (var i= 0; i< sports.length; i++){
        var gifButton = $("<button>");
        gifButton.addclass("sports");
        gifButton.addclass("btn btn-primary")
        gifButton.attr("data-name", sport[i]);
    }
}

function addNewButton(){
$("addGif").on("click", function(){
    var sport = $("#sport-input").val().trim();
    if(action ==""){
        return false;
    }
    sports.push(sport);

    displayGifbuttons();
    return false;
    });

}
function removeLastButton(){
 $("removeGif").on ("click", function(){
sports.pop(sport);
  displayGifButtons();
   return false;
    });
}

function displayGifs(){
    var sport = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    $.ajax({
  url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

    var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
        
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
           
            $("#gifsView").prepend(gifDiv);
        }
    });
}
displayGifButtons(); 
addNewButton();
removeLastButton();

$(document).on("click", ".sport", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});

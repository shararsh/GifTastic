var animals = [];

function displayGif(){

$("button").on("click", function() {

        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })

            .done(function(response) {

                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $("<div class='animal'>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var animalImage = $("<img>");

                    animalImage.addClass("showImage")
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url)
                    animalImage.attr("data-animate", results[i].images.fixed_height.url)
                    .attr("data-state", "still");
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $("#gifs-appear-here").prepend(animalDiv);
                }

                $(".showImage").on("click", function() {

                    var state = $(this).attr("data-state");

                    console.log(this);

                    if (state == "still") {

                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } 

                    else {
                        $(this).attr("src", $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });        
  });
}
    function renderButtons() {

        $("#new-buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          a.addClass("btn btn-default animal");
          a.attr("data-animal", animals[i]);
          a.text(animals[i]);
          $("#new-buttons-view").append(a);
        }
      }

      $("#newButton").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
        
      });


      $(document).on("click", ".animal", displayGif);

      renderButtons();




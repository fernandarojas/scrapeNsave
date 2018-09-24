// Grab the articles as a json

$("#scrapeButton").on("click", function() { 
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      var articleDiv = $("<div class='card w-75 mx-auto' id='articleDiv'></div>");
      var articleTitle = $("<div class='card-header'>" + data[i].title + "</div>");
      
      var addNote = $("<div class='mx-auto card-body'> <button type='button' data-id='" + data[i]._id + "' id='addNote' class='btn btn-success' data-toggle='modal' data-target='#myModal'>Add Note</button></div>");
      var articleRead = $("<div class='card-footer'><a href='" + data[i].link + "' class='btn btn-outline-warning btn-block'>Read</a></div>")

      articleDiv.append(articleTitle,  addNote, articleRead);
      $("#articles").append(articleDiv);
    }
  });
});



// Whenever someone clicks a p tag
$(document).on("click", "#addNote", function() {
 
  $("#modalTitle").empty();
  $("#modalFooter").empty();
  $("#noteTitle").empty();
  $("#noteText").empty();

  // Save the id from the p tag
  var thisId = $(this).attr('data-id');

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#modalTitle").append("<h2>" + data.title + "</h2>");
      $("#modalFooter").append("<button class='btn btn-primary data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
   
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});

$(document).on("click", "#savedButton", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/saved/",
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
   
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});
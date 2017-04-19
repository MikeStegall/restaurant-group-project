function dataToEl (data) {
  $('#title').html(data.title + '  ' + data.date_published);
  $('#news').html(data.post);
}

function responseFail (xhr, textStatus, errorThrown) {
  $('#news').html('Ooops.');
  $("#errorDiv").html("Error: " + xhr.statusText);
}

 $(function() {
  var url = 'https://json-data.herokuapp.com/restaurant/news/1';
  var badUrl = "http://thisdoesnotexist1091092.com"
  apiCall = $.get(url, dataToEl).fail(responseFail);
});

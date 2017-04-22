/* global $ */

// This function to locate our burrito restaurant
function initMap () {
  var uluru = {lat: 29.717628, lng: -95.496879}
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: uluru
  })
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  })
}

// These are the functions on how to get pictures from the flickr API
var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2021f3e42913ad4588b58d723308b3e9&tags=Burrito&privacy_filter=1&safe_search=1&content_type=1&format=json&nojsoncallback=1&api_sig=c7d452002d567b77e8c6fb60e0fc78a3'
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

function renderPic (data, num, imgEl) {
  var farmID = data.photos.photo[num].farm
  var serverID = data.photos.photo[num].server
  var id = data.photos.photo[num].id
  var secret = data.photos.photo[num].secret
  var picURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret + '.jpg'
  $(imgEl).attr('src', picURL)
}

var randomPhotoNum = Math.floor(Math.random() * 100)

function responseFail (el) {
  el.html('Oops.')
}

function jsonFlickrApi (data) {
  renderPic(data, randomPhotoNum, '#test')
}
$.get(flickrURL).done(jsonFlickrApi).fail(responseFail)

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
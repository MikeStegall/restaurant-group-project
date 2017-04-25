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
var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=eb027270d22c94ca2be72521ae36514b&tags=chicken+burrito%2C+steak+burrito%2C+veggie+burrito&text=Burrito&per_page=500&format=json&nojsoncallback=1&api_sig=ad3e93b85cf191392c4a4baed7f43be2'
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

function renderPic (data, num, imgEl) {
  var farmID = data.photos.photo[num].farm
  var serverID = data.photos.photo[num].server
  var id = data.photos.photo[num].id
  var secret = data.photos.photo[num].secret
  var picURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret + '.jpg'
  $(imgEl).attr('src', picURL)
  console.log(picURL)
}

function jsonFlickrApi (data) {
  renderPic(data, 89, '.headerPic')
  renderPic(data, 1, '.dailySpecialPic')
  renderPic(data, 103, '.sidePic1')
  renderPic(data, 71, '.sidePic2')
  renderPic(data, 80, '.sidePic3')
}
$.get(flickrURL).done(jsonFlickrApi).fail(responseFail)

function dataToEl (data) {
  $('#title p').html(data.title + '  ' + data.date_published)
  $('#restaurantNews').html(data.post)
}

function responseFail (xhr, textStatus, errorThrown) {
  $('#news').html('Ooops.')
  $('#errorDiv').html('Error: ' + xhr.statusText)
}

$(function () {
  var url = 'https://json-data.herokuapp.com/restaurant/news/1'

  var badUrl = 'http://thisdoesnotexist1091092.com'
  apiCall = $.get(url, dataToEl).fail(responseFail)
})

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

function responseFail (el) {
  el.html('Ooops.')
}

var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7622fe7cb0a248dc2339b9433de1e05e&tags=Burrito&format=json&nojsoncallback=1&api_sig=7b9fdeedea37813476c6c7695298a915'

function jsonFlickrApi (data) {
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  var farmid = data.photos.photo[2].farm
  var serverID = data.photos.photo[2].server
  var id = data.photos.photo[2].id
  var secret = data.photos.photo[2].secret
  var picURL = 'https://farm' + farmid + '.staticflickr.com/' + serverID + '/' + id + '_' + secret + '.jpg'
  console.log(picURL)
}

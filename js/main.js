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
var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=70c8af8f150221737b7487a43a27aebd&tags=chicken+burrito%2C+steak+burrito%2C+veggie+burrito&text=Burrito&per_page=500&format=json&nojsoncallback=1&auth_token=72157680965850351-e4778b2c511c3149&api_sig=6e56973bff6da660666231cd619c26f2'
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

function renderPic (data, num, imgEl) {
  var farmID = data.photos.photo[num].farm
  var serverID = data.photos.photo[num].server
  var id = data.photos.photo[num].id
  var secret = data.photos.photo[num].secret
  var picURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret + '.jpg'
  $(imgEl).attr('src', picURL)
  console.log(picURL)
  console.log(id)
}

function jsonFlickrApi (data) {
  renderPic(data, 87, '.headerPic')
  renderPic(data, 1, '.dailySpecialPic')
  renderPic(data, 103, '.sidePic1')
  renderPic(data, 71, '.sidePic2')
  renderPic(data, 80, '.sidePic3')
}
$.get(flickrURL).done(jsonFlickrApi).fail(responseFail)




// These funstions are for getting the data from the custom restaurant API

//This our news API
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
  apiCall = $.get(url, dataToEl).fail(responseFail)
})

// This is our specials api
$(function () {
  //var url = 'https://json-data.herokuapp.com/restaurant/news/1'

  var urlMenu = "https://json-data.herokuapp.com/restaurant/menu/1"
  var urlSpecail = "https://json-data.herokuapp.com/restaurant/special/1"
  var badUrl = 'http://thisdoesnotexist1091092.com'
  //apiCall = $.get(url, dataToEl).fail(responseFail)



  $.get(urlMenu, function(data) {

    entrees = data.entrees;

    $.get(urlSpecail, function(data) {

        for(var i = 0; i < entrees.length; i++) {
          if( data.menu_item_id == entrees[i].id ) {
            special = entrees[i];
            $("#special").html(special.item);
            console.log(special);
            break;
          }
        }

    });

  });

});

// These functions are for the buttons for make the history, menu and reservations work together.

$('.buttonSwitch .buttons').click(toggleTabs)
function toggleTabs (btn) {
  // toggles class 'show' in btn tabs
  $('.buttonSwitch .buttons').removeClass('show')
  $(this).addClass('show')
  // takes the data att name from the btn and creates a class
  var className = '.' + btn.target.dataset.btn
  $('.menu, .history, .reservation').hide()
  $(className).show()
  console.log('This is the ' + className)
  console.log($('.reservation').html())
}
// Hides the content
$('.menu, .reservation').hide()

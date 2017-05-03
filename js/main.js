/* global $, google */
// =======================================================================
// Google API
// =======================================================================

var BURRITO_BOYS_LOCATION = {lat: 29.717628, lng: -95.496879}
var MAP_ZOOM_LEVEL = 18

// This function to locate our burrito restaurant
function initMap () {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: MAP_ZOOM_LEVEL,
    center: BURRITO_BOYS_LOCATION
  })
  var marker = new google.maps.Marker({
    position: BURRITO_BOYS_LOCATION,
    map: map
  })
}

// =======================================================================
// These are the functions on how to get pictures from the flickr API
// =======================================================================
var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e258dacf03b435fca95660ccabfb24c7&tags=chicken+burrito%2C+steak+burrito%2C+veggie+burrito&text=Burrito&privacy_filter=1&safe_search=1&content_type=1&per_page=500&format=json&nojsoncallback=1&auth_token=72157681099193231-e6e7fed9c0b56748&api_sig=32ce99ef65e61abed87e6e52442bc971'
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

function fetchPic (data, num, imgEl) {
  var farmID = data.photos.photo[num].farm
  var serverID = data.photos.photo[num].server
  var id = data.photos.photo[num].id
  var secret = data.photos.photo[num].secret
  var picURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret + '.jpg'
  $(imgEl).attr('src', picURL)
}
// The number are for the picture object in the flickr api
function renderPic (data) {
  fetchPic(data, 87, '.headerPic') // https://farm3.staticflickr.com/2679/4418434156_cf8a315ff8.jpg
  fetchPic(data, 1, '.dailySpecialPic') // https://farm8.staticflickr.com/7392/27981497742_70ae10950d.jpg
  fetchPic(data, 103, '.sidePic1')// https://farm3.staticflickr.com/2441/3744351366_cc5cbc0049.jpg
  fetchPic(data, 71, '.sidePic2') // https://farm6.staticflickr.com/5204/5383133286_32d384a40d.jpg
  fetchPic(data, 80, '.sidePic3') // https://farm5.staticflickr.com/4141/4882317101_84e32b3d62.jpg
}
$.get(flickrURL).done(renderPic).fail(responseFail)

// =======================================================================
// This is the custom restaurant api
// =======================================================================

// This our news API
function dataToNews (data) {
  $('#title p').html(data.title + '  ' + data.date_published)
  $('#restaurantNews').html(data.post)
}

function responseFail (element) {
  element.html('Oops')
}

var newsUrl = 'https://json-data.herokuapp.com/restaurant/news/1'
var specialUrl = 'https://json-data.herokuapp.com/restaurant/special/1'
var menuUrl = 'https://json-data.herokuapp.com/restaurant/menu/1'
$.get(newsUrl, dataToNews).fail(responseFail)
$.get(menuUrl).done(callMenuData).fail(responseFail)

// This is our specials api
function showDailySpecial (data) {
  var id = '#' + data.menu_item_id
  var menuItem = $(id)
  $('#dailySpecial').html(menuItem)
}

function grabDailySpecials () {
  $.getJSON(specialUrl).done(showDailySpecial).fail(responseFail)
}
grabDailySpecials()

// Menu Api
function callMenuData (data) {
  for (var item in data) {
    if (data.hasOwnProperty(item)) {
      constructMenuItems(item, data[item])
    }
  }
}

function constructMenuItems (foods, obj) {
  var title = '<h2>' + firstLetterToUpper(foods) + '</h2>'
  $('.menu').append(title)
  obj.forEach(function (item) {
    $('.menu').append(constructMenuEntries(item))
  })
}

function constructMenuEntries (eachFoodItem) {
  var menuItem = '<div id="' + eachFoodItem.id + '">' + '<p><b>' + eachFoodItem.item + '</b></p>' + '<p id="foodPrice"> $' + eachFoodItem.price + '</p>' +
  '<p id="foodDescription">' + eachFoodItem.description + '</p></div>'
  return menuItem
}

function firstLetterToUpper (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// responseFail($('.menu'))
responseFail($('#dailySpecial'))

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
}

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
var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d2cc21cf99dd2a91f2153e363b5c6cca&tags=chicken+burrito%2C+steak+burrito%2C+veggie+burrito&text=Burrito&per_page=500&format=json&nojsoncallback=1&auth_token=72157681044239921-75f6c167794a19cd&api_sig=53093f5fc91b4c4a9ddba0aebed663c2'
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

function renderPic (data, num, imgEl) {
  var farmID = data.photos.photo[num].farm
  var serverID = data.photos.photo[num].server
  var id = data.photos.photo[num].id
  var secret = data.photos.photo[num].secret
  var picURL = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + id + '_' + secret + '.jpg'
  $(imgEl).attr('src', picURL)
  // console.log(picURL)
  // console.log(id)
}

function jsonFlickrApi (data) {
  renderPic(data, 87, '.headerPic') // https://farm3.staticflickr.com/2679/4418434156_cf8a315ff8.jpg
  renderPic(data, 1, '.dailySpecialPic') // https://farm8.staticflickr.com/7392/27981497742_70ae10950d.jpg
  renderPic(data, 103, '.sidePic1')// https://farm3.staticflickr.com/2441/3744351366_cc5cbc0049.jpg
  renderPic(data, 71, '.sidePic2') // https://farm5.staticflickr.com/4141/4882317101_84e32b3d62.jpg
  renderPic(data, 80, '.sidePic3')
}
$.get(flickrURL).done(jsonFlickrApi).fail(responseFail)

// =======================================================================
// This is the custom restaurant api
// =======================================================================





// These funstions are for getting the data from the custom restaurant API

//This our news API
function dataToEl (data) {
// This our news API
function dataToNews (data) {
  $('#title p').html(data.title + '  ' + data.date_published)
  $('#restaurantNews').html(data.post)
}

function responseFail (element) {
  element.html('Oops the ' + element + 'failed to load')
}

var newsUrl = 'https://json-data.herokuapp.com/restaurant/news/1'
var specialUrl = 'https://json-data.herokuapp.com/restaurant/special/1'
var menu1Url = 'https://json-data.herokuapp.com/restaurant/menu/1'
$.get(newsUrl, dataToNews).fail(responseFail)
$.get(menu1Url).done(callMenuData).fail(responseFail)

// This is our specials api
function showDailySpecial (data) {
  var id = '#' + data.menu_item_id
  var menuItem = $(id)
  $('#dailySpecial').html(menuItem)
  console.log('this is the id: ' + id)
  console.log('this is the menuItem: ' + menuItem)
}

function grabDailySpecials () {
  $.getJSON(specialUrl).done(showDailySpecial).fail(responseFail)
}

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
  grabDailySpecials()
}

function constructMenuEntries (eachFoodItem) {
  var menuItem = '<div id="' + eachFoodItem.id + '">' + '<p><b>' + eachFoodItem.item + '</b</p>' + '<p id="foodPrice"> $' + eachFoodItem.price + '</p>' +
  '<p id="foodDescription">' + eachFoodItem.description + '</p></div>'
  return menuItem
}

function firstLetterToUpper (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// Menu API start
$(function () {
  var url = 'https://json-data.herokuapp.com/restaurant/menu/1'
  $.getJSON(url).done(getMenuData)
})

function getMenuData (data) {
  for (var item in data) {
    if (data.hasOwnProperty(item)) {
      buildMenu(item, data[item])
    }
  }
}

function buildMenu (foodCourse, obj) {
  var foodCourseHeading = '<h2>' + foodCourse.charAt(0).toUpperCase() + foodCourse.slice(1) + '<h2>'
  $('#menu').append(foodCourseHeading)
  obj.forEach(function (index) {
    $('#menu').append(createMenuEntries(index))
  })
  // getDailySpecial()
}

function createMenuEntries (eachFoodItem) {
  var menuItem = '<div id="' + eachFoodItem.id + '">' + '<p>' + eachFoodItem.item + ' .......... $' + eachFoodItem.price + '</p>' +
  '<p>' + eachFoodItem.description + '</p></div>'
  return menuItem
}
function displayDailySpecial (data) {
  var id = '#' + data.menu_item_id
  var dailySpecial = $(id)
  $('#dailySpecial').html(dailySpecial)
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
// Hides the content
$('.menu, .reservation').hide()

// menu API start
$(function () {
var url = 'https://json-data.herokuapp.com/restaurant/menu/1'
var badUrl = 'http://thisdoesnotexist1091092.com'
apiCall = $.get(url, dataToEl2).fail(responseFail)
$.getJSON(url).done(getMenuData)

})

function getMenuData (data) {
  for (var item in data) {
    if (data.hasOwnProperty(item)) {
      buildMenu(item, data[item])
    }
  }
}

function buildMenu (foodCourse, obj) {
  var foodCourseHeading = '<h2>' + foodCourse.charAt(0).toUpperCase() + foodCourse.slice(1) + '<h2>'
  $('#menu').append(foodCourseHeading)
  obj.forEach(function (index) {
    $('#menu').append(createMenuEntries(index))
  })
  getDailySpecial()
}

function createMenuEntries (eachFoodItem) {
  var menuItem = '<div id="' + eachFoodItem.id + '">' + '<p><strong>' + eachFoodItem.item + ' .......... $' + eachFoodItem.price + '</strong></p>' +
  '<p>' + eachFoodItem.description + '</p></div>'
  return menuItem
}
}

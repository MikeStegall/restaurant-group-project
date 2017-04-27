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
var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=19c593fbc7e6e191716c96844602d0f9&tags=chicken+burrito%2C+steak+burrito%2C+veggie+burrito&text=Burrito&per_page=500&format=json&nojsoncallback=1&auth_token=72157681009254301-b1effc6e7630861e&api_sig=7c9852594c8adbb99bf77c5d923831ed'
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

function responseFail (xhr, textStatus, errorThrown) {
  $('#news').html('Ooops.')
  $('#errorDiv').html('Error: ' + xhr.statusText)
}

var newsUrl = 'https://json-data.herokuapp.com/restaurant/news/1'
$.get(newsUrl, dataToNews).fail(responseFail)

// This is our specials api
$(function () {
  // var url = 'https://json-data.herokuapp.com/restaurant/news/1'
  var urlMenu = 'https://json-data.herokuapp.com/restaurant/menu/1'
  var urlSpecail = 'https://json-data.herokuapp.com/restaurant/special/1'
  var badUrl = 'http://thisdoesnotexist1091092.com'
  // apiCall = $.get(url, dataToEl).fail(responseFail)

  $.get(urlMenu, function (data) {
    var entrees = data.entrees
    $.get(urlSpecail, function (data) {
      for (var i = 0; i < entrees.length; i++) {
        if (data.menu_item_id === entrees[i].id) {
          var special = entrees[i]
          $('#special').html(special.item)
          // break
        }
      }
    })
  })
})

// Menu API start
$(function () {
  var url = 'https://json-data.herokuapp.com/restaurant/menu/1'
// var badUrl = 'http://thisdoesnotexist1091092.com'
// apiCall = $.get(url, dataToEl2).fail(responseFail)
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
  var menuItem = '<div id="' + eachFoodItem.id + '">' + '<p><strong>' + eachFoodItem.item + ' .......... $' + eachFoodItem.price + '</strong></p>' +
  '<p>' + eachFoodItem.description + '</p></div>'
  return menuItem
}
function displayDailySpecial (data) {
  var id = '#' + data.menu_item_id
  var dailySpecial = $(id)
  $('#dailySpecial').html(dailySpecial)
}

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

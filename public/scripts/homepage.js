var navBarName = $('.navBar p')

$.get("userInfo", function(data, status) {
  navBarName.html('Hi, ' + data.username)
});


function navBar() {
  navBarToggle = $('.navBarToggle')
  obj = document.getElementById("navBarLinks")

  navBarToggle.toggleClass("active")
  if (obj.style.maxHeight) {
    obj.style.maxHeight = null
  } else {
    obj.style.maxHeight = obj.scrollHeight + 'px'
  }
}

function focusContent() {
  $('.navBarToggle').removeClass('active')
  document.getElementById("navBarLinks").style.maxHeight = null
}

function hasTouch() {
  return 'ontouchstart' in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
  try { // prevent exception on browsers not supporting DOM styleSheets properly
    for (var si in document.styleSheets) {
      var styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(':hover')) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (ex) {}
}
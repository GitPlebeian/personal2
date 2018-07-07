if (localStorage.getItem('loggedIn') !== null) {
  $('#content').css('display','block');
  setTimeout(function(){
    $('#content').animate({
      opacity: '1'
    },400)
  },200)
} else{

  rollIntro()

  $('#content').css('display','block');

  setTimeout(function(){
    $('#intro').css('display','none')
    $('#intro h1').html('')
    fadeIn($('#content'))
  }, 13000);

  localStorage.clear()
  localStorage.setItem('loggedIn',true)
  localStorage.setItem('money',0.0)
  localStorage.setItem('manualSystemComputeRate',0.2)
  localStorage.setItem('halfSecondRate',0)
  localStorage.setItem('tenthSecondRate',0)
  localStorage.setItem('secondRate',0)
  localStorage.setItem('computationRateUpgrade',0.05)
  localStorage.setItem('computationRateUpgradePrice',1.5)
  localStorage.setItem('upgradeModuleActive',false)
  localStorage.setItem('research',0)
  localSotrage.setItem('computeInstanceModActiveResearch',false)
}

// The start of the game
var money                        = Number(localStorage.getItem('money'))
var manualSystemComputeRate      = Number(localStorage.getItem('manualSystemComputeRate'))
var halfSecondRate               = Number(localStorage.getItem('halfSecondRate'))
var tenthSecondRate              = Number(localStorage.getItem('tenthSecondRate'))
var secondRate                   = Number(localStorage.getItem('secondRate'))
var computationRateUpgrade       = Number(localStorage.getItem('computationRateUpgrade'))
var computationRateUpgradePrice  = Number(localStorage.getItem('computationRateUpgradePrice'))
var research                     = Number(localStorage.getItem('research'))

if(localStorage.getItem('upgradeModuleActive') == 'true') {
  var upgradeModuleActive = true
} else {
  var upgradeModuleActive = false
}
var upgradeModulePrice = 0.5

if(localStorage.getItem('computeInstanceModActiveResearch') == 'true') {
  var computeInstanceModActiveResearch = true
} else {
  var computeInstanceModActiveResearch = false
}
var computeInstanceModActiveResearchPrice = 8

var time = 0;


// Manual System Compute
var computeWaiting = Math.floor(Math.random() * 4 + 1)
$('.systemComputeWorkMod').each(function() {
  if ($(this).attr('id') == 'compute' + computeWaiting) {
    $(this).css('background-color','#4cf64d')
  }
});

var computeCompletes = 0
$('#systemComputeWork').click(function() {
  systemCompute($(this))
})

//research
$('#researchPower').click(function() {
  research++
  $('#researchResource').html("Research: " + research)
})

// Purchase Computation computeInstances

// Compute Instance
var computeInstanceDivsWidth = $('#computeInstanceDivs').width()
$('.computeInstance').css('width', (computeInstanceDivsWidth / 12 - 3.25) + 'px')

$(window).resize(function(){
  var computeInstanceDivsWidth = $('#computeInstanceDivs').width()
  $('.computeInstance').css('width', (computeInstanceDivsWidth / 12 - 3.25) + 'px')
})
// Research Computation instance
if(computeInstanceModActiveResearch) {
  $('#computeInstanceModResearchActive').css('display','none')
} else {
  $('#computeInstanceModResearchActive').css('display','block')
}


var breaker = true
$(window).focus(function() {
  breaker = true
});

$(window).blur(function() {
    breaker = false
});

if (breaker) {
  setInterval(function(){
    updateVariablesTenthSecond()
  }, 100);
  setInterval(function(){
    updateVariablesHalfSecond()
  }, 500);
  setInterval(function(){
    updateVariablesSecond()
  }, 1000);

  setInterval(function(){
    saveVariables()
  }, 500);
}

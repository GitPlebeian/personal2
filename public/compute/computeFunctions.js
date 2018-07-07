function rollIntro() {
  var intro = $('#intro')
  var introText = $('#intro h1')
  intro.css('display','block');

  setTimeout(function(){
    fadeIn(intro)
    setTimeout(function(){
      fadeOut(intro)
      setTimeout(function(){
        introText.html('You have yet to show them this')
        fadeIn(intro)
        setTimeout(function(){
          intro.css('font-size','25px')
          introText.html('SHOW THEM!')
          fadeIn(intro)
        }, 4000);
      }, 1000);
    }, 3000);
  }, 1300);
}

function fadeOut(element) {
  element.animate({
    opacity: '0'
  }, 500)
}

function fadeIn(element) {
  element.animate({
    opacity: '1'
  }, 500)
}

// INTRO END

function systemCompute(mod) {
  if (true) {
    money += manualSystemComputeRate;
    var displayMoney = money
    displayMoney = Math.round(money * 100) / 100
    $('#money').html('Money: ' + displayMoney)

    computeCompletes++
    if (computeCompletes == 0) {
     $('#systemComputeComplete').css('background-color',"#f64c4d")
    } else if (computeCompletes == 1) {
      $('#systemComputeComplete').css('background-color',"#f6904d")
    } else if (computeCompletes == 2) {
      $('#systemComputeComplete').css('background-color',"#f6d44d")
    } else if (computeCompletes == 3) {
      $('#systemComputeComplete').css('background-color',"#4cf64d")
    } else if (computeCompletes == 4) {
        $('#systemComputeComplete').css('background-color',"#f64c4d")
      computeCompletes = 0
    }
    $('.systemComputeWorkMod').each(function() {
      if ($(this).attr('id') == 'compute' + computeWaiting) {
        $(this).css('background-color','#f64c4d')
      }
    });
    var newWaiting = Math.floor(Math.random() * 4 + 1)
    while(computeWaiting == newWaiting){
      newWaiting = Math.floor(Math.random() * 4 + 1)
    }
    computeWaiting = newWaiting
    $('.systemComputeWorkMod').each(function() {
      if ($(this).attr('id') == 'compute' + computeWaiting) {
        $(this).css('background-color','#4cf64d')
      }
    });
  }
}

function purchase(price) {
  if(money - price >= 0) {
    money -= price;

    return true
  } else{
    time = 0
    $('.shopItemPrice').css('background-color','#f64c4d')
    return false
  }
}

function updateVariablesTenthSecond() {
  time++
  if(time > 1000){
    time = 0
  }
  if(time % 10 == 9){
    $('.shopItemPrice').css('background-color','#555')
  }
  if(upgradeModuleActive == true){
    $('#research').css('display','block')
    $('#upgradeModuleDiv').css('display','none')
  } else {
    $('#research').css('display','none')
    $('#purchaseUpgradeModule').html('Research MOD')
    $('#upgradeModulePrice').html('$' + upgradeModulePrice)
  }

  money = Math.round(money * 10000) / 10000
  money += tenthSecondRate

  var displayMoney = money
  displayMoney = Math.round(money * 100) / 100
  $('#money').html('Money: ' + displayMoney)
  manualSystemComputeRate = Math.round(manualSystemComputeRate * 100) / 100
  $('#computationRate').html('Computation Rate: ' + manualSystemComputeRate)

  computationRateUpgrade = Math.round(computationRateUpgrade * 100) / 100
  $('#computationRateUpgrade').html('Computation Rate + ' + computationRateUpgrade)

  computationRateUpgradePrice = Math.round(computationRateUpgradePrice * 100) / 100
  $('#computationRateUpgradePrice').html('$' + computationRateUpgradePrice)

  research = Math.round(research * 100) / 100
  $('#researchResource').html('Research: ' + research)

  if(computeInstanceModActiveResearch) {
    $('#purchaseComputationInstanceDiv').css('display','block')
  } else {
    $('#purchaseComputationInstanceDiv').css('display','none')
  }

}

function updateVariablesHalfSecond() {
  money = Math.round(money * 10000) / 10000
  money += halfSecondRate
}

function updateVariablesSecond() {
  money = Math.round(money * 10000) / 10000
  money += secondRate
}

function saveVariables() {
  localStorage.setItem('money',money)
  localStorage.setItem('manualSystemComputeRate',manualSystemComputeRate)
  localStorage.setItem('halfSecondRate',halfSecondRate)
  localStorage.setItem('tenthSecondRate',tenthSecondRate)
  localStorage.setItem('secondRate',secondRate)
  localStorage.setItem('computationRateUpgrade',computationRateUpgrade)
  localStorage.setItem('computationRateUpgradePrice',computationRateUpgradePrice)
  localStorage.setItem('upgradeModuleActive',upgradeModuleActive)
  localStorage.setItem('research',research)
  localStorage.setItem('computeInstanceModActiveResearch',computeInstanceModActiveResearch)

}

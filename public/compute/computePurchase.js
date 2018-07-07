function researchPurchase(item, price) {
  if(research - price >= 0){
    research -= price
    item.css('display','none')
    return true
  } else {
    return false
  }
}

$('#computeInstanceModResearchActive').click(function() {
  if(researchPurchase($(this), computeInstanceModActiveResearchPrice)) {
    computeInstanceModActiveResearch = true;
    console.log(computeInstanceModActiveResearch);
  }
})

$('#computationRateUpgrade').click(function() {
  if (purchase(computationRateUpgradePrice)) {
    manualSystemComputeRate += computationRateUpgrade
    computationRateUpgrade += 0.01
    computationRateUpgradePrice += computationRateUpgradePrice  * 0.065
  }
})

$('#purchaseUpgradeModule').click(function() {
  if (purchase(upgradeModulePrice)) {
    upgradeModuleActive = true
  }
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   	chrome.tabs.executeScript(tabId, {
  	  code: `
        var changeInfo = "${changeInfo.status}"
        var _target_url = encodeURI("${localStorage.getItem('shopeeLink')}")
        var activeChecked = ${localStorage.getItem('activeCheckbox')}
        var validate = 1586908800000
        var today = new Date().getTime()

        console.log("activeChecked:", activeChecked)
        console.log("today < validate:", today < validate)

        if(changeInfo == 'complete') {
          if (activeChecked && today < validate) {
            if (location.href.includes('shopee.vn/checkout')) {
              findAndOrder()
            } else if (location.href.includes('shopee.vn/cart')) {
              findAndClickBuy()
            } else if (location.href.includes('purchase') || location.href.includes('payment') || location.href.includes('user')) {
              console.log('Success')
            } else if (_target_url == location.href) {
              if (document.getElementsByClassName('YtgjXY').length && !document.getElementsByClassName('YtgjXY')[1].className.includes('disabled')) {
                document.getElementsByClassName('YtgjXY')[1].click()
              } else {
                setTimeout(function(){
                  location.href=_target_url
                }, 5000);
              }

            } else {
              setTimeout(function(){
                location.href=_target_url
              }, 5000);
            }
          }
        }

        function findAndClickBuy() {
          setTimeout(function() {
            if (document.getElementsByClassName('shopee-button-solid').length) {
              document.getElementsByClassName('shopee-button-solid')[0].click()
            } else {
              findAndClickBuy()
            }

            console.log("In cart: ", document.getElementsByClassName('shopee-button-solid').length)
          }, 1000)
        }

        function findAndOrder() {
          setTimeout(function() {
            if(document.getElementsByClassName('stardust-button').length) {
              document.getElementsByClassName('stardust-button')[0].click()
            } else {
              findAndOrder()
            }

            console.log("In checkout: ", document.getElementsByClassName('stardust-button').length)
          }, 1000)
        }
  	  `
  	})
})

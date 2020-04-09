$('#shopeeLink').val().trim().length || $('#shopeeLink').val(localStorage.getItem('shopeeLink'))
$("#activeCheckbox").prop('checked', localStorage.getItem('activeCheckbox') == "true");

$('#shopeeLink').on('input', function() {
  localStorage.setItem('shopeeLink', $(this).val().trim())
})

$('.btnSetup').click(function() {
  var shopeeLink = $('#shopeeLink').val().trim()

  localStorage.setItem('shopeeLink', shopeeLink)

  chrome.tabs.create({url: shopeeLink, active: true});
})

$('#activeCheckbox').change(function() {
  localStorage.setItem('activeCheckbox', $(this).is(':checked'))
})

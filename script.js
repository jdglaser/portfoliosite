$('.raise-item').hover(
    function(){ $(this).addClass('shadow-lg p-3 mb-5 bg-white rounded') },
    function(){ $(this).removeClass('shadow-lg p-3 mb-5 bg-white rounded').addClass('shadow-sm p-3 mb-5 bg-white rounded') }
)

$(".panel-heading").hover(
    function() {
      $(this).children('.panel').children('.collapse').collapse('show');
    }, function() {
      $(this).children('.panel').children('.collapse').collapse('hide');
    }
  );
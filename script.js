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

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topbtn").style.display = "block";
    } else {
        document.getElementById("topbtn").style.display = "none";
    }
}

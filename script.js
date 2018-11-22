// Raise items
$('.raise-item').hover(
    function(){ $(this).addClass('shadow-lg p-3 mb-5 bg-white rounded') },
    function(){ $(this).removeClass('shadow-lg p-3 mb-5 bg-white rounded').addClass('shadow-sm p-3 mb-5 bg-white rounded') }
)

// Panel collapsing
$(".panel-heading").hover(
    function() {
      $(this).children('.panel').children('.collapse').collapse('show');
    }, function() {
      $(this).children('.panel').children('.collapse').collapse('hide');
    }
  );


// Scroll back to top btn
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.getElementById("topbtn").style.display = "block";
    } else {
        document.getElementById("topbtn").style.display = "none";
    }
}

// Smooth Scroll for browsers that don't support scroll-behavior css
$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
  
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

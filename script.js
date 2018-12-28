// Raise items
$('.raise-item').hover(
    function(){ $(this).addClass('shadow-lg p-3 mb-5 bg-white rounded') },
    function(){ $(this).removeClass('shadow-lg p-3 mb-5 bg-white rounded').addClass('shadow-sm p-3 mb-5 bg-white rounded') }
)

$('.expand').click(function(){
  var $expand = $(this).attr('expand')
  if ($(this).is(".fa-plus")) {
    $(this).toggleClass("fa-plus fa-minus")
    }
  else {
    $(this).toggleClass("fa-minus fa-plus")
  }
  $('.content').filter('[expand = "' + $expand + '"]').slideToggle('slow');
});

// Scroll back to top btn
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.getElementById("topbtn").style.display = "block";
    } else {
        document.getElementById("topbtn").style.display = "none";
    }
}

// Smooth scroll for browsers that don't support scroll-behavior css
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

// Sorting Function
$(document).ready(function(){
  var $filters = $('.filter [data-filter]'),
      $boxes = $('.boxes [data-category]');

  $filters.on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    $filters.removeClass('active');
    $this.addClass('active');

    var $filterColor = $this.attr('data-filter');

    if ($filterColor == 'all') {
      $boxes.removeClass('is-animated').removeClass('raise-item')
        .fadeOut(400).promise().done(function() {
          $boxes.addClass('is-animated').fadeIn().addClass('raise-item');
        });
    } else {
      $boxes.removeClass('is-animated').removeClass('raise-item')
        .fadeOut(400).promise().done(function() {
          $boxes.filter('[data-category = "' + $filterColor + '"]')
            .addClass('is-animated').fadeIn().addClass('raise-item');
        });
    }
  });
});

$('.raise-item').hover(
  function(){ $(this).addClass('shadow-lg p-3 mb-5 bg-white rounded') },
  function(){ $(this).removeClass('shadow-lg p-3 mb-5 bg-white rounded').addClass('shadow-sm p-3 mb-5 bg-white rounded') 
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

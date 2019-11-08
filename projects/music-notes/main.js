function playSound(note) {
    let sound = new Audio(`./sounds/${note}.m4a`);
    sound.play()
}

$( ".note" ).mouseenter(function() {
    playSound($(this).data("note"))
});

$( ".note" ).click(function() {
    playSound($(this).data("note"))
});
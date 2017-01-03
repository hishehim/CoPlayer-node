$(document).ready(function(){
  // adjustFloatingActions();
  // $(document).scroll(adjustFloatingActions);
  // $(window).resize(adjustFloatingActions);
});

// function adjustFloatingActions() {
//   var playlist = $('.coplayer--playlist-wrapper');
//   var floatingAction = $('.coplayer-floating-actions');
//   var floatingOffset,  playlistOffset;
//   if (playlist.length && floatingAction.length) {
//     floatingOffset = floatingAction.offset().top + floatingAction.height();
//     playlistOffset = playlist.offset().top + playlist.height();
//     if ( floatingOffset > playlistOffset ) {
//         floatingAction.css('position', 'absolute');
//     } else if ( ($(document).scrollTop() + $(window).height()) <= (playlistOffset) ) {
//       floatingAction.css('position', 'fixed');
//     }
//   }
// }

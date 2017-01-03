$(document).ready(function(){
  setUpModal();
  CoPlayer();
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

function CoPlayer() {
  $('form.coplayer-search').submit(function(){
    // SEARCH EVENT GO HERE
    event.preventDefault();
  });
}

function setUpModal() {
  $('.modal-holder').find('.btn-close').click(function(){
    $(this).closest('.modal-holder').removeClass('show');
  });
  $('.modal-holder').bind('click.closeModal', function(e){
    if(!$(e.target).closest('.modal-box').length){
      $(this).removeClass('show');
    };
  });
  $('.coplayer-btn-add').bind('click.showSearch',function(e){
    $('#coplayer-search-modal.modal-holder').addClass('show');
  });
}

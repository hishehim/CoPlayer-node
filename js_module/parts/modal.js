function Modal() {
  $('.modal-holder').find('.btn-close').on('click.closeModal',function(){
    $(this).closest('.modal-holder.show').removeClass('show');
  });
  $('.modal-holder').on('click.closeModal', function(e){
    if(!$(e.target).closest('.modal-box').length){
      $(this).removeClass('show');
    }
  });
  $('[data-toggle="modal"][data-target]').each(function(i){
    $(this).on('click.showSearch', function(){
      $($(this).data('target')+'.modal-holder').addClass('show');
    });
  });
}

$(document).ready(function(){
  Modal();
});
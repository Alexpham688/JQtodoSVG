var undo = false;
var item_to_undo;
var time_out;

$(document).ready(function(){
  //delete
  $('body').on('click','.fa-trash', function(){
    if($('.main ul li').hasClass('temp_deleted')){
      $('.main ul li.temp_deleted').remove();
    }
     item_to_undo = $(this).parent().parent();
     var undo_time = 8000;

     item_to_undo.animate({
       height: '0px'
     }, 1000, function() {
       $(this).addClass('temp_deleted').hide();
    });

    function_undo(item_to_undo, undo);

    //undo
    $('.undo').addClass('active');

    clearTimeout(time_out);

    time_out = setTimeout(function(){
      $('.undo').removeClass('active');
      if(undo === false) {
        $('.main ul li.temp_deleted').remove();
      }
    }, undo_time);

    });

    //undo
    $('.undo div').on('click',function(){
      undo = true;
      function_undo(item_to_undo, undo);
      $(this).parent().removeClass('active')
    });


    //edit
    $('body').on('click','.fa-pencil', function(){
      var current = $(this).parent().parent().find('span').text();
      $(this).parent().parent().find('input[type=text]').val(current).show().select();
    });

    $('body').on('keypress', '.main ul li input[type=text]',function(e) {
      if(e.which === 13) {
        //hide undo
        $('.undo').removeClass('active');

        var newvalue = $(this).val();

        $(this).parent().parent().find('label span.item-name').html(newvalue);
        $(this).hide();
        return false;
      }
    });

    $(document).on('blur', 'input[type=text]', function(){
      $(this).hide();
    });

    //add new
    $('body').on('click','.add', function(){
      $(this).find('input[type=text]').val('Add new').show().select();

    });

    $('body').on('keypress','.add input[type=text]', function(e) {
    if(e.which === 13) {
        //hide undo
        $('.undo').removeClass('active');

         var newvalue = $(this).val();

         var clone = $('.main ul li:first').clone();
         clone.find('label span.item-name').html(newvalue);

         var random_num = Math.floor(Math.random() * 1000) + 1
         var id = newvalue.replace(/\s/g,'');
         var ids = id + random_num;

         clone.find('input').attr({
           id:ids
         });
         clone.find('label').attr('for', ids);
         clone.find('input[type=checkbox]').prop('checked', false);
         clone.removeClass('priority priority1 priority2 checked');
         clone.show();
         clone.appendTo('.main ul');

         $('.add').trigger('click');
         return false;
      }
    });

    //priority
    $('body').on('click', '.main ul li .actions .prio-btn', function(){
      if($(this).parent().parent().hasClass('priority2')) {
        $(this).parent().parent().addClass('reset').removeClass('priority priority1 priority2');

        return false;
      }

      if($(this).parent().parent().hasClass('priority')) {
        $(this).parent().parent().addClass('priority2');
      }
      $(this).parent().parent().addClass('priority priority1');
    });

    //click
    $('body').on('change', '.main ul li input[type=checkbox]', function(){
      if($(this).prop('checked')) {
        $(this).parent().addClass('checked');
      } else {
        $(this).parent().removeClass('checked');
      }
    });

    //sortable
    $(function(){
      $('.main ul').sortable({
        animation: 100,
        delay: 150,
        cursor: 'move',
        handle: '.dragger',
        tolerance: 'pointer',
        axis: 'y'
      });
      $('#sortable').disableSelection();
    });

});

function function_undo(item_to_undo, undo) {
  if(undo === true) {
    item_to_undo.css('height' ,'auto');
    item_to_undo.show();
    item_to_undo.removeClass('temp_deleted');
  }
}

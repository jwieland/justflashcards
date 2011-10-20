$(document).ready(function() {
  setupBoard();
//    setupFWBoard();
});

function setupBoard() {

  //clicks event handler
  $('.op').click(function() {
      if (! $(this).hasClass('selected')) {
	  $(this).addClass('selected');
      }
      $('#menu').data('selected', $(this).attr("id"));

      $('#ranger').show();
      $('#range_control').data('selected', 'max');
      $('.range_control').removeClass('selected');
      $('#max').addClass('selected');

      resetRanger( this.id )
  });

  $('#min').click(function() {
      $('#range_control').data('selected', $(this).attr("id"));
      var op_selected = $('#menu').data('selected');
      $('.range_control').removeClass('selected');
      $(this).addClass('selected');

  });

  $('#max').click(function() {
      $('#range_control').data('selected', $(this).attr("id"));
      var op_selected = $('#menu').data('selected');
      $('.range_control').removeClass('selected');
      $(this).addClass('selected');

  });

  $('#limit').click(function() {
      $('#range_control').data('selected', $(this).attr("id"));
      var op_selected = $('#menu').data('selected');
      $('.range_control').removeClass('selected');
      $(this).addClass('selected');

  });

  $('#clear').click(function() {
      var op_selected = $('#menu').data('selected');

      $('#' + op_selected).removeClass('selected');
      $('#ranger').hide();
  });

  $('.range').click(function() {
    //console.log("range selected");
    var range = $(this).attr('id');
    var value = parseInt(range.replace("range","")); //each css id has its number in it
    
    var op_selected = $('#menu').data('selected');
    var range_selected = $('#range_control').data('selected');
     // console.log('setting #' + op_selected + ':  ' + range_selected +' to ' + value ); 
    $('#' + op_selected).data(range_selected, value);

    resetRanger( op_selected )

    //	$('#ranger').hide();
    //newProblem();
  });
  
  $('#60s').click(function() {
    $('#ans_box').focus();

    if ( $(this).hasClass('disable')) {
        return;
    }

    $('#best20').toggleClass('disable');
    
    if ( $(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).stopTime();
      return;
    }

    $(this).toggleClass('selected');
  });


  $('#best20').click(function() {
    $('#ans_box').focus();

    if ( $(this).hasClass('disable')) {
        return;
    }

    $('#60s').toggleClass('disable');
    
    if ( $(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).stopTime();
      $('#timer').hide();
      return;
    }

    $(this).toggleClass('selected');
    if ( $(this).hasClass('selected')) {
      $('#timer').show();
    }
    else {
      $('#timer').hide();
    }
  });

  $('#save').click(function() {
    

  });

  $('#reset').click(function() {
      $('#ans_box').data('correct', 0 );
      updateDisplay();
  });

  //intial setup
  $('#plus').addClass("selected");
  $('#menu').data('selected', 'plus');
  $('#plus').data('max', 10);
  $('#plus').data('min', 1);
  $('#plus').data('limit', 12);
  $('#wrong').hide();
  $('#timer').hide();
  for (var i = 1; i <= 10; i++) {
    $('#range'+i).addClass("selected");
  }

  setInterval( function () {   $('#ans_box').focus();  }, 1000);
  newProblem();
}

function resetRanger( id ) {

//    console.log("id:"+ id);

    $('.range').removeClass('selected');  //clear what is there and repopulate
    var max = $('#' + id).data('max');
    var min = $('#' + id).data('min');

    if (! min) {
	$('#' + id).data('min', 1);
	min = $('#' + id).data('min');
    }
    var limit = $('#' + id).data('limit');
    if (! limit) {
	$('#' + id).data('limit', 12);
        limit = $('#' + id).data('limit');
    }
    $('.range').removeClass('selectedLimit');
    $('#range'+limit).addClass('selectedLimit');    

    if (max) {
	for (var i = min; i <= max; i++) {
	    $('#range'+i).addClass('selected');
	}
    }
}

function newProblem() {
  $('#ranger').hide();
  $('#ans_box').unbind();
  $('#ans_box').val('');

  
  //choose op with weights //refactor into own function
  var ops = new Array();
  var possible = 0;
      $('.op.selected').each(function(cnt) {
	ops.push($(this).attr('id'));
	possible++;
      });

  //console.log('Available ops: ' + ops);
  var op = ops[Math.floor(Math.random()*(possible))];
  //console.log("op:" + op);
    if (!op) {
	op = 'plus';
	$('#plus').data('max', 1);
	$('#plus').data('min', 1);
	$('#plus').data('limit', 0);
    }

  //rand 1-10
  var num1;
  var num2;
  var ans;
  var symbol;
  
  if (op == 'plus') {
    var max = $('#plus').data('max');
    var min = $('#plus').data('min');
    var limit = $('#plus').data('limit') + 1;
    num1 = Math.floor(Math.random()*(max - min));
    num1 = num1 + min;
    num2 = Math.floor(Math.random()*(limit));
    //console.log('plus op - max: ' + max + ' num1: ' + num1 + ' num2: ' + num2);
    symbol = '+';
    ans = num1 + num2;
  }
  else if (op == 'minus') {
    var max = $('#minus').data('max');
    var min = $('#minus').data('min');
    var limit = $('#minus').data('limit') + 1;
 
    num1 = Math.floor(Math.random()*(max - min));
    num1 = num1 + min;

    num2 = Math.floor(Math.random()*limit);

    if (num1 < num2) {
      var num2_h = num2;
      num2 = num1;
      num1 = num2_h;
    }

    symbol = '-';
    ans = num1 - num2;
  }
  else if (op == 'times') {
    var max = $('#times').data('max');
    var min = $('#times').data('min');
    var limit = $('#times').data('limit') + 1;
    num1 = Math.floor(Math.random()*(max - min));
    num1 = num1 + min;
    num2 = Math.floor(Math.random()*(limit));

    symbol = 'x';
    ans = num1 * num2;
  }
  else {
    var max = $('#div').data('max');
    var min = $('#div').data('min');
    var limit = $('#div').data('limit');
    num1 = Math.floor(Math.random()*(max - min));
    num1 = num1 + min;
    num2 = Math.floor(Math.random()*(limit));
    num2 = num2 + 1;

    ans = num1;
    num1 = num1 * num2;

    symbol = '/';

  }

  $('#ans_box').data('ans', ans);

  $('#num1').html(num1);
  $('#num2').html(symbol + num2);

  $('#ans_box').keyup(function() {
    checkSolution();
  });

  $('#ans_box').focus();
}

function checkSolution () {

  var ans  = parseInt($('#ans_box').val());
  var num1 = parseInt($('#num1').html());
  var num2 = parseInt($('#num2').html());

  //check to see if any timers need to be kicked off.
  if ( $('#60s').hasClass('selected') ){
    $('#60s').removeClass('selected').addClass('active');
    $('#60s').oneTime('60s', function () {
      //console.log('60s results');
      $('#60s').removeClass('active');
    });
  }

  if ( $('#best20').hasClass('selected') ){
    $('#best20').removeClass('selected').addClass('active');
    $('#best20').data('elapsed', 0);
    $('#best20').everyTime('1s', function () {
      var elapsed = $('#best20').data('elapsed');
      elapsed ++;

      var min = 0;
      var sec = elapsed;

      while (sec >= 60) {
        min ++;
        sec = sec - 60;
      }
      
      if (sec <= 9) {
          sec = '0' + sec;
      }

      $('#best20').data('elapsed', elapsed);
      $('#time').html(min + ':' + sec );
    });
  }

  
  var true_ans = $('#ans_box').data('ans');
  //console.log("true: " + true_ans +" | got: " + ans); 
  if (ans == true_ans) {
    correctSolution();
    newProblem();
  }
  else {
    if (String(ans).length === String(true_ans).length ) {
      incorrectSolution();
    }
    else {
      $('#ans_box').removeClass('wrong');
    }
  }

  updateDisplay();
  
}

function updateDisplay() {
  $('#correct_num').html( $('#ans_box').data('correct') );
}

function incorrectSolution() {
  var incorrect = $('#ans_box').data('incorrect') || 0;
  incorrect ++;
  $('#ans_box').data('incorrect', incorrect );

  setTimeout( function() {
    $('#ans_box').val('X');
    $('#ans_box').addClass('wrong');
  }, 250);

  setTimeout( function() {
    $('#ans_box').val('');
    $('#ans_box').removeClass('wrong');
  }, 1000);
}

function correctSolution() {
  var correct = $('#ans_box').data('correct') || 0;
  correct ++;
  $('#ans_box').data('correct', correct );
}

//timers minimized from http://plugins.jquery.com/project/timers
jQuery.fn.extend({everyTime:function(interval,label,fn,times){return this.each(function(){jQuery.timer.add(this,interval,label,fn,times);});},oneTime:function(interval,label,fn){return this.each(function(){jQuery.timer.add(this,interval,label,fn,1);});},stopTime:function(label,fn){return this.each(function(){jQuery.timer.remove(this,label,fn);});}});jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{'ms':1,'cs':10,'ds':100,'s':1000,'das':10000,'hs':100000,'ks':1000000},timeParse:function(value){if(value==undefined||value==null)
return null;var result=this.regex.exec(jQuery.trim(value.toString()));if(result[2]){var num=parseFloat(result[1]);var mult=this.powers[result[2]]||1;return num*mult;}else{return value;}},add:function(element,interval,label,fn,times){var counter=0;if(jQuery.isFunction(label)){if(!times)
times=fn;fn=label;label=interval;}
interval=jQuery.timer.timeParse(interval);if(typeof interval!='number'||isNaN(interval)||interval<0)
return;if(typeof times!='number'||isNaN(times)||times<0)
times=0;times=times||0;var timers=jQuery.data(element,this.dataKey)||jQuery.data(element,this.dataKey,{});if(!timers[label])
timers[label]={};fn.timerID=fn.timerID||this.guid++;var handler=function(){if((++counter>times&&times!==0)||fn.call(element,counter)===false)
jQuery.timer.remove(element,label,fn);};handler.timerID=fn.timerID;if(!timers[label][fn.timerID])
timers[label][fn.timerID]=window.setInterval(handler,interval);this.global.push(element);},remove:function(element,label,fn){var timers=jQuery.data(element,this.dataKey),ret;if(timers){if(!label){for(label in timers)
this.remove(element,label,fn);}else if(timers[label]){if(fn){if(fn.timerID){window.clearInterval(timers[label][fn.timerID]);delete timers[label][fn.timerID];}}else{for(var fn in timers[label]){window.clearInterval(timers[label][fn]);delete timers[label][fn];}}
for(ret in timers[label])break;if(!ret){ret=null;delete timers[label];}}
for(ret in timers)break;if(!ret)
jQuery.removeData(element,this.dataKey);}}}});jQuery(window).bind("unload",function(){jQuery.each(jQuery.timer.global,function(index,item){jQuery.timer.remove(item);});});



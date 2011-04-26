$(document).ready(function() {
  setupBoard();
//    setupFWBoard();
});

function setupBoard() {
  $('.op').click(function() {
    $(this).toggleClass('selected');

    if ( $(this).hasClass('selected')) {
      $('#menu').data('selected', $(this).attr("id"));
      $('#ranger').show();
      $('.range').removeClass('selected');
      var max = $(this).data('max');
      for (var i = 1; i <= max; i++) {
	$('#range'+i).addClass('selected');
      }
    }
    else {
      $('#ranger').hide();		 
    }
    
  });

  $('.range').click(function() {
    console.log("range selected");
    var range = $(this).attr('id');
    var max = parseInt(range.replace("range",""));
    $('.range').removeClass("selected");
    for (var i = 1; i <= max; i++) {
      $('#range'+i).addClass("selected");
    }
    var selected = $('#menu').data('selected');
    console.log('setting #' + selected + ': max ' + max); 
    $('#' + selected).data('max', max);
    //	$('#ranger').hide();
    newProblem();
  });

  $('#60s').click(function() {
    $(this).toggleClass('selected');
    if ( $(this).hasClass('selected')) {
      $('#timer').show();
    }
    else {
      $('#timer').hide();        
    }
    $(this).data('start', 'foo' );
  });

  $('#best20').click(function() {
    $(this).toggleClass('selected');
  });

  $('#plus').addClass("selected");
  $('#menu').data('selected', 'plus');
  $('#plus').data('max', 10);
  $('#wrong').hide();
  $('#timer').hide();
  for (var i = 1; i <= 10; i++) {
    $('#range'+i).addClass("selected");
  }

  newProblem();
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

  console.log('Available ops: ' + ops);
  var op = ops[Math.floor(Math.random()*(possible))];
  console.log("op:" + op);

  //rand 1-10
  var num1;
  var num2;
  var ans;
      var symbol;

  if (op == 'plus') {
    var max = $('#plus').data('max') + 1;
    num1 = Math.floor(Math.random()*(max));
    num2 = Math.floor(Math.random()*(max));
    console.log('plus op - max: ' + max + ' num1: ' + num1 + ' num2: ' + num2);
    symbol = '+';
    ans = num1 + num2;
  }
  else if (op == 'minus') {
    var max = $('#minus').data('max') + 1; 
    num1 = Math.floor(Math.random()*max);
    num2 = Math.floor(Math.random()*max);

    if (num1 < num2) {
      var num2_h = num2;
      num2 = num1;
      num1 = num2_h;
    }

    symbol = '-';
    ans = num1 - num2;
  }
  else if (op == 'times') {
    var max = $('#times').data('max') + 1; 
    num1 = Math.floor(Math.random()*max);
    num2 = Math.floor(Math.random()*max);

    symbol = 'x';
    ans = num1 * num2;
  }
  else {
    var max = $('#div').data('max'); 
    num1 = Math.floor(Math.random()*max)+1;
    num2 = Math.floor(Math.random()*max)+1;

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
    $('#60s').oneTime('5s', 'fee', alert("boom"));
    
  }
  
  var true_ans = $('#ans_box').data('ans');
  console.log("true: " + true_ans +" | got: " + ans); 
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
}

function incorrectSolution() {
  setTimeout( function() {
    $('#ans_box').val('X');
    $('#ans_box').addClass('wrong');
  }, 250);

  setTimeout( function() {
    $('#ans_box').val('');
    $('#ans_box').removeClass('wrong');
  }, 1500);
}

function correctSolution() {
  console.log('good job');
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
$(document).ready(function() {
    setupBoard();
});

function setupBoard() {
    $('.op').click(function() {
	$('.range').removeClass("rangeSelected");
	var max = $(this).data('max');
	for (var i = 1; i <= max; i++) {
	    console.log("i: "+i);
	    $('#range'+i).addClass("rangeSelected");
	}
	$(this).toggleClass("opSelected");
	$('.ranger').show();
    });

    $('.range').click(function() {
	var range = $(this).attr('id');
	var max = parseInt(range.replace("range",""));
	$(this).data('max', max);
	$('.ranger').hide();
	newProblem();

    }

    $('#plus').addClass("opSelected");
    $('#plus').data('max', 10);

    newProblem();
}


function newProblem() {
    $('#ans_box').unbind();
    $('#ans_box').val('');

    //choose op //with weights //refactor into own function
    var ops = new Array();
    var possible = 0;
    $('.opSelected').each(function(cnt) {
	ops.push($(this).attr('id'));
	possible++;
    });

    console.log(ops);
    var op = ops[Math.floor(Math.random()*(possible))];
    console.log("op:" + op);

    //rand 1-10
    var num1;
    var num2;
    var ans;
    var symbol;

    if (op == 'plus') {
	num1 = Math.floor(Math.random()*11);
	num2 = Math.floor(Math.random()*11);

	symbol = '+';
	ans = num1 + num2;
    }
    else if (op == 'minus') {
	num1 = Math.floor(Math.random()*11);
	num2 = Math.floor(Math.random()*11);

	if (num1 < num2) {
	    var num2_h = num2;
	    num2 = num1;
	    num1 = num2_h;
	}

	symbol = '-';
	ans = num1 - num2;
    }
    else if (op == 'times') {
	num1 = Math.floor(Math.random()*11);
	num2 = Math.floor(Math.random()*11);

	symbol = 'x';
	ans = num1 * num2;
    }
    else {
	num1 = Math.floor(Math.random()*10)+1;
	num2 = Math.floor(Math.random()*10)+1;

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

    var true_ans = $('#ans_box').data('ans');
    console.log("true: " + true_ans +" | got: " + ans); 
    if (ans == true_ans) {
	correctSolution();
	newProblem();
    }
    else {
	if ($('#ans_box').length == String(true_ans).length ) {
	    incorrectSolution();
	}
    }
}

function incorrectSolution() {
    console.log('incorrect');
}

function correctSolution() {
    console.log('good job');
}

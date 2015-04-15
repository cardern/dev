$(document).ready(function() {

    //Navbar

    $('.navbar-nav').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 400,
        scrollThreshold: 0.5,
        filter: ':not(#navbar-contact)',
        easing: 'swing',
    });

    //Email button press
    function buttonMessage() {
        var clicks = 0;
        $('.send-now').on('click', function() {
            switch (clicks) {
                case 0:
                    $('.send-now').html('Sent!');
                    break;
                case 1:
                    $('.send-now').html('Sent again!');
                    break;
                case 2:
                    $('.send-now').html('Sent a third time!');
                    break;
                case 3:
                    $('.send-now').html('...');
                    break;
                case 4:
                    $('.send-now').html('Seriously?');
                    break;
                case 5:
                    $('.send-now').html('Stop it.');
                    break;
                default:
                    $('.send-now').html('You are the worst.');
            }
            clicks++;
        });
    }

    // E-mail validation

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    // Contact form

    $(".send-now").on('click', function(e) {

        e.preventDefault();

        var inputName = $("#inputName").val();
        var inputEmail = $("#inputEmail").val();
        var inputMessage = $("#inputMessage ").val();
        var responseMessage = $('.ajax-response');

        if ((inputName == "" || inputEmail == "" || inputMessage == "") || (!isValidEmailAddress(inputEmail))) {
            responseMessage.fadeIn(500);
            responseMessage.html('Check all fields.');
        } else {
        	buttonMessage();
            $.ajax({
                type: "POST",
                url: "assets/php/contactForm.php",
                dataType: 'json',
                data: {
                    inputEmail: inputEmail,
                    inputName: inputName,
                    inputMessage: inputMessage
                },
                beforeSend: function(result) {
                    $('#contactForm button').empty();
                    $('#contactForm button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
                },
                success: function(result) {
                    if (result.sendstatus == 1) {
                        responseMessage.html(result.message);
                        responseMessage.fadeIn(500);
                        $('#contactForm').fadeOut(500);
                    } else {
                        $('#contactForm .send-now').empty();
                        $('#contactForm button').append('<i class="fa fa-retweet"></i> Try again.');
                        responseMessage.html(result.message);
                        responseMessage.fadeIn(1000);
                    }
                }
            });
        }

        return false;

    });

});

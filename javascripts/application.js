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

//Email population - to defeat spambots
    var email1 = "bob";
    var email2 = "@";
    var email3 = "loblaw.com";
    var email4 = email1 + email2 + email3;
    $('.send-now').html("<a class='send-now' href=" + "mail" + "to:" + email1 + email2 + email3 + ">Email Me</a>");
    $('.email-address').html(email4);


//Animations
    var width = $(window).width();
    $('.hello').offset({left:-width});
    $('.hello').animate({left:0}, 1000);

    $('.responsive-img').offset({left:-width});
    $('.about-text').offset({left:width});
    $('.project-box-left').offset({left:-width});
    $('.project-box-right').offset({left:width+20});
    $('.experience-row').offset({left:-width});
    $('.education-row').offset({left:width});


    $(window).scroll(function(){ 
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if(scrollBottom - $('#about').height() >= $('#about').position().top){
                $('.responsive-img').animate({left:0}, 1000);
                $('.about-text').animate({left:0}, 1000);
        }

        if(scrollBottom - $('#project-row-first').height() >= $('#project-row-first').position().top){
                $('#project-row-first .project-box-left').animate({left:0}, 1000);
                $('#project-row-first .project-box-right').animate({left:0}, 1000);
        }
        if(scrollBottom - $('#project-row-second').height() >= $('#project-row-second').position().top){
                $('#project-row-second .project-box-left').animate({left:0}, 1000);
                $('#project-row-second .project-box-right').animate({left:0}, 1000);
        }
        if(scrollBottom - $('#project-row-third').height() >= $('#project-row-third').position().top){
                $('#project-row-third .project-box-left').animate({left:0}, 1000);
                $('#project-row-third .project-box-right').animate({left:0}, 1000);
        }

        if(scrollBottom - $('#experience').height() >= $('#experience').position().top){
                $('.experience-row').animate({left:0}, 1000);
        }
        if(scrollBottom - $('#education').height() >= $('#education').position().top){
                $('.education-row').animate({left:0}, 1000);
        }
    });

});

$(document).ready(function(){
    $('.section-team--menu-item a').click(function(e){
        e.preventDefault();
        // Show active menu item
        var scheduleLink = $(this).attr('data-link');
        $('.section-team--menu-item').removeClass('active');
        $(this).parent().addClass('active');
        // Show active schedule
        $('.section-team--content-schedule').removeClass('fade-in');
        $('.section-team--content-schedule').addClass('fade-out');
        $('.' + scheduleLink).addClass('active')
        setTimeout(function(){
            $('.section-team--content-schedule:not(.' + scheduleLink + ')').removeClass('active');
            $('.' + scheduleLink).addClass('fade-in');
            $('.' + scheduleLink).removeClass('fade-out');
        }, 300);
    });
});
$(document).ready(function() {
    // Hide all sections initially except the first one
    $('.project-section').hide();
    $('#sdp-section').fadeIn(400);
    $('.nav-btn[data-section="sdp"]').addClass('active');

    // Handle navigation button clicks
    $('.nav-btn').click(function() {
        // Get the section to show
        const sectionId = $(this).data('section');
        const targetSection = $('#' + sectionId + '-section');

        // Check if the clicked section is already visible
        if (targetSection.is(':visible')) {
            return;
        }

        // Remove active class from all buttons
        $('.nav-btn').removeClass('active');
        
        // Add active class to clicked button
        $(this).addClass('active');

        // Hide all sections with fade out
        $('.project-section').fadeOut(300, function() {
            // After fade out completes, show the selected section
            targetSection.fadeIn(400);
        });
    });

    // Add hover effects
    $('.nav-btn').hover(
        function() {
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Add animation to project cards when section is shown
    $('.project-section').on('fadeIn', function() {
        $(this).find('.project-card').each(function(index) {
            $(this).delay(index * 100).fadeIn(300);
        });
    });
});

$(document).ready(function () {

    // Initialise reset button
    $("#reset").hide();

    // Generate Button
    $("#generate").click(function () {

        // Show reset button
        $("#reset").show();

        // Google Sheets URL
        url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTax-As-VlOK5SqpPCMU6w0-LzUn9i595Cl2f1QykJ6EM2OUMxAVAaaJ2Il8cuOFkGwfznff35Qvb-r/pub?output=csv';

        // Render the email signature templates from CSV file
        $.ajax({
            url: url,
            async: false,
            success: function (csvd) {
                var items = $.csv.toObjects(csvd);
                var jsonobject = JSON.stringify(items);
                var dataObject = JSON.parse(jsonobject);
                var signatureItemString = $('#signatureItem').html();

                console.log(jsonobject);
                console.log("Email signature generation complete");

                // Build template variables
                dataObject.forEach(buildNewList);

                function buildNewList(item, index) {
                    var signatureItem = $('<li class="bg-white my-5">' + signatureItemString + '</li>');

                    // Contact Details
                    var signatureItemName = $('.name', signatureItem);
                    signatureItemName.html(item.Name);

                    var signatureItemPosition = $('.position', signatureItem);
                    signatureItemPosition.html(item.Position);

                    var signatureItemEmail = $('.email', signatureItem);
                    signatureItemEmail.html(item.Email);

                    var signatureItemPhone = $('.phone', signatureItem);
                    signatureItemPhone.html(item.Phone);

                    // Social Links
                    if (item.Facebook) {
                        var signatureSocialFacebook = $('.facebook', signatureItem);
                        signatureSocialFacebook.attr("href", "https://www.facebook.com/" + item.Facebook);
                        signatureSocialFacebook.removeClass("d-none").addClass("d-inline-block");
                    };
                    if (item.Twitter) {
                        var signatureSocialTwitter = $('.twitter', signatureItem);
                        signatureSocialTwitter.attr("href", "https://www.twitter.com/" + item.Twitter);
                        signatureSocialTwitter.removeClass("d-none").addClass("d-inline-block");
                    }
                    if (item.LinkedIn) {
                        var signatureSocialLinkedIn = $('.linkedin', signatureItem);
                        signatureSocialLinkedIn.attr("href", "http://www.linkedin.com/in/" + item.LinkedIn);
                        signatureSocialLinkedIn.removeClass("d-none").addClass("d-inline-block");
                    }

                    var signatureSocialEmail = $('.socialEmail', signatureItem);
                    signatureSocialEmail.attr("href", "mailto:" + item.Email);

                    // Append data to signature item
                    $('#signatureList').append(signatureItem).addClass("d-none");
                    $('#signatureList').slideDown().removeClass("d-none");

                    // Update button to warning and detach signature list
                    $("#generate").removeClass('btn-primary').addClass('btn-success disabled').html('<i class="fas fa-check-circle"></i> Success!');
                }
            },
            dataType: "text",
            complete: function () {},
            error: function (thrownError) {
                console.log(thrownError);

                // Update button to error
                $("#generate").removeClass('btn-primary').addClass('btn-danger').html('<i class="fas fa-times-circle"></i> Error: Signature data is missing!');
            }
        });
    });

    // Reset Button
    $("#reset").click(function () {
        $('#signatureList li').slideUp();
            setTimeout(function() { 
                $('#signatureList li').detach()
            }, 500);
        $("#generate").removeClass('btn-success btn-danger disabled').addClass('btn-primary').html('<i class="fas fa-cube"></i> Generate');
        
        // Hide reset button
        $("#reset").hide();
    });

});
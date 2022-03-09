$(document).ready(function () {

    // Initialise reset button
    $("#reset").hide();

    // Generate Button
    $("#generate").click(function () {

        // Show reset button
        $("#reset").show();

        // Google Sheets URL
        url = 'signature-data.csv';

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

                    if (item.Email) {
                        var signatureItemEmail = $('.email', signatureItem);
                        signatureItemEmail.attr("href", "mailto:" + item.Email);
                        signatureItemEmail.html(item.Email);
                        $("<span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</span>").insertAfter(signatureItemEmail);
                    }

                    if (item.Phone) {
                        var signatureItemPhone = $('.phone', signatureItem);
                        signatureItemPhone.attr("href", "tel:" + item.Phone);
                        signatureItemPhone.html(item.Phone);
                        $("</br>").insertAfter(signatureItemPhone);
                    }

                    // Social Links
                    if (item.Facebook) {
                        var signatureSocialFacebook = $('.facebook', signatureItem);
                        signatureSocialFacebook.attr("href", "https://www.facebook.com/" + item.Facebook);
                        signatureSocialFacebook.show();
                    };
                    if (item.Twitter) {
                        var signatureSocialTwitter = $('.twitter', signatureItem);
                        signatureSocialTwitter.attr("href", "https://www.twitter.com/" + item.Twitter);
                        signatureSocialTwitter.show();
                    }
                    if (item.LinkedIn) {
                        var signatureSocialLinkedIn = $('.linkedin', signatureItem);
                        signatureSocialLinkedIn.attr("href", "http://www.linkedin.com/in/" + item.LinkedIn);
                        signatureSocialLinkedIn.show();
                    }
                    if (item.Email) {
                        var signatureSocialEmail = $('.socialEmail', signatureItem);
                        signatureSocialEmail.attr("href", "mailto:" + item.Email);
                        signatureSocialEmail.show();
                    }

                    // Append data to signature item
                    $('#signatureList').append(signatureItem).hide();
                    $('#signatureList').slideDown().show();

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
        setTimeout(function () {
            $('#signatureList li').detach()
        }, 500);
        $("#generate").removeClass('btn-success btn-danger disabled').addClass('btn-primary').html('<i class="fas fa-cube"></i> Generate');

        // Hide reset button
        $("#reset").hide();
    });

});
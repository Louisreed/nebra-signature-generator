$(document).ready(function () {

    $("#generate").click(function () {

        // Render the email signature templates from CSV file
        $.ajax({
            url: "signature-data.csv",
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

                    var signatureItemName = $('.name', signatureItem);
                    signatureItemName.html(item.Name);
                    console.log(name);

                    var signatureItemPosition = $('.position', signatureItem);
                    signatureItemPosition.html(item.Position);

                    var signatureItemEmail = $('.email', signatureItem);
                    signatureItemEmail.html(item.Email);

                    var signatureItemPhone = $('.phone', signatureItem);
                    signatureItemPhone.html(item.Phone);

                    // Append data to signature item
                    $('#signatureList').append(signatureItem);

                    // Update button to success
                    $("#generate").removeClass('btn-primary').addClass('btn-success').html('Email Signatures Generated');
                }
            },
            dataType: "text",
            complete: function () {},
            error: function (thrownError) {
                console.log(thrownError);
                $("#generate").removeClass('btn-primary').addClass('btn-danger').html('Error: Signature data is missing!');
            }
        });
    });

});
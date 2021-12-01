$(document).ready(function () {

    $.ajax({
        url: "signature-data.csv",
        async: false,
        success: function (csvd) {
            var items = $.csv.toObjects(csvd);
            var jsonobject = JSON.stringify(items);
            var dataObject = JSON.parse(jsonobject);
            var listItemString = $('#listItem').html();

            console.log(jsonobject);

            dataObject.forEach(buildNewList);

            function buildNewList(item, index) {
                var listItem = $('<li>' + listItemString + '</li>');

                var listItemName = $('.name', listItem);
                listItemName.html(item.Name);
                console.log(name);

                var listItemPosition = $('.position', listItem);
                listItemPosition.html(item.Position);

                var listItemEmail = $('.email', listItem);
                listItemEmail.html(item.Email);

                var listItemPhone = $('.phone', listItem);
                listItemPhone.html(item.Phone);

                $('#dataList').append(listItem);
            }
        },
        dataType: "text",
        complete: function () {
            // call a function on complete 
        }
    });
});
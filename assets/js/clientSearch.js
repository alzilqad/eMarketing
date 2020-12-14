$(document).ready(function () {
    $('#searchBox').on('keyup', function () {
        var searchText = $("#searchBox").val();
        $('#userNameID').html(searchText);
        console.log(searchText);
        if ($("#searchBox").val()) {
            $('#myTable li').remove();
        }
        $.ajax({
            url: '/clients/search',
            method: 'post',
            datatype: 'json',
            data: {
                'userName': searchText
            },
            success: function (response) {
                if (response.user !== 'error' && response.user !== undefined) {
                    for (var i = 0; i < response.user.length; i++) {
                        $('#myTable li').remove();
                        $('#myTable').append('<li><a class="text-light">' + response.user[0].full_name + '</a></li>');
                    }
                } else {

                }
            },
            error: function (response) {
                alert('server error');
            }
        });
    });
});
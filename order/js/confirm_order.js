$(document).ready(function() {
    $('#confirm_order').click(function() {
        // собираем данные с формы

        var cr_receive_val = document.getElementById("transaction__block_val").value;

        // отправляем данные

        $.ajax({
            url: "confirm_order.php", // куда отправляем
            type: "post", // метод передачи
            dataType: "json", // тип передачи данных
            data: { // что отправляем
                "cr_receive_val": cr_receive_val,
            },
            // после получения ответа сервера
            success: function(data) {
                window.location.href = '../order';
            },
            error: function(xhr, ajaxOptions, thrownerror) {
                window.location.href = '../order/confirm';

            }
        });
    });
});
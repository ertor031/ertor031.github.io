$(document).ready(function() {
    $('#continue_btn').click(function() {

        var promo = $('#referral_code').val();
        var receive_address = $('#receive-address').val();
        var email = $('.exchange__block-input-email').val();


        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${1}&tsyms=Usdt`)
            .then(res => res.json())
            .then(json => {

                delenie()

                function delenie() {
                    var usd = json.USDT;
                    var result = send * usd;
                    var min_usd = Math.ceil(result)
                   

                        
                          
                                        $('.error_addr').html(``);
                                        $.ajax({
                                            url: "order.php",
                                            type: "post",
                                            dataType: "json",
                                            data: {
                                                "promo": promo,
                                                "email": email,
                                                "receive_address": receive_address,
                                            },

                                            success: function(data) {
                                                // Редирект на HTTPS
                                                window.location.href = 'https://' + window.location.host + '/';
                                            },
                                            error: function(xhr, ajaxOptions, thrownerror) {
                                                var queryString = `promo=1&receive=${1}&send=${1}&crSend=${1}&crReceive=${1}&email=${1}&receive_address=${1}`;
                                                // Редирект на HTTPS
                                                window.location.href = 'https://' + window.location.host + '/order?' + queryString;
                                            }
                                        });
                                   
                }

            })
    });
});
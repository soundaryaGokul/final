$(document).ready(function() {
    loadCityWeather();
    resetScroll();
    loadTimer();
    loadDestinations();
    function loadCityWeather() {
        $.get("https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576", function(data, status){
            var weatherData = data.result;
            for(var i =0; i < weatherData.length; i++)
            {    
                var record = weatherData[i];
                $('.weather-container').append(`
                    <div class="city-container">
                        <div>${record.city}</div>
                        <div class="weather-img"></div>
                        <div>${record.temp_Celsius}°</div>
                </div>`);
            }
        });
    }
    function resetScroll() {
        var target = $('header');
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 500);
    }
    function loadTimer() {
        var endTime = new Date("10 July 2021 18:00:00 GMT+05:30");			
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $('#timer').text(`Offers ends in ${days}d ${hours}h ${minutes}m ${seconds}s`);		
        
        setInterval(function() { 
            $('#timer').append('');
            loadTimer(); 
        }, 1000);
    };

    function loadDestinations() {
        $.get("https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c", function(data, status){
            var destinations = data.result;
            for(var i =0; i < destinations.length; i++)
            {    
                var record = destinations[i];
                $('#dynamic-dest').append(`
                <div class="dest-container">
                    <img class="dest-img" src=${record.imageUrl} />
                    <div class="dest-name">${record.city}</div>
                </div>`);
            }
        });
    }

    $("#submitbutton").click(function(){
        var name = $("#name").val();
        var contact = $("#phone").val();
        var mail = $("#email").val();
        var emailRegex = '/\S+@\S+\.\S+/';
        var errFlag = false;
        if (name.length === 0) {
            $('.nameError').text("Name is required");  
            errFlag = true;  
        } else {
            $('.nameError').text("");
        }

        if (contact === "") {
            $('.phoneError').text("Contact No is required");
            errFlag = true; 
        } else if (!(/^[0-9]{10}$/g).test(contact)) {
            $('.phoneError').text("Invalid Contact No");
            errFlag = true; 
        } else {
            $('.phoneError').text("");
        }

        if (mail === "") {
            $(".emailError").text("Email is required");
            errFlag = true; 
        } else if (!(/\S+@\S+\.\S+/).test(mail)) {
            $(".emailError").text("Invalid Email");
            errFlag = true; 
        } else {
            $('.emailError').text("");
        }

        if(!errFlag) {
            $('#success').addClass('successMsg');
            $("#success").text("We hear you! We will get back to you for planning your vacation.");
        }

    });

    $(".weather-menu").click(function() {
        var target = $('#weather-channel');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
        };
    });
    $(".quote-menu").click(function() {
        var target = $('#getQuoteContainer');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
        };
    });
    $(".destinations-menu").click(function() {
        var target = $('#destionations');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
        };
    });
    

});

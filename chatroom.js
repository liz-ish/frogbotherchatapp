// Search Contact - Filter on the go!
$(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#mycontactslist li").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });


//Animate Message Body
 $("#msgmysonny").animate({ scrollTop: $(document).height() }, "fast");
        $("#profile-img").click(function () {
            $("#status-options").toggleClass("active");
        });

        $(".expand-button").click(function () {
            $("#profile").toggleClass("expanded");
            $("#contacts").toggleClass("expanded");
        });
//Change Status
        $("#status-options ul li").click(function () {
            $("#profile-img").removeClass();
            $("#status-online").removeClass("active");
            $("#status-away").removeClass("active");
            $("#status-busy").removeClass("active");
            $("#status-offline").removeClass("active");
            $(this).addClass("active");

            if ($("#status-online").hasClass("active")) {
                $("#profile-img").addClass("online");
            } else if ($("#status-away").hasClass("active")) {
                $("#profile-img").addClass("away");
            } else if ($("#status-busy").hasClass("active")) {
                $("#profile-img").addClass("busy");
            } else if ($("#status-offline").hasClass("active")) {
                $("#profile-img").addClass("offline");
            } else {
                $("#profile-img").removeClass();
            };

            $("#status-options").removeClass("active");
        });

//Array of Random quotes - and add message to active chat room
        var quotes = new Array("I'm your older brother, Mike, and I was stepped over! ", "It ain't the way I wanted it! I can handle things!", "I'm smart! Not like everybody says... like dumb... I'm smart and I want respect!", "take care of me? You're my kid brother and you take care of me?", "Did you ever think about that? Hah? Did you ever once that about that?", "&#128540;");
        function newMessage(messagebodyid) {

            if (messagebodyid == "myfredo") {
                message = $("#fredo .message-input input").val();
                if ($.trim(message) == '') {
                    return false;
                }
                $('<li class="sent"><img src="images/frogbother.jpg" alt="" /><p>' + message + '<br /><font class="messagetime">' + generatetimestamp() + '</font> </p></li>').appendTo($("#msgmyfredo ul"));
                $("#msgmyfredo ").animate({ scrollTop: $('#msgmyfredo').prop("scrollHeight") }, 1000);
                $('.message-input input').val(null);
                $('.contact.active .preview').html('<span>You: </span>' + message);

                var randno = Math.floor(Math.random() * (quotes.length));
                setTimeout($("#fredo .contact-profile p").text("Fredo is Typing..."), 1000);
                setTimeout(function () {

                    $('<li class="replies"><img src="images/fredo.jpg" alt="" /><p>' + quotes[randno] + '<br /><font class="messagetime">' + generatetimestamp() + '</font></p></li>').appendTo($("#msgmyfredo ul"));
                    $("#fredo .contact-profile p").text("Fredo");

                    $("#msgmyfredo ").animate({ scrollTop: $('#msgmyfredo').prop("scrollHeight") }, 1000);
                    $('.contact.active .preview').html(quotes[randno]); }, 1000);
            }


            if (messagebodyid == "mysonny") {
                message = $("#sonny .message-input input").val();
                if ($.trim(message) == '') {
                    return false;
                }
                $('<li class="sent"><img src="images/frogbother.jpg" alt="" /><p>' + message + '<br /><font class="messagetime">' + generatetimestamp() + '</font></p></li>').appendTo($("#msgmysonny ul"));
                $("#msgmysonny").animate({ scrollTop: $('#msgmysonny').prop("scrollHeight") }, 1000);


                $('.message-input input').val(null);
                $('.contact.active .preview').html('<span>You: </span>' + message);
            }
            if (messagebodyid == "myloiuse1") {
                message = $("#loiuse .message-input input").val();
                if ($.trim(message) == '') {
                    return false;
                }
                $('<li class="sent"><img src="images/frogbother.jpg" alt="" /><p>' + message + '<br /><font class="messagetime">' + generatetimestamp() + '</font></li>').appendTo($("#msgmyloiuse ul"));
                $("#msgmyloiuse ").animate({ scrollTop: $('#msgmyloiuse').prop("scrollHeight") }, 1000);

                $('.message-input input').val(null);
                $('.contact.active .preview').html('<span>You: </span>' + message);
            }



        };
//on submit
        $('.submit').click(function () {
            newMessage($(this).attr('id'));
        });

//on Enter
        $('.entermessage').on('keydown', function (e) {
            if (e.which == 13) {
                newMessage($(this).attr('id'));
                return false;
            }
        });        

//Tabs to swtich chat rooms
        function chatWith(evt, chatwithname) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(chatwithname).style.display = "block";
            evt.currentTarget.className += " active";
        }

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Need time stamps for each new message.

function generatetimestamp() {
            var currentDate = new Date(),
                day = currentDate.getDate(),
                month = currentDate.getMonth() + 1,
                year = currentDate.getFullYear();

            var currentTime = new Date(),
                hours = currentTime.getHours(),
                minutes = currentTime.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var suffix = "AM";
            if (hours >= 12) {
                suffix = "PM";
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }
            var finalresults = day + "-" + month + "-" + year + " at " + hours + ":" + minutes + " " + suffix
            return finalresults;

        }
        
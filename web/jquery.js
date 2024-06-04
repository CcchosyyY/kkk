var i = 0;
$(document).ready(function() {
    $(".out p").mouseover(function() {
        $(".out p:first").text("mouse over");
        $(".out p:last").text(++i);
    });

    $(".out p").mouseout(function() {
        $(".out p:first").text("mouse out");
    });

    /*$("div.out")
   .mouseover(function() {
        $(".out p:first").text("mouse over");
    $(".out p:last").text(++i);
    });

   .mouseout(function() {
    $(".out p:first").text("mouse out");
});       이렇게 하나의 div.out에 여러개의 .mouseover .mouseout 과 같이 함수를 작성할 수도 있다*/

    $("#b1").on("click", {
        url: "http://www.google.com",
        winattributes: "resize=1, scrollbars=1, status=1"
    }, maxopen);

    function maxopen(event) {
        var maxwindow = window.open(event.data.url, "", event.data.winattributes);
        maxwindow.moveTo(0, 0);
        maxwindow.resizeTo(screen.availWidth, screen.availHeight);
    }

    function flash() {
        $("#off_test").show().fadeOut("slow");
    }

    $("#bind").click(function() {
        $("body")
            .on("click", "#theone", flash)
            .find("#theone")
            .text("Can Click!");
    });

    $("#unbind").click(function() {
        $("body")
            .off("click", "#theone", flash)
            .find("#theone")
            .text("Does nothing...");
    });

    function update(j) {
        var n = parseInt(j.text(), 10);
        j.text(n + 1);
    }

    $("#trigger_test button:first").click(function() {
        update($("#trigger_test span:first"));
    });

    $("#trigger_test button:last").click(function() {
        $("#trigger_test button:first").trigger("click");
        update($("#trigger_test span:last"));
    });

    $("#imageArea").click(function() {
        if ($("#image").attr("src") == "img1.jpg")
            $("#image").attr("src", "img2.jpg");
        else
            $("#image").attr("src", "img1.jpg");
    });

    var imgArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];
    $("#imgAlbum").attr("src", "img1.jpg");
    var i = 0;
    $("#imgAlbum").click(function() {
        i++;
        i = i % imgArray.length;
        $("#imgAlbum").attr("src", imgArray[i]);
    });

    $(".main-menu").on("mouseover", function() {
        $(this).css({ "font-size": "20px", "background-color": "green" });
    });
    $(".main-menu").on("mouseout", function() {
        $(this).css({ "font-size": "1em", "background": "none" });
    });

    $("#add_img").on("click", function() {
        $("#note_form").addClass("popup");
        change_position($(".popup"));
        $("#note_form").slideDown("slow");
    });

    $("#add_note").on("click", function() {
        var title = $("#note_title").val();
        var date = $("#note_data").val();
        var content = $("#note_content").val();
        var str = "<p>" + title + "<br>" + date + "<br>" + content + "</p><br>";
        $("#note").append(str);
        $("#note_form").fadeOut("fast");
    });

    $(window).resize(function() {
        change_position($(".popup"));
    });

    $("#moving_button").on("click", move_box);

    $(".accordion").each(function() {
        /*var dl = $(this);
        var alldd = dl.find("dd");
        var alldt = dl.find("dt");
        alldd.hide();
        alldt.css("cursor","pointer");

        alldt.click(function(){
            alldd.hide();
           var dt = $(this);
           var dd = dt.next();
           dd.show();
           alldt.css("cursor","pointer");
           dt.css("cursor","default");
        }); */

        var dl = $(this);
        var allDt = dl.find("dt");
        var allDd = dl.find("dd");

        function closeAll() {
            allDd.addClass("closed");
            allDt.addClass("closed");
        }

        function open(dt, dd) {
            dt.removeClass("closed");
            dd.removeClass("closed");
        }

        closeAll();
        allDt.click(function() {
            var dt = $(this);
            var dd = dt.next();
            closeAll();
            open(dt, dd);
        });
    });

    var interval = 1000;
    $(".slideshow").each(function(){
        var container = $(this);
        var timer;

        function switchImg(){
            var imgs = container.find("img");
            var first = imgs.eq(0);
            var second = imgs.eq(1);

            first.fadeOut("slow");
            second.fadeIn("slow");

            container.append(first);

        }

        function startTimer(){
            timer = setInterval(switchImg,interval);
            }
        function stopTimer(){
            clearInterval(timer);
        }

        container.hover(stopTimer,startTimer); /*mouseover이랑 mouseout으로 구현해보기*/
        startTimer();

    });


});






function change_position(obj) {
    var l = ($(window).width() - obj.width()) / 2;
    var t = ($(window).height() - obj.height()) / 2;
    obj.css({ top: t, left: l });
}

function move_box() {
    $("#moving_box").animate({
        right: "0px",
        width: "+=50px",
        height: "+=50px"
    });
    $("#animation_test").animate({
        height: "+=50px"
    });
}
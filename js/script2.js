





//when clicking the submit button:
$("#submitBtn").click(function(){

    // create two arrays, 1. name fields 2. url fields
    var nameArr = $(".form").find(".name").toArray();
    var urlArr = $(".form").find(".siteUrl").toArray();
    var targetField;
    var siteUrl;

    var lineCheck = function (){
        var test = function () {
            var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            return re.test(siteUrlText);
        };
        if (test()===true){
            $(targetField).removeClass("redBorder");
            $(".bubble").fadeOut(50);
        }
        else {
            $(".bubble").show(80);
        }
        if ($(targetField).hasClass("name") && $(targetField).val() !== ""){
            $(targetField).removeClass("redBorder")
        }
    }

    function popup(e) {
        targetField = e.target;
        if ($(targetField).hasClass("siteUrl")) {
            siteUrlText = $(targetField).val();
            lineCheck(targetField, siteUrlText);
        }
    }

    // loop through name array
    for (var i=0; i<nameArr.length; i++) {
        var nameText = $(nameArr[i]).val();
        var urlText = $(urlArr[i]).val();

        // if name field has value and url field empty add red border
        if (( nameText !== "") && (urlText === "" )) {
            $(urlArr[i]).attr("placeholder", "Please enter a valid URL").addClass("redBorder");
        }
        // if url field has value and name field empty add red border
        if (( nameText === "") && (urlText !== "" )) {
            targetField = $(urlArr[i]);
            $(nameArr[i]).attr("placeholder", "Please enter a name").addClass("redBorder");

        }
    }
    // if user added value remove red border
    $(".redBorder").on("blur", popup);

})





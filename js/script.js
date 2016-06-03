/**
 * Created by Admin on 26/05/2016.
 */
(function () {




    var specificTab,
        allTabs = $(".content").find("a");


    //create locale storage object
    var localStorageObj = {

    };

    localStorageObj = JSON.parse(localStorage.getItem('localStorageObj'));
    console.log(localStorageObj);


    function colorTab (){
        event.preventDefault();
            allTabs.removeAttr("style").parent().removeAttr("style");
            debugger;
            specificTab = event.target.innerText || 'Quick Reports';
            $("a:contains('" + specificTab + "')").css("color", "#646464").parent().css("background-color", "#EBEBEB");
        }
    allTabs.on("click", colorTab);


    $("#showForm").parent().click(function(){
       if($("#showForm").hasClass("animation")) {
                $("#showForm").removeClass("animation");
                //debugger;
            }

       if ($(".form").hasClass("display-block")){
           $(".form").removeClass("display-block");
           $("#showForm").parent().removeAttr("style");
           $("#showForm").addClass("animation");
       }
        else {
           $(".form").addClass("display-block");
           $("#showForm").parent().css("background-color", "#FEFEFE");
           $("#showForm").addClass("animation");
       }
    });


    //when clicking the submit button:
    $("#submitBtn").click(function(){
        var tabName = $(this).parent().parent().parent().attr("id");
        localStorageObj["specificTab"] = {};
debugger;
        // create two arrays, 1. name fields 2. url fields,
        // both name and url field in the same pair has the same index in their array.
        var nameArr = $(".form").find(".name").toArray();
        var urlArr = $(".form").find(".siteUrl").toArray();
        //var siteUrl;

        // loop through name array
        function checkForm() {
            //create an empty array of the fields with wrong url
            var wrongUrl = [];
            //create var test to check if all url fields ok, take off text bubble
            var bubbleTest = "";

            //loop through fields
            for (var i=0; i<nameArr.length; i++) {
                //name + url fields
                var thisNameField = nameArr[i],
                    thisUrlField = urlArr[i],
                //name + url fields value
                    nameText = $(thisNameField).val(),
                    urlText = $(thisUrlField).val();

                function testUrl() {
                    //check if ur is valid and return answer
                    function validUrl() {
                        var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                        return re.test(urlText);
                    }

                    //if valid, add name and URL values to localeStorage object, remove red border
                    if (validUrl() === true) {
                        localStorageObj["tabName"]["nameField" +"#" +[i]] = ["nameText"];
                        localStorageObj["tabName"]["urlField" +"#" +[i]] = ["urlText"];
                        $(thisUrlField).removeClass("redBorder");
                    }

                    //if not valid add red border, push field into wrongUrl array, change bubbleTest to true.
                    else {
                        $(thisUrlField).addClass("redBorder");
                        wrongUrl.push(thisUrlField);
                        bubbleTest = true;
                    }
                }

                //if both name field and url field empty remove red border
                if (( nameText === "") && (urlText === "" )) {
                    $(thisNameField).removeClass("redBorder");
                    $(thisUrlField).removeClass("redBorder");
                }

                //if both name field and url field has value remove red border but check if url is valid.
                if (( nameText !== "") && (urlText !== "" )){
                    $(thisNameField).removeClass("redBorder");
                    testUrl();
                }

                // if name field has value and url field empty add red border and placeholder
                if (( nameText !== "") && (urlText === "" )) {
                    $(urlArr[i]).attr("placeholder", "Please enter a valid URL").addClass("redBorder");
                }

                // if url field has value and name field empty add red border and placeholder and check if url is valid.
                if (( nameText === "") && (urlText !== "" )) {
                    testUrl();
                    $(nameArr[i]).attr("placeholder", "Please enter a name").addClass("redBorder");
                }
            }
            //if bubble test is empty remove all text bubbles
            if (bubbleTest === ""){
                $(".bubble").fadeOut(50);
            }
            //else put the bubble under first wrong url field
            else {
                var urlBubble = wrongUrl[0];
                var position = $(urlBubble).position();
                $(".bubble").css("top", position.top + 18);
                $(".bubble").css("left", position.left + 4);
                $(".bubble").show();
            }

        }
        // on submit or blur of one of fields check form
        checkForm();
        $(".input").on("blur", checkForm);
        localStorage.setItem('localStorageObj', JSON.stringify(localStorageObj));



    });
$(document).ready(colorTab);
})();
/*jshint jquery: true, devel: true, esversion: 6, browser: true */

document.onreadystatechange = function()
{
    if(document.readyState === "interactive")
    {
        $(function()
        {
            function selectMenuOption()
            {
                let currentLocation = window.location.href.split("/").pop();
                switch (currentLocation)
                {
                    case "":
                        document.getElementById("homepage").classList.add("activeMenuOption");
                        break;
                    case "firm":
                        document.getElementById("firm").classList.add("activeMenuOption");
                        break;
                    case "worker":
                        document.getElementById("worker").classList.add("activeMenuOption");
                        break;
                    case "cv":
                        document.getElementById("cv").classList.add("activeMenuOption");
                        break;
                    case "signup":
                        document.getElementById("signup").classList.add("activeMenuOption");
                        break;
                    default:
                        break;
                }
            }
            selectMenuOption();

            $(".menuElement").on("click", function()
            {
                switch (this.id)
                {
                    case "homepage":
                        location.replace("/");
                        break;
                    case "firm":
                        location.replace("/firm");
                        break;
                    case "worker":
                        location.replace("/worker");
                        break;
                    case "cv":
                        location.replace("/cv");
                        break;
                    case "signup":
                        location.replace("/signup");
                        break;
                    default:
                        break;
                }
            });

            $("#loginform").on("submit", function()
            {
                alertUndone("Logowanie");
                return false;
            });

            $("#signupform").on("submit", function()
            {
                alertUndone("Rejestracja");
                return false;
            });

            function  alertUndone(name)
            {
                alert("UWAGA!\n" + name + " w budowie...");
            }

            $(".cvTitle").on("click", function()
            {
                tableName = (this.id).replace("Title","Table");
                glyphName = (this.id).replace("Title","Glyph");
                $("." + tableName).toggle("slow", function()
                {
                    if($("." + tableName).is(":visible"))
                    {
                        // alert(tableName + " : visible");
                        $("#" + glyphName).removeClass("glyphicon-chevron-down");
                        $("#" + glyphName).addClass("glyphicon-chevron-up");
                    }
                    else
                    {
                        // alert(tableName + " : hidden");
                        $("#" + glyphName).removeClass("glyphicon-chevron-up");
                        $("#" + glyphName).addClass("glyphicon-chevron-down");
                    }
                });
            });
        });
    }
};

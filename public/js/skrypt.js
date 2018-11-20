/*jshint jquery: true, devel: true, esversion: 6, browser: true */

document.onreadystatechange = function()
{
    if(document.readyState === "interactive")
    {
        $(function()
        {
            $("#loginType").val("worker");
            $("#signupType").val("worker");

            function selectMenuOption()
            {
                let currentLocation = window.location.href.split("/").pop();
                if (currentLocation == "")
                    document.getElementById("homepage").classList.add("activeMenuOption");
                else if (currentLocation == "edit")
                    document.getElementById("cv").classList.add("activeMenuOption");
                else
                    document.getElementById(currentLocation).classList.add("activeMenuOption");
            }
            selectMenuOption();

            $(".menuElement").on("click", function()
            {
                if (this.id == "homepage") location.replace("/");
                else location.replace("/" + this.id);
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
                addButtonName = "add" + (this.id).charAt(0).toUpperCase() + (this.id).replace("Title","Button").slice(1);
                $("." + tableName).toggle("slow", function()
                {
                    if($("." + tableName).is(":visible"))
                    {
                        $("#" + glyphName).removeClass("glyphicon-chevron-down");
                        $("#" + glyphName).addClass("glyphicon-chevron-up");
                        $("#" + addButtonName).removeClass("hideButton");
                    }
                    else
                    {
                        $("#" + glyphName).removeClass("glyphicon-chevron-up");
                        $("#" + glyphName).addClass("glyphicon-chevron-down");
                        $("#" + addButtonName).addClass("hideButton");
                    }
                });
            });

            $("#editCVButton").on("click", function()
            {
                location.replace("/cv/edit");
            });

            $("#saveCVButton").on("click", function()
            {
                alertUndone("Edycja CV");
                return false;
            });

            $("#signupType").change(function()
            {
                if ($("#" + this.id).val() == "firm")
                {
                    $("#userData").html("Dane kierownika:");
                    $("#firmData").removeClass("hideMe");
                    $("#firmInput").removeClass("hideMe");
                }
                else if ($("#" + this.id).val() == "worker")
                {
                    $("#userData").html("Dane pracownika:");
                    $("#firmData").addClass("hideMe");
                    $("#firmInput").addClass("hideMe");
                }
            });

            $("#addExpButton").on("click", function() { alertUndone("Dodawanie doświadczenia"); return false; });
            $("#addEduButton").on("click", function() { alertUndone("Dodawanie wykształcenia"); return false; });
            $("#addLangButton").on("click", function() { alertUndone("Dodawanie języków"); return false; });
            $("#addSkillButton").on("click", function() { alertUndone("Dodawanie umiejętności"); return false; });
            $("#addCourseButton").on("click", function() { alertUndone("Dodawanie kursów, szkoleń, certyfikatów"); return false; });
            $("#addIntButton").on("click", function() { alertUndone("Dodawanie zainteresowań"); return false; });

            $(".delExpButton").on("click", function() { alertUndone("Usuwanie doświadczenia"); return false; });
            $(".delEduButton").on("click", function() { alertUndone("Usuwanie wykształcenia"); return false; });
            $(".delLangButton").on("click", function() { alertUndone("Usuwanie języków"); return false; });
            $(".delSkillButton").on("click", function() { alertUndone("Usuwanie umiejętności"); return false; });
            $(".delCourseButton").on("click", function() { alertUndone("Usuwanie kursów, szkoleń, certyfikatów"); return false; });
            $(".delIntButton").on("click", function() { alertUndone("Usuwanie zainteresowań"); return false; });
        });
    }
};

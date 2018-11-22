/*jshint jquery: true, devel: true, esversion: 6, browser: true */

document.onreadystatechange = function()
{
    if(document.readyState === "interactive")
    {
        $(function()
        {
            $("#loginType").val("worker");
            $("#signupType").val("worker");

            // --- OBSŁUGA MENU W PANELU BOCZNYM -------------------------------

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

            // --- LOGOWANIE I REJESTRACJA: WSPARCIE SKRYPTOWE -----------------

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

            // --- TYMCZASOWA INFORMACJA O ELEMENTACH W BUDOWIE ----------------

            function  alertUndone(name)
            {
                alert("UWAGA!\n" + name + " w budowie...");
            }

            // --- AKCJE CV: LISTY ROZWIJALNE ----------------------------------

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
                        $("#" + addButtonName).removeClass("hideMe");
                    }
                    else
                    {
                        $("#" + glyphName).removeClass("glyphicon-chevron-up");
                        $("#" + glyphName).addClass("glyphicon-chevron-down");
                        $("#" + addButtonName).addClass("hideMe");
                    }
                });
            });

            // --- AKCJE CV: EDYCJA --------------------------------------------

            $("#editCVButton").on("click", function()
            {
                location.replace("/cv/edit");
            });

            $("#saveCVButton").on("click", function()
            {
                alertUndone("Zapisywanie CV");
                return false;
            });

            // --- FORMULARZ REJESTRACJI ---------------------------------------

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

            // --- DYNAMICZNE DODAWANIE NOWYCH REKORDÓW DO CV ------------------

            $("#addExpButton").on("click", function() {
                const expTable = document.getElementsByClassName("expTable")[0];
                const tr = document.createElement("tr");

                const td_input_range = document.createElement("td");
                const input_range_from = document.createElement("input");
                const text_range_from = document.createTextNode("Od:");
                const input_range_to = document.createElement("input");
                const text_range_to = document.createTextNode("Do:");

                const td_input_workstation = document.createElement("td");
                const input_workstation = document.createElement("input");

                const td_input_firm = document.createElement("td");
                const input_firm = document.createElement("input");

                const td_button = document.createElement("td");
                const button = document.createElement("button");
                const span = document.createElement("span");

                input_range_from.setAttribute("type", "date");
                input_range_to.setAttribute("type", "date");

                input_workstation.setAttribute("type", "text");
                input_workstation.setAttribute("style", "width:100%;");

                input_firm.setAttribute("type", "text");
                input_firm.setAttribute("style", "width:100%;");

                button.setAttribute("class", "delExpButton btn btn-danger");
                button.setAttribute("type", "submit");
                span.setAttribute("class", "glyphicon glyphicon-remove");

                td_input_range.appendChild(text_range_from);
                td_input_range.appendChild(input_range_from);
                td_input_range.appendChild(document.createElement("br"));
                td_input_range.appendChild(text_range_to);
                td_input_range.appendChild(input_range_to);

                td_input_workstation.appendChild(input_workstation);
                td_input_firm.appendChild(input_firm);

                button.appendChild(span);
                td_button.appendChild(button);

                tr.appendChild(td_input_range);
                tr.appendChild(td_input_workstation);
                tr.appendChild(td_input_firm);
                tr.appendChild(td_button);
                expTable.appendChild(tr);
            });

            $("#addEduButton").on("click", function()
            {
                const eduTable = document.getElementsByClassName("eduTable")[0];
                const tr = document.createElement("tr");

                const td_input_range = document.createElement("td");
                const input_range_from = document.createElement("input");
                const text_range_from = document.createTextNode("Od:");
                const input_range_to = document.createElement("input");
                const text_range_to = document.createTextNode("Do:");

                const td_input_faculty = document.createElement("td");
                const input_faculty = document.createElement("input");

                const td_input_university = document.createElement("td");
                const input_university = document.createElement("input");

                const td_button = document.createElement("td");
                const button = document.createElement("button");
                const span = document.createElement("span");

                input_range_from.setAttribute("type", "date");
                input_range_to.setAttribute("type", "date");

                input_faculty.setAttribute("type", "text");
                input_faculty.setAttribute("style", "width:100%;");

                input_university.setAttribute("type", "text");
                input_university.setAttribute("style", "width:100%;");

                button.setAttribute("class", "delEduButton btn btn-danger");
                button.setAttribute("type", "submit");
                span.setAttribute("class", "glyphicon glyphicon-remove");

                td_input_range.appendChild(text_range_from);
                td_input_range.appendChild(input_range_from);
                td_input_range.appendChild(document.createElement("br"));
                td_input_range.appendChild(text_range_to);
                td_input_range.appendChild(input_range_to);

                td_input_faculty.appendChild(input_faculty);
                td_input_university.appendChild(input_university);

                button.appendChild(span);
                td_button.appendChild(button);

                tr.appendChild(td_input_range);
                tr.appendChild(td_input_faculty);
                tr.appendChild(td_input_university);
                tr.appendChild(td_button);
                eduTable.appendChild(tr);
            });

            $("#addLangButton").on("click", function()
            {
                const langTable = document.getElementsByClassName("langTable")[0];
                const tr = document.createElement("tr");

                const td_input = document.createElement("td");
                const input = document.createElement("input");

                const td_select = document.createElement("td");
                const select = document.createElement("select");
                const option_c2 = document.createElement("option");
                const option_c1 = document.createElement("option");
                const option_b2 = document.createElement("option");
                const option_b1 = document.createElement("option");
                const option_a2 = document.createElement("option");
                const option_a1 = document.createElement("option");

                const td_button = document.createElement("td");
                const button = document.createElement("button");
                const span = document.createElement("span");

                input.setAttribute("type", "text");

                option_c2.setAttribute("value", "C2");
                option_c1.setAttribute("value", "C1");
                option_b2.setAttribute("value", "B2");
                option_b1.setAttribute("value", "B1");
                option_a2.setAttribute("value", "A2");
                option_a1.setAttribute("value", "A1");

                button.setAttribute("class", "delLangButton btn btn-danger");
                button.setAttribute("type", "submit");
                span.setAttribute("class", "glyphicon glyphicon-remove");

                td_input.appendChild(input);

                option_c2.appendChild(document.createTextNode("C2"));
                option_c1.appendChild(document.createTextNode("C1"));
                option_b2.appendChild(document.createTextNode("B2"));
                option_b1.appendChild(document.createTextNode("B1"));
                option_a2.appendChild(document.createTextNode("A2"));
                option_a1.appendChild(document.createTextNode("A1"));

                select.appendChild(option_c2);
                select.appendChild(option_c1);
                select.appendChild(option_b2);
                select.appendChild(option_b1);
                select.appendChild(option_a2);
                select.appendChild(option_a1);
                td_select.appendChild(select);

                button.appendChild(span);
                td_button.appendChild(button);

                tr.appendChild(td_input);
                tr.appendChild(td_select);
                tr.appendChild(td_button);
                langTable.appendChild(tr);
            });

            $("#addSkillButton").on("click", function()
            {
                const skillTable = document.getElementsByClassName("skillTable")[0];
                const tr = document.createElement("tr");

                const td_input = document.createElement("td");
                const input = document.createElement("input");

                const td_textarea = document.createElement("td");
                const textarea = document.createElement("textarea");

                const td_button = document.createElement("td");
                const button = document.createElement("button");
                const span = document.createElement("span");

                input.setAttribute("type", "text");
                textarea.setAttribute("rows", "5");
                textarea.setAttribute("cols", "20");
                textarea.setAttribute("style", "width:100%;");

                button.setAttribute("class", "delLangButton btn btn-danger");
                button.setAttribute("type", "submit");
                span.setAttribute("class", "glyphicon glyphicon-remove");

                td_input.appendChild(input);
                td_textarea.appendChild(textarea);

                button.appendChild(span);
                td_button.appendChild(button);

                tr.appendChild(td_input);
                tr.appendChild(td_textarea);
                tr.appendChild(td_button);
                skillTable.appendChild(tr);
            });

            $("#addCourseButton").on("click", function()
            {
                const courseTable = document.getElementsByClassName("courseTable")[0];
                const tr = document.createElement("tr");

                const td_input_range = document.createElement("td");
                const input_range_from = document.createElement("input");
                const text_range_from = document.createTextNode("Od:");
                const input_range_to = document.createElement("input");
                const text_range_to = document.createTextNode("Do:");

                const td_input_description = document.createElement("td");
                const input_description = document.createElement("input");

                const td_button = document.createElement("td");
                const button = document.createElement("button");
                const span = document.createElement("span");

                input_range_from.setAttribute("type", "date");
                input_range_to.setAttribute("type", "date");

                input_description.setAttribute("type", "text");
                input_description.setAttribute("style", "width:100%;");

                button.setAttribute("class", "delEduButton btn btn-danger");
                button.setAttribute("type", "submit");
                span.setAttribute("class", "glyphicon glyphicon-remove");

                td_input_range.appendChild(text_range_from);
                td_input_range.appendChild(input_range_from);
                td_input_range.appendChild(document.createElement("br"));
                td_input_range.appendChild(text_range_to);
                td_input_range.appendChild(input_range_to);

                td_input_description.appendChild(input_description);

                button.appendChild(span);
                td_button.appendChild(button);

                tr.appendChild(td_input_range);
                tr.appendChild(td_input_description);
                tr.appendChild(td_button);
                courseTable.appendChild(tr);
            });

            $("#addIntButton").on("click", function()
            {
                const intTable = document.getElementsByClassName("intTable")[0];
                const tr = document.createElement("tr");

                const td_input = document.createElement("td");
                const input = document.createElement("input");

                const td_button = document.createElement("td");
                const button = document.createElement("button");
                const span = document.createElement("span");

                td_input.setAttribute("style", "width:100%;");
                input.setAttribute("type", "text");
                input.setAttribute("style", "width:100%;");

                button.setAttribute("class", "delIntButton btn btn-danger");
                button.setAttribute("type", "submit");
                button.addEventListener("click", function delThisRecord()
                {
                    delIntButton(button);
                });
                span.setAttribute("class", "glyphicon glyphicon-remove");

                td_input.appendChild(input);
                button.appendChild(span);
                td_button.appendChild(button);

                tr.appendChild(td_input);
                tr.appendChild(td_button);
                intTable.appendChild(tr);
            });

            // --- DYNAMICZNE USUWANIE REKORDÓW Z CV ---------------------------

            deleteCurrentRow = (elem) =>
            {
                const row = elem.parentElement.parentElement;
                const table = row.parentElement;
                table.removeChild(row);
            };

            // --- ODŚWIEŻANIE ZEGARKA -----------------------------------------

            function refreshClock()
            {
                let clock = document.getElementById("clock");
                let now = new Date();

                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();

                if (hours < 10) hours = '0' + hours;
                if (minutes < 10) minutes = '0' + minutes;
                if (seconds < 10) seconds = '0' + seconds;

                clock.innerHTML = hours + ":" + minutes + ":" + seconds;
                setTimeout(refreshClock, 500);
            }
            refreshClock();
        });
    }
};

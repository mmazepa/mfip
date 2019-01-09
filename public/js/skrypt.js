/*jshint jquery: true, devel: true, esversion: 6, browser: true */

document.onreadystatechange = () => {
    if(document.readyState === "interactive") {
        $(() => {
            $("#loginType, #signupType").val("worker");

            // --- OBSŁUGA MENU W PANELU BOCZNYM -------------------------------

            const selectMenuOption = () => {
                let currentLocation = window.location.href.split("/").pop();
                if (currentLocation == "")
                    document.getElementById("homepage").classList.add("activeMenuOption");
                else if (currentLocation == "edit")
                    document.getElementById("cv").classList.add("activeMenuOption");
                else
                    document.getElementById(currentLocation).classList.add("activeMenuOption");
            };
            selectMenuOption();

            $(".menuElement").on("click", function() {
                if (this.id == "homepage") location.replace("/");
                else location.replace("/" + this.id);
            });

            // --- AKCJE CV: LISTY ROZWIJALNE ----------------------------------

            const upperCaseFirstLetter = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };

            $(".cvTitle").on("click", function() {
                tableName = (this.id).replace("Title","Table");
                glyphName = (this.id).replace("Title","Glyph");
                addButtonName = "add".concat(upperCaseFirstLetter((this.id).replace("Title","Button")));
                $("." + tableName).toggle("slow", toggleChevrons(tableName, glyphName, addButtonName));
            });

            const toggleChevrons = (tableName, glyphName, addButtonName) => {
                if($("." + tableName).is(":visible")) {
                    $("#" + glyphName).toggleClass("glyphicon-chevron-up glyphicon-chevron-down");
                    $("#" + addButtonName).addClass("hideMe");
                } else {
                    $("#" + glyphName).toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
                    $("#" + addButtonName).removeClass("hideMe");
                }
            };

            // --- AKCJE CV: EDYCJA --------------------------------------------

            $("#editCVButton").on("click", () => {
                location.replace("/cv/edit");
            });

            $("#saveCVButton").on("click", () => {
                alertUndone("Zapisywanie CV");
                return false;
            });

            // --- FORMULARZ REJESTRACJI ---------------------------------------

            $("#signupType").change(function() {
                switch ($("#" + this.id).val()) {
                    case "firm": {
                        $("#userData").html("Dane kierownika:");
                        $("#firmData, #firmInput").removeClass("hideMe");
                        break;
                    }
                    case "worker": {
                        $("#userData").html("Dane pracownika:");
                        $("#firmData, #firmInput").addClass("hideMe");
                        break;
                    }
                }
            });

            // --- ZARZĄDZANIE PROFILEM ----------------------------------------

            var containsClassPersonals = true;
            $("#editPersonals").on("click", () => {
                $("#personalsInsertion").toggleClass("hideMe");
                containsClassPersonals = !containsClassPersonals;

                if (containsClassPersonals) {
                    $("#editPersonalsLabel").html("Edytuj");
                } else {
                    $("#editPersonalsLabel").html("Anuluj edycję");
                }
            });

            var containsClassAdres = true;
            $("#editAdres").on("click", () => {
                $("#adresInsertion").toggleClass("hideMe");
                containsClassAdres = !containsClassAdres;

                if (containsClassAdres) {
                    $("#editAdresLabel").html("Edytuj");
                } else {
                    $("#editAdresLabel").html("Anuluj edycję");
                }
            });

            var containsClassFirmInfo = true;
            $("#editFirmInfo").on("click", () => {
                $("#firmInfoInsertion").toggleClass("hideMe");
                containsClassFirmInfo = !containsClassFirmInfo;

                if (containsClassAdres) {
                    $("#editFirmInfoLabel").html("Edytuj");
                } else {
                    $("#editFirmInfoLabel").html("Anuluj edycję");
                }
            });

            // --- FUNKCJE POMOCNICZE DO DODAWANIA NOWYCH REKORDÓW DO CV -------

            const appendMultipleChildren = (element, children) => {
                for (var i = 0; i < children.length; i++) {
                    element.appendChild(children[i]);
                }
                return element;
            };

            const prepareTable = (tableName, cells) => {
                const table = document.getElementsByClassName(tableName)[0];
                let tr = document.createElement("tr");
                tr = appendMultipleChildren(tr, cells);
                tr.appendChild(prepareDelButton());
                table.appendChild(tr);
            };

            const prepareInputText = () => {
                const td_input = document.createElement("td");
                const input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("style", "width:100%;");
                td_input.appendChild(input);
                return td_input;
            };

            const prepareInputRange = () => {
                let td_input_range = document.createElement("td");
                const input_range_from = document.createElement("input");
                const text_range_from = document.createTextNode("Od: ");
                const input_range_to = document.createElement("input");
                const text_range_to = document.createTextNode("Do: ");
                input_range_from.setAttribute("type", "date");
                input_range_to.setAttribute("type", "date");
                td_input_range = appendMultipleChildren(td_input_range,
                                    [text_range_from, input_range_from,
                                    document.createElement("br"),
                                    text_range_to, input_range_to]);
                return td_input_range;
            };

            const prepareSelect = (options) => {
                const td_select = document.createElement("td");
                const select = document.createElement("select");
                for (var i = 0; i < options.length; i++) {
                    const option = document.createElement("option");
                    option.setAttribute("value", options[i]);
                    option.innerHTML = options[i];
                    select.appendChild(option);
                }
                td_select.appendChild(select);
                return td_select;
            };

            const prepareTextArea = (rows, cols) => {
                const td_textarea = document.createElement("td");
                const textarea = document.createElement("textarea");
                textarea.setAttribute("rows", rows);
                textarea.setAttribute("cols", cols);
                textarea.setAttribute("style", "width:100%;");
                td_textarea.appendChild(textarea);
                return td_textarea;
            };

            const prepareDelButton = () => {
                const td_button = document.createElement("td");
                const button = document.createElement("button");
                const span = document.createElement("span");
                button.setAttribute("class", "delExpButton btn btn-danger");
                button.setAttribute("type", "submit");
                button.addEventListener("click", () => {
                    deleteCurrentRow(button);
                });
                span.setAttribute("class", "glyphicon glyphicon-remove");
                button.appendChild(span);
                td_button.appendChild(button);
                return td_button;
            };

            // --- DYNAMICZNE DODAWANIE NOWYCH REKORDÓW DO CV ------------------

            $("#addExpButton").on("click", () => {
                const td_input_range = prepareInputRange();
                const td_input_workstation = prepareInputText();
                const td_input_firm = prepareInputText();
                prepareTable("expTable", [td_input_range, td_input_workstation, td_input_firm]);
            });

            $("#addEduButton").on("click", () => {
                const td_input_range = prepareInputRange();
                const td_input_faculty = prepareInputText();
                const td_input_university = prepareInputText();
                prepareTable("eduTable", [td_input_range, td_input_faculty, td_input_university]);
            });

            $("#addLangButton").on("click", () => {
                const td_input = prepareInputText();
                const td_select = prepareSelect(["C2", "C1", "B2", "B1", "A2", "A1"]);
                prepareTable("langTable", [td_input, td_select]);
            });

            $("#addSkillButton").on("click", () => {
                const td_input = prepareInputText();
                const td_textarea = prepareTextArea(5, 20);
                prepareTable("skillTable", [td_input, td_textarea]);
            });

            $("#addCourseButton").on("click", () => {
                const td_input_range = prepareInputRange();
                const td_input_description = prepareInputText();
                prepareTable("courseTable", [td_input_range, td_input_description]);
            });

            $("#addIntButton").on("click", () => {
                const td_input = prepareInputText();
                prepareTable("intTable", [td_input]);
            });

            // --- DYNAMICZNE USUWANIE REKORDÓW Z CV ---------------------------

            const deleteCurrentRow = (elem) => {
                const row = elem.parentElement.parentElement;
                row.parentElement.removeChild(row);
            };

            // --- CRUD: SKILLS ------------------------------------------------

            const changeHeadersFT = (newFrom, newTo) => {
                var from = document.getElementById("thFrom");
                var to = document.getElementById("thTo");
                from.innerHTML = newFrom;
                to.innerHTML = newTo;
            };

            const changeHeadersND = (newName, newDesc) => {
                var name = document.getElementById("thName");
                var desc = document.getElementById("thDesc");
                name.innerHTML = newName;
                desc.innerHTML = newDesc;
            };

            const connectDates = function() {
                var from = document.getElementById("inputFrom");
                var to = document.getElementById("inputTo");
                to.value = from.value;
            };

            const disableOrNot = (fromOpt, toOpt, nameOpt, descOpt) => {
                var from = document.getElementById("inputFrom");
                var to = document.getElementById("inputTo");
                var name = document.getElementById("inputName");
                var desc = document.getElementById("inputDesc");
                from.disabled = fromOpt;
                to.disabled = toOpt;
                name.disabled = nameOpt;
                desc.disabled = descOpt;
            };

            const clearFields = (fromOpt, toOpt, nameOpt, descOpt) => {
                var from = document.getElementById("inputFrom");
                var to = document.getElementById("inputTo");
                var name = document.getElementById("inputName");
                var desc = document.getElementById("inputDesc");
                if (fromOpt) from.value = 0;
                if (toOpt) to.value = 0;
                if (nameOpt) name.value = null;
                if (descOpt) desc.value = null;
            };

            const disabilityAndClearing = (fromOpt, toOpt, nameOpt, descOpt) => {
                disableOrNot(fromOpt, toOpt, nameOpt, descOpt);
                clearFields(fromOpt, toOpt, nameOpt, descOpt);
            };

            $("#selectSkillType").on("change", function() {
                const type = this.options[this.selectedIndex].value;

                var from = document.getElementById("inputFrom");
                var to = document.getElementById("inputTo");
                var name = document.getElementById("inputName");
                var desc = document.getElementById("inputDesc");

                from.removeEventListener("change", connectDates);
                disabilityAndClearing(false, false, false, false);

                if (type == "exp") {
                    changeHeadersFT("Od", "Do");
                    changeHeadersND("Firma", "-");
                    disabilityAndClearing(false, false, false, true);
                } else if (type == "edu") {
                    changeHeadersFT("Od", "Do");
                    changeHeadersND("Kierunek", "Uczelnia");
                    disabilityAndClearing(false, false, false, false);
                } else if (type == "lang") {
                    changeHeadersFT("-", "-");
                    changeHeadersND("Język", "Poziom");
                    disabilityAndClearing(true, true, false, false);
                } else if (type == "skill") {
                    changeHeadersFT("-", "-");
                    changeHeadersND("Umiejętność", "Opis");
                    disabilityAndClearing(true, true, false, false);
                } else if (type == "course") {
                    changeHeadersFT("Od", "Do");
                    changeHeadersND("-", "Opis");
                    disabilityAndClearing(false, false, true, false);
                } else if (type == "cert") {
                    changeHeadersFT("Data", "-");
                    changeHeadersND("-", "Opis");
                    connectDates();
                    disabilityAndClearing(false, true, true, false);
                    from.addEventListener("change", dateEventListener);
                } else if (type == "int") {
                    changeHeadersFT("-", "-");
                    changeHeadersND("-", "Opis");
                    disabilityAndClearing(true, true, true, false);
                }
            });

            // --- OBSŁUGA DAT -------------------------------------------------

            const repairDates = () => {
                let dates = document.getElementsByClassName("date");
                for (var i = 0; i < dates.length; i++) {
                    var tmpDate = new Date(dates[i].innerHTML);
                    if (dates[i].innerHTML == "") continue;

                    var day = tmpDate.getDate();
                    var month = tmpDate.getMonth()+1;
                    const year = tmpDate.getFullYear();

                    if (day < 10) day = "0" + day;
                    if (month < 10) month = "0" + month;

                    const date = day + "." + month + "." + year;
                    dates[i].innerHTML = date;
                }
            };
            repairDates();

            // --- OBSŁUGA ZEGARKA ---------------------------------------------

            const repairClockItems = (items) => {
                for (var i = 0; i < items.length; i++) {
                    if (items[i] < 10) items[i] = "0".concat(items[i]);
                }
                return items;
            };

            const refreshClock = () => {
                const clock = document.getElementById("clock");
                const now = new Date();
                let clockItems = repairClockItems([now.getHours(), now.getMinutes(), now.getSeconds()]);
                clock.innerHTML = clockItems.join([separator = ':']);
                setTimeout(refreshClock, 500);
            };
            refreshClock();
        });
    }
};

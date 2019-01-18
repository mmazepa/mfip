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
                else
                    document.getElementById(currentLocation).classList.add("activeMenuOption");
            };
            selectMenuOption();

            $(".menuElement").on("click", function() {
                if (this.id == "homepage") location.replace("/");
                else location.replace("/" + this.id);
            });

            $("#crudHeader").on("click", () => {
                $("#crudGlyph").toggleClass("glyphicon-chevron-up glyphicon-chevron-down");
                $("#crudList").toggleClass("hideMe");
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

            // --- FORMULARZ REJESTRACJI ---------------------------------------

            $("#signupType").change(function() {
                switch ($("#" + this.id).val()) {
                    case "firm": {
                        $("#userData").html("Dane kierownika:");
                        $("#firmData, #firmInput").removeClass("hideMe");
                        $("#first_name_div, #last_name_div").hide();
                        break;
                    }
                    case "worker": {
                        $("#userData").html("Dane pracownika:");
                        $("#firmData, #firmInput").addClass("hideMe");
                        $("#first_name_div, #last_name_div").show();
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
                    from.addEventListener("change", connectDates);
                } else if (type == "int") {
                    changeHeadersFT("-", "-");
                    changeHeadersND("-", "Opis");
                    disabilityAndClearing(true, true, true, false);
                }
            });

            // --- OBSŁUGA DAT -------------------------------------------------

            const dateRangeGuard = (id) => {
                if (document.getElementById(id.concat("From"))) {
                    var elemFrom = document.getElementById(id.concat("From"));
                    elemFrom.onchange = function () {
                        var elemTo = document.getElementById(id.concat("To"));
                        elemTo.setAttribute("min", this.value);
                    };
                }
            };

            const fromBeforeTo = () => {
                dateRangeGuard("exp");
                dateRangeGuard("edu");
                dateRangeGuard("course");
            };
            fromBeforeTo();

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

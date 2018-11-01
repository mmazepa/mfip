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
                    case "signup":
                        location.replace("/signup");
                        break;
                    default:
                        break;
                }
            });
        });
    }
};

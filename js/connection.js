(function($) {
    $(document).ready(function() {
        $("#form-connection").submit(function(e) {
            var $login = $("#login");
            var $pwd = $("#pwd");
            var $alert = $("#alert");
            var $alertLogin = $("#alert-login");
            var alert = [$alert, $alertLogin];
            for(var i = 0; i < alert.length; i++){
                var div = alert[i];
                if(!div.hasClass("hidden"))
                div.addClass("hidden");
            }

            if($login.val() != "" && $pwd.val() != "") {
                $.ajax({
                    url: "auth.php",
                    data: {
                        login: $login.val(),
                        pwd: $pwd.val()
                    },
                    dataType: "json",
                    method: "post",
                    success: function(reponse) {
                        if(reponse.status == true) {
                            $("#connection").addClass("hidden");
                            $("#contenu").load("box.php");
                        } else if(reponse.status == false) {
                            if(reponse.e == "login")
                            $alertLogin.removeClass("hidden");
                            else
                            $alert.removeClass("hidden");
                        }
                    }
                });
            } else {
                alert("Erreur dans l'identification");
            }

            e.preventDefault();
            return false;
        });
    });
})(jQuery);

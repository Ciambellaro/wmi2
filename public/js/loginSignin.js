//apertura modal login al caricamento della pagina
$(window).on('load', function () {
    $('#modalLoginForm').modal({ backdrop: 'static', keyboard: false }); //modal viene mostrato e non può scomparire
});

// gestione form di login
$("#loginForm").submit(function (event) {
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = $(this).serialize(); //Encode form elements for submission

    $.ajax({
        url: post_url,
        type: request_method,
        data: form_data,
        dataType: "json"
    }).done(function (response) { //
        console.log(response.message);
        $("#divError").empty();
        if(response.message == "err_1"){
            $("#divError").append("Nome utente non esistente !");
        } else if(response.message == "err_2"){
            $("#divError").append("Password errata !");
        } else{
            var split = response.message.split("-");
            var nomeUtente = split[1];
            var tipoUtente = split[2];
            sessionStorage.setItem('user', nomeUtente);
            sessionStorage.setItem('tipo', tipoUtente);
            location.assign("/map");
        }
    });
});

// gestione form di registrazione
$("#regForm").submit(function (event) {
    event.preventDefault(); //prevent default action 
    var post_url = $(this).attr("action"); //get form action url
    var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = $(this).serialize(); //Encode form elements for submission

    $.ajax({
        url: post_url,
        type: request_method,
        data: form_data,
        dataType: "json"
    }).done(function (response) { //
        console.log(response.message);
        $("#divErrorReg").empty();
        if(response.message == "err_1"){
            $("#divErrorReg").append("Nome utente gia' in uso !");
        } else if(response.message == "err_2"){
            $("#divErrorReg").append("Conferma password non corrispondente!");
        } else {
            $('#modalRegisterForm').modal('hide');
            $("#divError").empty();
            $("#divError").append("Utente registrato con successo."); 
            $("divError").append("Esegui l'accesso con le credenziali appena create.");
        }
    });
});

//apre il modale per la registrazione
function openModalsignin() {
    $('#modalRegisterForm').modal('show');
}




function back() {
    window.open("navigation.html","_self"); }
        //script untuk menembak api sign up
        $(document).ready(function(){
  $("#btnsignup").click(function(){
    var md5 = $.md5($('#password').val());
    var bagian = $('#bagian').children("option:selected").val();
    alert("hehe");
    $.ajax({
        type: "POST",
        datatype:"json",
        url: "https://tororo-api.appspot.com/signup",
        data:({
            nama : $('#nama').val(),
            email : $('#email').val(),
            bagian : $('#bagian').val(),
            password:md5,
            token: "15262dcfc01ea003f9508395bfb1e567"
        }),
        success: function(result)
        {
            if(result != null) // you should do your checking here
            {
               var myObj = JSON.parse(result);
                 if(myObj[0].email != null){
                    alert("hai");
                    //agar input form kembali kosong
                    $('#password').val('');
                    $('#cpassword').val('');
                    $('#nama').val('');
                    $('#email').val('');
                    $('#bagian').val(' ');
                }
                else{
                    alert("Gagal Membuat akun.");
                    
                }
            }
            else
            {
                $('#result').empty().addClass('error')
                    .append('Something is wrong.');
            }
        }
    });
    //return false;
});
});
        //function untuk menjalankan hide dan unhide password
        $("#show_password").hover(
  function functionName() {
    //Change the attribute to text
    $("#password").attr("type", "text");
    $("#show1")
      .removeClass("glyphicon-eye-open")
      .addClass("glyphicon-eye-close");
  },
  function() {
    //Change the attribute back to password
    $("#password").attr("type", "password");
    $("#show1")
      .removeClass("glyphicon-eye-close")
      .addClass("glyphicon-eye-open");
  }
);
 $("#show_password2").hover(
  function functionName2() {
    //Change the attribute to text
    $("#cpassword").attr("type", "text");
    $("#show2")
      .removeClass("glyphicon-eye-open")
      .addClass("glyphicon-eye-close");
  },
  function() {
    //Change the attribute back to password
    $("#cpassword").attr("type", "password");
    $("#show2")
      .removeClass("glyphicon-eye-close")
      .addClass("glyphicon-eye-open");
  }
);
 $("#nama").keyup(function(e){
    if(e.keyCode == 13) {
         $("#email").focus();
    }
});
 $("#email").keyup(function(e){
    if(e.keyCode == 13) {
         $("#password").focus();
    }
});
$("#password").keyup(function(e){
    if(e.keyCode == 13) {
         $("#cpassword").focus();
    }
});
(function() {
            
            var bodyEl = $('body'),
                navToggleBtn = bodyEl.find('.nav-toggle-btn');
            
            navToggleBtn.on('click', function(e) {
                bodyEl.toggleClass('active-nav');
                e.preventDefault();
            });           
        })();
        $(function() {
            $("#ADDNEW").tooltip();
            $("#kurir").tooltip();
            $("#gudang").tooltip();
            $("#btnsignup").tooltip();
             });

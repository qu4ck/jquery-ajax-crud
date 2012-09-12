/**
 *
 * Website: www.iso.web.id
 * Author : Airlangga bayu seto
 * Email  : qu4ck@iso.web.id
 *
 * */


function list_data(){
    $.ajax({
         url        : "proses.php"
        ,type       : "get"
        ,dataType   : "json"
        ,success    : function(data){
            if(data.list.length > 0){
                var kelas;
                var kelamin;

                var rows = "<tr>\
                                <th class=\"w150\">Name</th> \
                                <th class=\"w200\">Email</th> \
                                <th class=\"w60\">Gender</th> \
                                <th class=\"w200\">Address</th> \
                                <th class=\"w60\"></th> \
                            </tr>";
                $.each(data.list, function(k,v){
                    kelas   = (v.ID % 2)?"tevent":"todd";
                    kelamin = (v.GENDER == "1")?"laki - laki":"Perempuan";
                    rows +="<tr class=\""+ kelas +"\" id=\"t"+ v.ID +"\"> \
                                <td>"+ v.NAME +"</td> \
                                <td>"+ v.EMAIL +"</td> \
                                <td>"+ kelamin +"</td> \
                                <td>"+ v.ADDRESS +"</td> \
                                <td class=\"tcenter\"><a href=\"#\" id=\"edit\" key=\""+ v.ID +"\">edit</a> <a href=\"#\" id=\"del\" key=\""+ v.ID +"\">del</a></td> \
                            </tr>";
                });

                $("#tb_grid").html(rows);
            }else{
                alert("No data Fount.");
            }
        }
        ,error      : function(){
            alert("Error load ajax page.");
        }
    });
}
function clearData(){
    $("input[type=text]").val("");
    $("textarea").val("");
}
function showForm(){
    $("#tambah").hide();
    $("#frm_input").slideDown();
}
function hideForm(){
    $("#tambah").show();
    $("#frm_input").slideUp();
    clearData();
}
function showValue(arr){
    var gender = (arr[2] == "laki - laki")?"1":"2";
    $("#name").val([arr[0]]);
    $("#email").val([arr[1]]);
    $("#gender").val([gender]);
    $("#address").val([arr[3]]);
}

$(document).ready(function(){
    list_data();

    $("#frm_input").submit(function(){
        var name      = $("#name").val();
        var email     = $("#email").val();
        var sex       = $("#gender").val();
        var addr      = $("#address").val();
        var id        = $("#ids").val();

        var inputData = ({name:name,email:email,sex:sex,addr:addr,id:id});

        $.ajax({
             url        : "proses.php?s=input"
            ,dataType   : "json"
            ,type       : "post"
            ,data       : inputData
            ,success    : function(data){
                if(data.valid === true){
                    alert(data.message);
                    clearData();
                    list_data();
                }else{
                    alert(data.message);
                }
            }
            ,error      : function(){
                alert("Error load ajax page.");
            }
        });

        return false;
    });

    $("#tambah").click(function(){
        showForm();
    });

    $("#reset").click(function(){
        hideForm();
    });

    $(document).on("click", "#edit",function(){
        var key = $(this).attr("key");
        var arr = new Array();
        $("#t"+key+" td").each(function(k){
            arr[k] =$(this).text();
        });
        $("#ids").val([key]);
        showForm();
        showValue(arr);
    });

    $(document).on("click", "#del",function(){
        var key = $(this).attr("key");
        $.ajax({
             url        : "proses.php?s=delete"
            ,dataType   : "json"
            ,type       : "post"
            ,data       : ({id:key})
            ,success    : function(data){
                if(data.valid === true){
                    alert(data.message);
                    $("#t"+key).slideUp();
                    hideForm();
                }else{
                    alert(data.message);
                }
            }
            ,error      : function(){
                alert("Error load ajax page.");
            }
        });
    });
});

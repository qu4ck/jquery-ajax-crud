<?php
    /**
     *
     * Website: www.iso.web.id
     * Author : Airlangga bayu seto
     * Email  : qu4ck@iso.web.id
     *
     * */

    /* koneksi ke database */
    $dbname = "ajaxcurd.sqlite";
    try {
        $db = new PDO("sqlite:$dbname");
    }
    catch(PDOException $e){
        $error = $e->getMessage();
        die( "<br><br>Gagal koneksi !!! $error");
    }
    /*end*/

    define("DEMO", FALSE);

    $get  =  strip_tags($_GET['s']);
    switch($get){
        case "delete":
            $id     = (int)$_POST['id'];

            if(DEMO == TRUE){
                $msg = array("message"  => "Versi demo tidak dapat menghapus", "valid"    => false);
            }else{
                if(!empty($id)){
                    $result = $db->query("DELETE FROM tb_member WHERE `MB_ID`   = '$id'");

                    if($result){
                        $msg = array("message"  => "Berhasil delete data", "valid"    => true);
                    }else{
                        $msg = array("message"  => "Gagal delete data", "valid"    => false);
                    }
                }else{
                    $msg = array("message"  => "Tidak data yang akan dihapus", "valid"    => false);
                }
            }
            echo json_encode($msg);
        break;
        case "input":
            $id     = (int)$_POST['id'];
            $name   = strip_tags($_POST['name']);
            $email  = strip_tags($_POST['email']);
            $sex    = (int)$_POST['sex'];
            $addr   = strip_tags($_POST['addr']);

            if(DEMO == TRUE){
                $msg = array("message"  => "Versi demo tidak dapat input dan update", "valid"    => false);
            }else{
                if(!empty($name)){
                    if(!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)){
                        if(empty($id)){
                            $result = $db->query("INSERT INTO tb_member (`MB_NAME`,`MB_EMAIL`,`MB_SEX`,`MB_ADDRESS`) VALUES ('$name','$email','$sex','$addr')");
                        }else{
                            $result = $db->query("UPDATE tb_member SET
                                 `MB_NAME`  = '$name'
                                ,`MB_EMAIL` = '$email'
                                ,`MB_SEX`   = '$sex'
                                ,`MB_ADDRESS`  = '$addr'
                                WHERE `MB_ID`   = '$id'");
                        }

                        if($result){
                            $msg = array("message"  => "Berhasil input data", "valid"    => true);
                        }else{
                            $msg = array("message"  => "Gagal input data", "valid"    => false);
                        }
                    }else{
                        $msg = array("message"  => "Email tidak boleh kosong/tidak valid", "valid"    => false);
                    }
                }else{
                    $msg = array("message"  => "Nama tidak boleh kosong", "valid"    => false);
                }
            }
            echo json_encode($msg);
        break;
        case "delete";

        break;
        default :
            $result = $db->query("SELECT MB_ID AS ID, MB_NAME AS NAME, MB_EMAIL AS EMAIL, MB_ADDRESS AS ADDRESS, MB_SEX AS GENDER FROM tb_member ORDER BY MB_ID DESC");
            foreach($result as $row){
                $val[]  = $row;
            }

            $data['list'] = (!empty($val))?$val:array();

            echo json_encode($data);
        break;
    }
?>

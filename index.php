<?php


$include = __DIR__.'/includes/';
if($_GET != null AND !file_exists($include.$_GET['pagina'].'.php')){
    include ($include.'error.html');
    die();
}
include ($include.'head.html');
if(isset($_GET) && $_GET == null){
    include ($include.'main.php');
}else if(file_exists($include.$_GET['pagina'].'.php')){
    include ($include.$_GET['pagina'].'.php');
}
include ($include.'footer.html');

?>



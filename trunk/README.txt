Passos para correr o projecto - localmente:

1. Instalar MySQL/Apache/PHP local (recomendamos o Xampp por ser simples de instalar e suficiente para o ambito de desenvolvimento)
2. Correr o script database.sql;
2. Instalar o código PHP da pasta HealthMonitor e na pasta htdocs do servidor;
3. Preecher a base de dados com valores;
4. Executar project.x3d.

Usando o servidor remoto (problemas de latencia por resolver):

1. Retirar o comentário de <ContextSetup ecmaScriptXHRTrustedHosts="clevermobile.dx.am"/> e comentar <ContextSetup ecmaScriptXHRTrustedHosts="localhost"/>
 no ficheiro project.x3d;
2. Retirar o comentário de _serverAddress : "http://clevermobile.dx.am/HealthMonitor/get-health.php" comentar _serverAddress : "http://localhost/HealthMonitor/get-health.php";
3. Executar project.x3d.
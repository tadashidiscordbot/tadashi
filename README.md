<h1 align="center">
  <a href="https://github.com/Nathoune-YT/le_bot"><img src="https://i.imgur.com/qj7s2CG.jpeg"></a>
</h1>

<p align="center">
  <a href="#présentation">Présentation</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#license">License</a>
</p>

<h1 align="center">
<a href="https://le-bot.cf"><img src="https://i.imgur.com/Q6XKVSe.png" width="60"></a>
</h1>

# Présentation

Le_Bot est un bot interactif qui réagit à certains mots et dynamise votre serveur Discord ! Il peut se rendre très sympatique ou diabolique (je comprends qu'il vous énerve lol). Vous pouvez directement [ajouter Le_Bot](https://discord.com/oauth2/authorize?client_id=881098458482753586&permissions=2048&scope=bot) à votre serveur, il possédera les réponses aux mots présents dans le `liste.json`. 

Le_Bot possède un site web, le voici : https://le-bot.cf

Le_Bot a été certfié par Discord ! <a href="https://discord.com/oauth2/authorize?client_id=881098458482753586&permissions=10240&scope=bot"><img src="https://i.imgur.com/5dqIQGd.png" width="60"></a>

[L'installation](#installation) est simple et rapide.

# Installation

**Voici les étapes à suivre pour lancer Le_Bot :**

Avant l'installation du code, rendez vous sur le Discord Developper Portal et cocher ces intents précisement dans la catégorie "Bot". Attention, si votre bot est certifié par Discord, vous devrez faire une nouvelle demande pour le "Server Members Intent".

<img src="https://i.imgur.com/saaTrwl.png" width="700">

Ensuite, cochez ces cases dans la génération du lien d'invitation, cela sera nécéssaire pour les commandes slash.

<img src="https://i.imgur.com/OTlxlsB.jpg" width="700">

Premièrement, téléchargez l'archive contenant tous les fichiers nécéssaires au bon fonctionnement du bot. Ensuite installer Python en cochant la case `ADD Python [version] TO PATH`.  
Ouvrez un CMD à l'emplcament de vos fichiers. Éxecutez cette commande `pip install -r requirements.txt`.
Si vous obtenez une erreur en rapport avec Git, je vous invite à l'installer (https://git-scm.com/downloads). Une fois l'installation terminée, relancez la commande `pip install -r requirements.txt`.
Renseignez le token de votre bot dans le fichier `config.json`.  
Renseignez le prefix de votre bot dans le fichier `config.json` même si Le_Bot est passé aux commandes slash, le prefix sert juste à répondre aux utilisateurs qui souhaiteraient encore utiliser les anciennes commandes.
Vous pouvez ajouter ou supprimer les mots auxquels Le_Bot réagit dans le fichier `liste.json`. `name` correspond aux mots auxquels Le_Bot réagit, vous n'avez pas besoin de mettre toutes les déclinaisons du mot (exemple : Salut ; sAlut ; saLut...), le script prend en compte ce paramètre. `value` correpond à la réponse de Le_Bot. 

Vous trouverez dans le dossier `toggle` des fichiers textes au nom de chaques commandes proposées par Le_Bot. Dans ces fichiers textes seront stockés les IDs des serveurs qui auront désactivés une de ses commandes. Le_Bot vérifira à chaque utilisation d'une commande si l'ID du seveur sur lequel la commande a été demandée est présente dans un de ces fichiers texte et adaptera sa réponse pour activer ou non la commande. 

Précision pour les émojis. Vous pouvez voir dans le code que certains émojis sont définis comme ceci `<:nom:id>`. Vous n'aurez pas l'émoji car il faut que votre bot soit dans le serveur d'où provient l'émoji. Dans le dossier `emoji` se trouvent toutes les images qui correspondantes aux émojis. Il vous suffit de les upload sur un serveur discord dans lequel il y a votre bot. Ensuite dans votre serveur discord fraîchement créé, envoyez `\:nom_de_l'emoji:`. Vous obtenerez le même format `<:nom:id>`. Il vous suffira de remplacer tous les émojis par ce que vous obtenez !

Lancer `Le_Bot.py` et votre bot sera en ligne !

Voici l'interface que vous aurez si l'installation et la mise en ligne se sont bien passé :

<img src="https://i.imgur.com/2XkMWSB.png" width="500">

Amusez-vous bien !

# License

Le_Bot est sous licence [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html).  

Si vous désirez vous baser du code de Le_Bot pour créer votre propre bot Discord, veuillez uploader votre nouveau script python sur GitHub avec la même [**licence**](https://raw.githubusercontent.com/Nathoune-YT/le_bot/main/LICENSE) et mentionnez l'auteur `Nathoune`.

Retrouvez ci-dessous le [lien du serveur Discord](https://discord.gg/b6jjy5yKXV), celui [de ma chaîne YouTube](https://www.youtube.com/c/Nathoune) et celui pour [ajouter directement Le_Bot](https://discord.com/oauth2/authorize?client_id=881098458482753586&permissions=2048&scope=bot).

Pour toutes questions ou demandes, veuillez me contactez soit par Discord (Nathoune#3630) ou par mail (nathoune@le-bot.cf).

<table align="center">
  <tr>
    <a href="https://discord.gg/b6jjy5yKXV"><img src="https://i.imgur.com/Iifi5e1.png" width="276"></a>
    <a href="https://www.youtube.com/Nathoune"><img src="https://i.imgur.com/8ouURXj.png" width="276"></a>
    <a href="https://le-bot.cf"><img src="https://i.imgur.com/eixR2E8.png" width="276"></a>
  </tr>
</table>

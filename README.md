# Projet Web Stack - TP2
Ce projet est une application client-serveur construite dans le cadre du TP2. Il comprend une partie Front-end (React) et une partie Back-end (Node.js + Express), avec communication via Socket.io.

# Lancement : 
http://localhost:5173/admin/event/1 ou http://localhost:5173/participant/event/1

# NB :
L'application est sous forme web et aussi sous forme mobile(réduire la fenetre et automatiquement l'application ajoutera de nouvelles fonctionnalités ) comme l'ajout de nouvelles questions, votes, suppression des questions, dessiner les formes.
* possibilité de basculer en mode ordinateur ou mobile
* Possibilité de changer d'evenement.
* Possibilté de cliquer sur une question, ce qui enverra sur une autre page spécifique a la question avec * possibilité de changer de question liées a meme evenement.
* Application belle et conviviale avec utilisation de tailwin
*** la suppression des questions n'est permis que pour les admins en mode mobile. ***

# Côté client :
lancer : npm run dev
yarn lint
yarn format
yarn build

# Côté server
// server/index.js
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

demarrage : node dist/index.js

* Le serveur recoit et lis toutes les communications.
* Tout se fait en temps réel.
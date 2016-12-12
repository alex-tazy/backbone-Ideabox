<?php
session_start();
?>
<script id="result-template" type="text/template">
    <h3><%= id %> <b><%= title %></b>
        <small> par <%= author %> <i>le <%= date %></i></small>
    </h3>
    <p class="status"><%= text %></p>
    <p>Nombre de votes: <%= count %>. <a href="#" class="vote">Voter pour cette idée !</a></p>
    <p><a href="#" class="edit">Edit</a> <a href="#" class="delete">Delete</a></p>
    <hr>
</script>

<script type="text/template" id="user-list-template">
    <p><%= prenom %></p>
    <p><%= nom %></p>
    <p><%= age %></p>
</script>

<div class="class-header">
    <h1>Boite à Idées</h1>
</div>
<h2 class="text-left">Login as: <?php echo $_SESSION['user']; ?></h2>
<form id="form-idea">
    <div class="form-group">
        <label class="sr-only" for="title">Titre</label>
        <input type="text" class="form-control" id="title" placeholder="Title..." required>
    </div>
    <div class="form-group">
        <label class="sr-only" for="idee">Idée</label>
        <textarea class="form-control" id="idee" placeholder="Idée" required></textarea>
    </div>
    <div class="form-group">
        <button class="btn btn-primary" type="submit">Soumettre</button>
    </div>
</form>
<hr>
<div id="result"></div>

<script src="js/main.js"></script>

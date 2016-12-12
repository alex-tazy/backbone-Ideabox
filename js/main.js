(function ($, Backbone) {
    // Model
    var IdeeModel = Backbone.Model.extend({
        defaults: {
            id: "", // ID unique
            title: "", // Titre
            text: "", // Descriptif
            author: "", // Auteur
            date: "", // Date
            count: 0 // Nombre de votes
        },

        validate: function (attributes) {
            if (attributes.title.length == 0) {
                return "Erreur dans la construction du Model";
            }
        }
    });

    // Collection
    var IdeeCollection = Backbone.Collection.extend({
        model: IdeeModel,

        localStorage: new Backbone.LocalStorage('idee-collection')
    });

    // List Collection
    var ideeList = new IdeeCollection();

    // View
    var IdeeView = Backbone.View.extend({
        model: new IdeeModel(),
        tagName: "div",

        events: {
            "click .vote": "onVote",
            "click .edit": "onEdit",
            "click .delete": "onDelete",
            "blur .status": "onClose",
            "keypress .status": "onUpdate"
        },

        onVote: function (e) {
            e.preventDefault();
            var nb = this.model.get("count");
            this.model.set("count", nb + 1);
        },

        onEdit: function (e) {
            e.preventDefault();
            this.$('.status').attr('contenteditable', true).focus();
        },

        onDelete: function (e) {
            e.preventDefault();
            ideeList.remove(this.model);
        },

        onClose: function (e) {
            var status = this.$('.status').text();
            this.model.set('text', status);
            this.$('.status').removeAttr('contenteditable');
        },

        onUpdate: function (e) {
            var self = this;
            if (e.keyCode === 13) {
                this.onClose();
                _.delay(function () {
                    self.$('.status').blur()
                }, 100);
            }
        },

        initialize: function () {
            this.template = _.template($("#result-template").html());
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    // Collection View
    var IdeesView = Backbone.View.extend({
        model: ideeList,
        el: $("#result"),

        initialize: function () {
            this.model.on("add", this.render, this);
            this.model.on("change", this.render, this);
            this.model.on("remove", this.render, this);
        },

        render: function () {
            var self = this;
            self.$el.html('');
            ideeList.each(function (idee) {
                var newView = new IdeeView({model: idee});
                self.$el.append(newView.render().$el);
            });

            return this;
        }
    });

    // Document Ready
    $(document).ready(function () {
        var id = 0;
        $("#form-idea").submit(function (event) {
            var date = new Date();
            var jour = date.getDate();
            var mois = date.getMonth() + 1;
            var an = date.getFullYear();
            var heure = date.getHours();
            var minutes = date.getMinutes();
            id++;
            var idee = new IdeeModel({
                id: id,
                title: $("#title").val(),
                text: $("#idee").val(),
                date: jour + "/" + mois + "/" + an + " à " + heure + ":" + minutes,
                author: "Alex",
                count: 0
            });
            ideeList.add(idee);

            $("#title").val("");
            $("#idee").val("");

            event.preventDefault();
            return false;
        });
        var appView = new IdeesView();
    });
})(jQuery, Backbone);

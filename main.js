javascript: (function () {
    /* creazione attributo replaceAll per le stringhe */
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    console.log("Retrieving links...");
    /* prendo tutto il contenuto della pagina */
    var htmlContent = document.documentElement.innerHTML;
    /* definisco la regexp da utilizzare */
    var reg = /href="(sviluppo\.videolezioni\.vis.*lez=[0-9]*)">|href="(sviluppo\.pagina_corso\.main.*VC_[0-9]+_[0-9]+)">/gi;

    /* cerco i link e li inserisco in output */
    var matches, output = [];
    while ((matches = reg.exec(htmlContent)) != null) {
        /* se il primo capturing group è undefined, allora ha fatto match il secondo */
        match = (typeof matches[1] != 'undefined') ? matches[1] : matches[2];
        output.push(match.replaceAll("&amp;", "&"));
    }
    if (output.length == 0) {
        /* mostra alert se non trovo link */
        alert("Nessuna videolezione/virtual classroom trovata su questa pagina!\n\nNo videolesson/virtual classroom found on this page!");
    } else {
        /* stampo i link trovati */
        document.documentElement.innerHTML = "";
        output.forEach(function (item, index) {

            console.log("Found link #" + (index + 1) + ": " + item);
            /* se riesco a ottenere il contenuto dell'url eseguo function(data) */
            $.get(item).success(function (data) {
                var dlLink = data.match(/https:\/\/video\.polito\.it\/dl\/.*\.mp4|https:\/\/file\.didattica\.polito\.it\/down\/MATDID_VC\/[^"]+/gi);
                /* prendo il primo match */
                document.write("<a href=\"" + dlLink[0] + "\">" + dlLink[0] + "</a><br>\n");
            });
        });
    }
})()
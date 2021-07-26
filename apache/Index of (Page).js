// Fix omitted file names in "Index of" page
Array.from(document.getElementsByTagName("tr")).slice(3, -1).forEach(function (row) {
    var links = Array.from(row.getElementsByTagName("a"));
    if (links.length) {
        var link = links[0];
        link.innerText = link.href.replace(window.location.href, "");
    }
});
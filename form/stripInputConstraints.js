function stripInputConstraints(parent = null) {
    parent = parent || document;
    parent
        .querySelectorAll("[required]")
        .forEach(element => element.removeAttribute("required"));
    parent
        .querySelectorAll("[minlength]")
        .forEach(element => element.removeAttribute("minlength"));
    parent
        .querySelectorAll("[maxlength]")
        .forEach(element => element.removeAttribute("maxlength"));
    parent
        .querySelectorAll("[type=email], [type=password], [type=number]")
        .forEach(element => element.setAttribute("type", "text"));
}
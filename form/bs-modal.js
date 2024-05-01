function showModal(modalEl) {
    jQuery( qs(modalEl) ).modal("show");
}

function hideModal(modalEl) {
    jQuery( qs(modalEl) ).modal("hide");
}

function setModalTitle(modalEl, title) {
    qs(".modal-header .modal-title", modalEl).textContent = title;
}

function onModalEvent(modalEl, event, callback, once=false) {
    // https://getbootstrap.com/docs/4.4/components/modal/#events
    if (once) {
        jQuery( qs(modalEl) ).one(event + ".bs.modal", callback);
    } else {
        jQuery( qs(modalEl) ).on(event + ".bs.modal", callback);
    }
}
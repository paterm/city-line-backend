const Notification = (type, title, content, timeout = 5000) => {
    const container = document.querySelector('.notification-manager');
    const notification = document.createElement('div');

    notification.className = `notification alert alert-${type}`;
    notification.role = 'alert';
    notification.onclick = () => notification.remove();
    notification.innerHTML = `<h5 class="notification__title">${title}</h5>
        <p class="notification__content">${content}</p>`;

    container.append(notification);
    setTimeout(() => notification.remove(), timeout);
};
const sendForms = () => {
     const $forms = $('form');

     $forms.each((index, form) => {
        $(form).on('submit', (event) => {
            event.preventDefault();

            Notification('success', 'Огонь', 'Все работает?');
        });
     });
};

$(document).ready(() => {
    $('body').bootstrapMaterialDesign();
    sendForms();
});

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

     $forms.each((formIndex, form) => {
         const $form = $(form);

        $form.on('submit', (event) => {
            event.preventDefault();

            const action = $form.attr('action');
            const method = $form.attr('method');
            const formData = {}

            $(form).find('input[name]').each((index, node) => {
                formData[node.name] = node.value;
            });

            $.ajax({
                url: action,
                type: method,
                data: formData
            }).done(response => {
                const {redirect, message} = response;

                if (redirect) {
                    return location.href = redirect;
                }

                if (message) {
                    Notification('success', message.title, message.text);
                }
            }).fail(response => {
                const {responseJSON} = response;

                if (responseJSON.error) {
                    Notification('danger', 'Ошибка', responseJSON.error);
                }
            });
        });
     });
};

$(document).ready(() => {
    $('body').bootstrapMaterialDesign();
    sendForms();
});

import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyConfirm';
import 'pnotify/dist/es/PNotifyCallbacks';
export const successPNotify = (message) => {
    PNotify.success({
        title: 'Success',
        text: `${message}`
    });
};
export const errorPNotify = (message) => {
    PNotify.error({
        title: 'Error',
        text: `${message}`
    });
};
export const warningPNotify = (message) => {
    PNotify.notice({
        title: 'Warning',
        text: `${message}`
    });
};

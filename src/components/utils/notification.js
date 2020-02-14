import { toast } from 'react-toastify'
function showSuccess(msg) {
    toast.success(msg);
}
function showInfo(msg) {
    toast.info(msg);
}
function showWarning(msg) {
    toast.warn(msg);
}
function showError(msg) {
    toast.error(msg);
}
function handleError(err) {
    debugger;
    let error = err.response || err;
    let msg = "something went wrong"
    if (error && error.data && error.data.msg) {
        msg = error.data.msg
    }
    else if (err.msg) {
        msg = error.msg;
    }

    showError(msg)

}
export default {
    handleError,
    showSuccess,
    showInfo,
    showWarning,
}
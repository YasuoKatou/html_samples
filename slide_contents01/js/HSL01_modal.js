class HSL01_Modal {
    _callBack = null;
    _modalTag = null;

    constructor(tagId) {
        try {
            if (!tagId) throw 'none modal tag id';
            this._modalTag = document.getElementById(tagId);
            if (!this._modalTag) throw 'not found modal tag id (tag name : ' + tagId + ")";
        } catch (ex) {
            alert(ex);
        }
    }

    showModal(callBack) {
        this._callBack = callBack;
    }
}
class HSL01_Modal {
    _callBack = null;
    _modalTag = null;
    _closeButton = null;
    _closeFunction = null;
    _EventOptions = {once: true};

    constructor(tagId) {
        try {
            if (!tagId) throw 'none modal tag id';
            this._modalTag = document.getElementById(tagId);
            if (!this._modalTag) throw 'not found modal tag id (tag name : ' + tagId + ')';

            let tags = this._modalTag.getElementsByClassName('modal-close');
            if (tags.length !== 1) throw 'not found modal close button class';
            this._closeButton = tags[0];
            this._closeFunction = this._getCloseModalFunction();
            this._closeButton.addEventListener('click', this._closeFunction, this._EventOptions);
        } catch (ex) {
            alert(ex);
        }
    }

    _setCallBack(callBack) {
        this._callBack = callBack;
    }

    _getCloseModalFunction() {/* override */}

    _removeEventListener() {
        this._closeButton.removeEventListener('click', this._closeFunction, this._EventOptions);
    }

    _selectOneItem(event) {
        if (!event.target.dataset.operation) return false;
        let self = this;
        setTimeout(function() {     // このインスタンスの処理を先に完結させる
            self._callBack(self, event.target.dataset.operation);
        }, 0);
    }
}
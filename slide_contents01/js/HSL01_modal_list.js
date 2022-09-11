class HSL01_Modal_List extends HSL01_Modal {
    _list = null;
    _listItemClickFunction = null;

    constructor(tagId) {
        super(tagId);
        this._listItemClickFunction = this._getListItemClickFunction();
    }

    /**
     * 一覧の選択項目を設定する.
     */
    set listItems(param) {
        try {
            let tags = this._modalTag.getElementsByTagName('ul');
            if (tags.length !== 1) throw 'not found unique list body (ul tag)';
            this._list = tags[0];

            // remove current list
            while(this._list.firstChild) {
                this._list.removeChild(this._list.firstChild);
            }
            // dialog header
            tags = this._modalTag.getElementsByTagName('h3');
            if (tags.length !== 1) throw 'not found header tag)';
            tags[0].innerText = param['header'] ? param['header'] : '';
            // set param's item
            for (let item of param['list-items']) {
                var li = document.createElement('li');
                li.addEventListener('click', this._listItemClickFunction);
                var p = document.createElement('p');
                p.appendChild(document.createTextNode(item['title']));
                p.dataset.operation = item['operation'];        // for event.target.dataset
                li.appendChild(p);
                this._list.appendChild(li);
            }
        } catch (ex) {
            alert(ex);
        }
    }

    /**
     * モーダルウィンドウを表示する.
     * @param {*} callBack コールバック関数
     */
    showModal(callBack) {
        super._setCallBack(callBack);
        this._modalTag.style.display = 'block';
    }

    /**
     * 一覧選択イベントを処理する関数を取得する.
     * @returns 一覧選択イベントを処理する関数
     */
    _getListItemClickFunction() {
        let self = this;
        return function(event) {
            setTimeout(function() {
                self._listClickEvent(event);
            }, 0);
        }
    }

    /**
     * 一覧選択イベント処理.
     * @param {Event} event イベントオブジェクト
     */
    _listClickEvent(event) {
        super._selectOneItem(event);
    }

    /**
     * このモーダルウィンドウを閉じる処理を行う関数を取得する.
     * @returns このモーダルウィンドウを閉じる処理を行う関数
     * @override
     */
    _getCloseModalFunction() {
        let self = this;
        return function(event) {
            setTimeout(function() {
                self.closeModal();
            }, 0);
        }
    }

    /**
     * このモーダルウィンドウを閉じる.
     * @param {Event} event イベントオブジェクト
     */
    closeModal() {
        super._removeEventListener();
        this._removeEventListener();
        this._modalTag.style.display = 'none';
    }

    /**
     * 選択一覧に表示したクリックイベントを削除する.
     */
    _removeEventListener() {
        for(let li of this._list.getElementsByTagName('li')) {
            li.removeEventListener('click', this._listItemClickFunction);
        }
    }
}
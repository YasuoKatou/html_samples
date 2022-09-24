class List_Node_01 {
    _list_func = {};
    _listRootNode = null;
    _nodeCounter = 0;
    _deleteRowConf = true;
    constructor(listRootNode) {
        this._listRootNode = listRootNode;
        this._nodeCounter = listRootNode.children.length;
        this._makeFUnctionTable();
    }

    /**
     * 一覧を操作する関数テーブルを作成する
     */
    _makeFUnctionTable() {
        const self = this;
        this._list_func.movetop = function(row) {
            const ul = self._getListRoot(row, 'ul');
            ul.insertBefore(row, ul.firstChild);
        };
        this._list_func.moveup = function(row) {
            if (!row.previousElementSibling) {
                console.log('no more up')
                return;
            }
            const ul = self._getListRoot(row, 'ul');
            ul.insertBefore(row, row.previousElementSibling);
        };
        this._list_func.movedown = function(row) {
            if (!row.nextElementSibling) {
                console.log('no more down')
                return;
            }
            const ul = self._getListRoot(row, 'ul');
            ul.insertBefore(row.nextElementSibling, row);
        };
        this._list_func.movebottom = function(row) {
            const ul = self._getListRoot(row, 'ul');
            ul.appendChild(row);
        };
        this._list_func.add1 = function(row) {
            const ul = self._getListRoot(row, 'ul');
            ul.insertBefore(self._makeNewNode(), row.nextElementSibling);
        };
        this._list_func.add2 = function(row) {
            const ul = self._getListRoot(row, 'ul');
            let childListNode = self._getChildListNode(row);
            if (!childListNode) {
                childListNode = document.createElement('ul');
                row.appendChild(childListNode);
            }
            childListNode.appendChild(self._makeNewNode());
        };
        this._list_func.toggledisplay = function(row) {
            let childListNode = self._getChildListNode(row);
            if (childListNode) {
                if (!childListNode.style.display || (childListNode.style.display === 'block')) {
                    row.firstChild.classList.add('child-close-title');
                    childListNode.style.display = 'none';
                } else {
                    row.firstChild.classList.remove('child-close-title');
                    childListNode.style.display = '';
                }
            }
        }
        this._list_func.deleterow = function(row) {
            if (self._deleteRowConf) {
                let childListNode = (self._getChildListNode(row)) ? ' （下位レベルも削除）': '';
                const ret = confirm('「' + self._getTitle(row) + '」を削除します.' + childListNode);
                if (!ret) return;
            }
            const ul = self._getListRoot(row, 'ul');
            ul.removeChild(row);
        }
    }

    _getListRoot(li, tag) {
        const tagName = tag.toUpperCase();
        try {
            let parent = li.parentNode;
            while (parent.nodeName.toUpperCase() !== tagName) parent = parentNode;
            return parent;
        } catch (ex) {
            alert(ex);
        }
    }

    _getTitle(target) {
        return target.firstChild.innerText;
    }

    /**
     * １行のコンテンツを生成する.このメソッドは、オーバーライドする必要がある.
     * @returns コンテンツ
     */
    _makeNewNode() {
        const rowTitle = document.createElement('p');
        ++this._nodeCounter;
        rowTitle.appendChild(document.createTextNode('タイトル#' + this._nodeCounter));
        const newRow = document.createElement('li');
        newRow.appendChild(rowTitle);
        return newRow;
    }

    _getChildListNode(row) {
        for (let node of row.childNodes) {
            if (node.nodeName.toUpperCase() === 'UL') return node;
        }
        return null;
    }

    /**
     * 一覧操作を行う前準備を行う.このメソッドは、必要に応じてオーバーライドする必要がある.
     * @param {string} operation 一覧操作文字列
     * @param {li} li 起点となるliノード
     */
    _prepareOperateList(operation, li) {}

    operateList(operation, li) {
        if (operation in this._list_func) {
            this._prepareOperateList(operation, li);
            this._list_func[operation](li);
        } else {
            console.error(operation + ' is not support.');
        }
    }
}
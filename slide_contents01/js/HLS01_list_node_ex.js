class HLS01_List_Node_Ex extends List_Node_01 {
    _ownerClass = null;
    constructor(list_root, ownerClass) {
        super(list_root);
        this._ownerClass = ownerClass;
    }

    _findParentUL(liTag) {
        let tag = liTag.parentElement;
        while (tag.nodeName.toUpperCase() !== 'UL') {
            tag = tag.parentElement;
        }
        return tag;
    }

    _getIndexByGroup(ul, li) {
        let children = ul.childNodes;
        for (let index = 0; index< children.length; ++index) {
            if (li == children[index]) return index;
        }
        console.error('node not found at _getIndexByGroup');
        console.error(ul, li);
        return -1;
    }

    /**
     * ノードポジションを取得する.
     * @param {li} liTag 
     * @returns ノードポジション配列
     */
    getNodePosition(liTag) {
        const positions = [];
        let tag1 = liTag;
        let tag2 = liTag.parentElement;     // ul
        positions.push(this._getIndexByGroup(tag2, tag1));
        while (tag2 != this._listRootNode) {
            tag1 = tag2.parentElement;      // li
            tag2 = this._findParentUL(tag2);
            positions.push(this._getIndexByGroup(tag2, tag1));
        }
        return positions;
    }
}

/**
 * カレンダー項目（左下区画）のノードを操作するクラス.
 */
class HLS01_Row_Item_Node_Ex extends HLS01_List_Node_Ex {

    /**
     * カレンダー項目のタイトルを取得する.
     * @param {li tag} target  カレンダー項目
     * @returns 項目タイトル（作業名）
     * @override
     */
    _getTitle(target) {
        return target.firstChild.childNodes[1].innerText;
    }

    /**
     * 新規行を生成する.
     * @override
     */
    _makeNewNode() {
        return this._ownerClass.table_contents_title(++this._nodeCounter, 'タイトル#' + this._nodeCounter, this.titleIndent);
    }

    /**
     * 一覧操作を行う前準備を行う.
     * @param {string} operation 一覧操作文字列
     * @param {li tag} li 起点となるliノード
     * @override
     */
    _prepareOperateList(operation, li) {
        if (operation === 'add1') {
            let pos = this.getNodePosition(li);
            this.titleIndent = pos.length - 1;
        } else if (operation === 'add2') {
            let pos = this.getNodePosition(li);
            this.titleIndent = pos.length;
        } else {
            this.titleIndent = null;
        }
    }
}

/**
 * カレンダー詳細（右下区画）のノードを操作するクラス.
 */
 class HLS01_Row_Detail_Node_Ex extends HLS01_List_Node_Ex {

    /**
     * 新規行を生成する.
     * @override
     */
    _makeNewNode() {
        return this._ownerClass.makeCalenderDetail();
    }

    _getLibyPositions(positions) {
        let pos = positions.length - 1;
        let li = this._listRootNode.childNodes[positions[pos--]];
        while (pos >= 0) {
            let ul = li.lastChild;
            li = ul.childNodes[positions[pos--]];
        }
        return li;
    }

    operateList(operation, positions) {
        let li = this._getLibyPositions(positions);
        super.operateList(operation, li);
    }
}
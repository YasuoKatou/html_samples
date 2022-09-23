class HLS01_List_Node_Ex extends List_Node_01 {
    _ownerClass = null;
    constructor(list_root, ownerClass) {
        super(list_root);
        this._ownerClass = ownerClass;
    }

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
        return this._ownerClass._table_contents_title(++this._nodeCounter, 'タイトル#' + this._nodeCounter);
    }
}
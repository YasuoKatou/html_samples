class HSL01_Working_Calender {

    _sideFixedContent = null;
    _varContHeader = null;
    _varContBody = null;
    _calenderData = null;
    _holidays = [];
    _itemNodeOpe = null;
    _detailNodeOpe = null;
    _calenderScroll = null;

    init_calender() {
        this._initPage(true);
        this._getHolidays();

        this._setEventListners();
    }

    _setEventListners() {
        try {
            const clickEentName = (typeof window.ontouchend === "undefined") ? 'click': 'touchend';

            let tag = document.getElementById('HSL01-calender-set');
            if (!tag) throw 'HSL01-calender-set id not found !';
            tag.addEventListener(clickEentName, this._getCalenderChangeFunction());

            const tag1 = document.getElementById('HSL01-table-fixed-side-contents');
            if (!tag1) throw 'HSL01-table-fixed-side-contents id not found !';
            tag1.addEventListener(clickEentName, this._getCalenderItemOperationFunction());
            this._itemNodeOpe = new HLS01_Row_Item_Node_Ex(tag1, this);

            const tag2 = document.getElementById('HSL01-table-variable-contents-body');
            if (!tag2) throw 'HSL01-table-variable-contents-body id not found !';
            this._detailNodeOpe = new HLS01_Row_Detail_Node_Ex(tag2, this);

            this._calenderScroll = new HSL01_Calender_Scroll();
        } catch (ex) {
            alert('HSL01_Working_Calender._setEventListners : ' + ex);
        }
    }

    _getCalenderChangeFunction() {
        let self = this;
        return function(event) {
            setTimeout(function() {
                self._calenderChangeEvent(event);
            }, 0);
        }
    }
    _calenderChangeEvent(event) {
        this._initPage(false);
    }

    _initPage(isInit) {
        this._clearTableBody();
        this._calenderData = this._init_calender(isInit);
        this._init_calender_header();
        this._init_table_contents();
    }

/*
    _getCalenderScrollFunction() {
        let self = this;
        return function(event) {
            setTimeout(function() {
                self._calenderScrollEvent(event);
            }, 0);
        }
    }
    _calenderScrollEvent(event) {
        //console.log('scroll X : ' + event.target.scrollLeft + ', Y : ' + event.target.scrollTop);
        this._varContHeader.scrollLeft = event.target.scrollLeft;
    }
*/
    _clearTableBody() {
        try {
            this._sideFixedContent = document.getElementById('HSL01-table-fixed-side-contents');
            if (!this._sideFixedContent) throw 'not found fixed side contents !';
            this._removeFirstChild(this._sideFixedContent);

            this._varContHeader = document.getElementById('HSL01-table-variable-contents-header');
            if (!this._varContHeader) throw 'not found table variable header !';
            this._removeFirstChild(this._varContHeader);

            this._varContBody = document.getElementById('HSL01-table-variable-contents-body');
            if (!this._varContBody) throw 'not found table variable contents body !';
            this._removeFirstChild(this._varContBody);
        } catch (ex) {
            alert(ex);
        }
    }

    _removeFirstChild(rootTag) {
        while (rootTag.firstChild) {
            rootTag.removeChild(rootTag.firstChild);
        }
    }

    _init_table_contents() {
        try {
            let workItemList = this._init_getWorkItems();
            if (workItemList.length < 1) return;
            // console.log(workItemList);
            let no = 0;
            for (const item of workItemList) {
                this._sideFixedContent.appendChild(this.table_contents_title(++no, item));

                this._appendCalenderTag();
            }
            // TODO
        } catch (ex) {
            alert(ex);
        }
    }

    _getCalenderItemOperationFunction() {
        let self = this;
        return function(event) {
            setTimeout(function() {
                self._getCalenderItemOperationEvent(event);
            }, 0);
        }
    }
    _calenderItemMenu = {
        'header': 'カレンダー項目の操作を選択',
        'list-items': [
            {'title': '先頭に移動', 'operation': 'movetop'},
            {'title': '一つ上に移動', 'operation': 'moveup'},
            {'title': '一つ下に移動', 'operation': 'movedown'},
            {'title': '末尾に移動', 'operation': 'movebottom'},
            {'title': '同レベルに追加', 'operation': 'add1'},
            {'title': '同レベルに追加（５行）', 'operation': 'add1-5'},
            {'title': '同レベルに追加（10行）', 'operation': 'add1-10'},
            {'title': '下位レベルに追加', 'operation': 'add2'},
            {'title': '下位レベルに追加（５行）', 'operation': 'add2-5'},
            {'title': '下位レベルに追加（10行）', 'operation': 'add2-10'},
            {'title': '下位レベルの表示／非表示', 'operation': 'toggledisplay'},
            {'title': '削除', 'operation': 'deleterow'}
        ]
    };
    _getCalenderItemOperationEvent(event) {
        //console.log('_getCalenderItemOperationEvent');
        const retOpt = this._editRowInfo(event.target.parentElement.parentElement);
        const modal = new HSL01_Modal_List('HSL01-modal-list');
        modal.listItems = this._calenderItemMenu;
        modal.showModal(this._getListItemClickFunction(), retOpt);
    }

    _editRowInfo(liTag) {
        let info = {'row': liTag};
        info['positions'] = this._itemNodeOpe.getNodePosition(liTag);
        // console.log(info);
        return info;
    }

    _getListItemClickFunction() {
        let self = this;
        return function(modal, operation, retOpt) {
            modal.closeModal();
            setTimeout(function() {
                self._doCalenderItem(operation, retOpt);
            }, 100);    // 100ms : modal window close
        }
    }
    _doCalenderItem(operation, retOpt) {
        let rows = 1;
        let ope = operation;
        if ((ope === 'add1-5') || (ope === 'add2-5')){
            ope = operation.split('-')[0];
            rows = 5;
        } else if ((ope === 'add1-10') || (ope === 'add2-10')) {
            ope = operation.split('-')[0];
            rows = 10;
        }
        for (let count = 0; count < rows; ++count) {
            // カレンダー項目（左下区画）の操作
            this._itemNodeOpe.operateList(ope, retOpt['row']);
            // カレンダー詳細（右下区画）も　operation に連動する.
            this._detailNodeOpe.operateList(ope, retOpt['positions'])
        }
    }

    _makeCalenderRowItem(data, leftPadding = null) {
        let p = document.createElement('p');
        if (leftPadding && (leftPadding > 0)) {
            p.style.paddingLeft = (leftPadding * 0.5) + 'rem';
        }
        p.appendChild(document.createTextNode(data));
        return p;
    }

    table_contents_title(no, title, leftPadding = null) {
        const div = document.createElement('div');
        div.appendChild(this._makeCalenderRowItem(no++));
        div.appendChild(this._makeCalenderRowItem(title, leftPadding));
        div.appendChild(this._makeCalenderRowItem(''));
        div.appendChild(this._makeCalenderRowItem(''));
        const li = document.createElement('li');
        li.appendChild(div);
        return li;
    }

    _init_getWorkItems() {
        let items = [];
        // 作業項目の一覧を取得
        try {
            let tags = document.getElementsByClassName('HSL01-slide-page02');
            if (tags.length !==1) throw 'HSL01-slide-page02 class not found !';
            tags = tags.item(0).getElementsByTagName('ul');
            if (tags.length !==1) throw 'list tag not found !';
            tags = tags.item(0).getElementsByTagName('li');
            if (tags.length === 0) throw '作業項目が未設定です.';
            for (var liTag of tags) {
                items.push(liTag.textContent);
            }
        } catch (ex) {
            alert(ex);
        } finally {
            return items;
        }
    }

    _init_calender(isInit) {
        try {
            let tag = document.getElementById('start-date');
            if (!tag) throw 'start-date input tag not found !';
            let today = new Date();
            if (isInit) {
                tag.valueAsDate = today;
            } else {
                today = tag.valueAsDate;
            }

            tag = document.getElementById('start-first-date');
            if (!tag) throw 'start-first-date input tag not found !';
            const start1stDate = tag.checked;

            tag = document.getElementById('date-period');
            if (!tag) throw 'date-period input tag not found !';
            const numberOfMonth = tag.options[tag.selectedIndex].value;

            const calender = new HSL01_Calender();
            const calenderData = calender.getCalenderList(today, start1stDate, numberOfMonth);
            //console.log(calenderData);
            return calenderData;
        } catch (ex) {
            alert(ex);
            return [];
        }
    }

    _init_calender_header() {
        try {
            for (let month of this._calenderData) {
                let header1 = document.createElement('div');
                let p = document.createElement('p');
                p.appendChild(document.createTextNode(month['startDate'].getMonth() + 1 + '月'));
                header1.appendChild(p);

                let header2 = document.createElement('div');
                let header3 = document.createElement('div');
                let thisYear = month['startDate'].getFullYear();
                let thisMonth = month['startDate'].getMonth();
                let startDay = month['startDate'].getDate();
                let dayOfWeek = month['startDate'].getDay();
                for (let dayCount = 0; dayCount < month['days']; ++dayCount) {
                    let today = startDay + dayCount;
                    p = document.createElement('p');
                    p.appendChild(document.createTextNode(today));
                    if (this._isPublicHoliday(thisYear, thisMonth, today)) {
                        p.classList.add('HSL01-calender-holiday');
                    } else if (dayOfWeek === 0) {
                        p.classList.add('HSL01-calender-sun');
                    } else if (dayOfWeek === 6) {
                        p.classList.add('HSL01-calender-sat');
                    }
                    header2.appendChild(p);
                    p = document.createElement('p');
                    p.appendChild(document.createTextNode(''));
                    header3.appendChild(p);
                    if (++dayOfWeek > 6) dayOfWeek = 0;
                }
                let headerMonth = document.createElement('div');
                headerMonth.appendChild(header1);
                headerMonth.appendChild(header2);
                headerMonth.appendChild(header3);
                this._varContHeader.appendChild(headerMonth);
            }
        } catch (ex) {
            alert(ex);
        }
    }

    makeCalenderDetail() {
        const rowItems = document.createElement('div');
        for (let month of this._calenderData) {
            let monthTag = document.createElement('div');
            let thisYear = month['startDate'].getFullYear();
            let thisMonth = month['startDate'].getMonth();
            let todayDay = month['startDate'].getDate();
            let dayOfWeek = month['startDate'].getDay();
            for (let dayCount = 0; dayCount < month['days']; ++dayCount) {
                let p = document.createElement('p');
                p.appendChild(document.createTextNode(''));
                if (this._isHoliday(thisYear, thisMonth, todayDay, dayOfWeek)) {
                    p.classList.add('HSL01-horiday');
                }
                monthTag.appendChild(p);
                ++todayDay;
                if (++dayOfWeek > 6) dayOfWeek = 0;
            }
            rowItems.appendChild(monthTag);
        }
        const row = document.createElement('li');
        row.appendChild(rowItems);
        return row;
    }
    /**
     * カレンダー詳細（右下区画）の行を追加する.
     */
     _appendCalenderTag() {
        try {
            this._varContBody.appendChild(this.makeCalenderDetail());
        } catch (ex) {
            alert('error at _appendCalenderTag : ' + ex);
        }
    }

    _getHolidays() {
        let tags;
        try {
            const ul = document.getElementById('HSL01-public-holiday-list');
            if (!ul) throw 'not found public holiday list tag !';
            let li = ul.firstElementChild;
            while (li) {
                tags = li.getElementsByTagName('input');
                if (!tags) throw 'not found public holiday input tag !';
                this._holidays.push(new Date(tags[0].value));

                li = li.nextElementSibling;
            }
            //console.log(this._holidays);
        } catch (ex) {
            alert(ex);
        }
    }

    _isHoliday(year, month, date, dayOfWeek) {
        if (dayOfWeek === 0) {
            return true;
        } else if (dayOfWeek === 6) {
            return true;
        }
        return this._isPublicHoliday(year, month, date);
    }

    _isPublicHoliday(year, month, date) {
        for (let holiday of this._holidays) {
            if ((holiday.getFullYear() === year) && (holiday.getMonth() === month) && (holiday.getDate() === date)) {
                return true;
            }
        }
        return false;
    }
}
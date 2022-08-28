class HSL01_Working_Calender {

    _sideFixedContent = null;
    _varContHeader = null;
    _varContBody = null;

    init_calender() {
        this._clearTableBody();
        this._init_table_contents();
        const calenderData = this._init_calender();
        this._init_calender_header(calenderData);
    }

    _clearTableBody() {
        try {
            this._sideFixedContent = document.getElementById('HSL01-table-fixed-side-contents');
            if (!this._sideFixedContent) throw 'not found fixed side contents !'
            this._removeFirstChild(this._sideFixedContent);

            this._varContHeader = document.getElementById('HSL01-table-variable-contents-header');
            if (!this._varContHeader) throw 'not found table variable header !'
            this._removeFirstChild(this._varContHeader);

            this._varContBody = document.getElementById('HSL01-table-variable-contents-body');
            if (!this._varContBody) throw 'not found table variable contents body !'
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
            let no = 1;
            for (const item of workItemList) {
                let ul = document.createElement('ul');
    
                ul.appendChild(this._table_contents_title(no++));
                ul.appendChild(this._table_contents_title(item));
                ul.appendChild(this._table_contents_title(''));
                ul.appendChild(this._table_contents_title(''));
    
                this._sideFixedContent.appendChild(ul);
            }
            // TODO
        } catch (ex) {
            alert(ex);
        }
    }

    _table_contents_title(data) {
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(data));
        let li = document.createElement('li');
        li.appendChild(p);
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
    
    _init_calender() {
        try {
            let tag = document.getElementById('start-date');
            if (!tag) throw 'start-date input tag not found !';
            const today = new Date();
            tag.valueAsDate = today;
    
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

    _init_calender_header(calenderData) {
        try {
            for (let monthList of calenderData) {
                for (let month of monthList) {
                    let header1 = document.createElement('div');
                    let p = document.createElement('p');
                    p.appendChild(document.createTextNode(month[0].getMonth() + 1 + '月'));
                    header1.appendChild(p);

                    let header2 = document.createElement('div');
                    let header3 = document.createElement('div');
                    for (let date of month) {
                        p = document.createElement('p');
                        p.appendChild(document.createTextNode(date.getDate()));
                        let dayOfWeek = date.getDay();
                        if (dayOfWeek === 0) {
                            p.classList.add('HSL01-calender-sun');
                        } else if (dayOfWeek === 6) {
                            p.classList.add('HSL01-calender-sat');
                        }
                        header2.appendChild(p);
                        header3.appendChild(document.createElement('p'));
                    }
                    let headerMonth = document.createElement('div');
                    headerMonth.appendChild(header1);
                    headerMonth.appendChild(header2);
                    headerMonth.appendChild(header3);
                    this._varContHeader.appendChild(headerMonth);
                }
            }
        } catch (ex) {
            alert(ex);
        }
    }
}
class HSL01_Modal_List extends HSL01_Modal {
    constructor(tagId) {
        super(tagId);
    }

    set listItems(param) {
        try {
            let tags = this._modalTag.getElementsByTagName('ul');
            if (tags.length !== 1) throw 'not found unique list body (ul tag)';
            let ul = tags[0];

            // remove current list
            while(ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            // dialog header
            tags = this._modalTag.getElementsByTagName('h3');
            if (tags.length !== 1) throw 'not found header tag)';
            tags[0].innerText = param['header'] ? param['header'] : '';
            // set param's item
            for (let item of param['list-items']) {
                var li = document.createElement('li');
                li.dataset.operation = item['operation'];
                var p = document.createElement('p');
                p.appendChild(document.createTextNode(item['title']));
                li.appendChild(p);
                ul.appendChild(li);
            }
        } catch (ex) {
            alert(ex);
        }
    }

    showModal(callBack) {
        super.showModal(callBack);
        this._modalTag.style.display = 'block';
    }
}
class HSL01_Slide {
    start_slide() {
        const self = this;
        document.addEventListener('click', (event) => {
            self._clickEvent(event);
        });
    }

    _clickEvent(event) {
        let target = event.target;
        let slidePage = '';
        if (target.classList.contains('HSL01-slide-page01-tag')) {
            slidePage = 'HSL01-slide-page01';
        } else if (target.classList.contains('HSL01-slide-page02-tag')) {
            slidePage = 'HSL01-slide-page02';
        } else if (target.classList.contains('HSL01-slide-page03-tag')) {
            slidePage = 'HSL01-slide-page03';
        }
        if (slidePage) {
            if (this._is_page_actice(target)) {
                this._hide_page();
                this._clear_active_tag();
                this._do_slide(slidePage, 'out');
            } else {
                this._show_slide_body();
                this._hide_page();
                this._clear_active_tag();
                this._show_page(slidePage);
                this._do_slide(slidePage, 'in');
                target.classList.add(slidePage + '-tag-active');
            }
        }
    }
    _is_page_actice(target) {
        const iter = target.classList.values();
        for (let v = iter.next(); !v.done; v = iter.next()) {
            if (v.value.match(/-tag-active$/)) {
                return true;
            }
        }
        return false;
    }
    _show_slide_body() {
        let els = document.getElementsByClassName('HSL01-slide-body');
        if (els.length !== 1) {
            console.error('no found slide body');
            return;
        }
        let c = els[0];
        c.style.display = 'block';
    }
    _hide_page() {
        let els = document.getElementsByClassName('HSL01-slide-page-body');
        if (els.length < 1) {
            console.error('no found slide tag page body');
            return;
        }
        for (let index = 0; index < els.length; ++index) {
            let pageTag = els[index].firstElementChild;
            if (!pageTag.classList.contains('HSL01-slide-page-hidden')) {
                pageTag.classList.add('HSL01-slide-page-hidden');
            }
        }
    }
    _clear_active_tag() {
        let els = document.getElementsByClassName('HSL01-slide-tag');
        if (els.length !== 1) {
            console.error('no found slide tag container');
            return;
        }
        els = els[0].getElementsByTagName('img');
        if (els.length === 0) {
            console.error('no found slide tag');
        }
        for (let index = 0; index < els.length; ++index) {
            let imgTag = els[index];
            const iter = imgTag.classList.values();
            for (let v = iter.next(); !v.done; v = iter.next()) {
                if (v.value.match(/-tag-active$/)) {
                    imgTag.classList.remove(v.value);
                    break;
                }
            }
        }
    }
    _show_page(className) {
        let els = document.getElementsByClassName(className);
        if (els.length !== 1) {
            console.error('no found slide page(' + className + ')');
            return;
        }
        let c = els[0];
        c.classList.remove('HSL01-slide-page-hidden');
    }
    _do_slide(className, inOut) {
        let els = document.getElementsByClassName('HSL01-slide-container');
        if (els.length !== 1) {
            console.error('no found slide container');
            return;
        }
        let c = els[0];
        let rmList = [];
        c.classList.forEach(clsName => {
            if (clsName.match(/-slidein$|-slideout$/)) {
                rmList.push(clsName);
            }
        });
        c.classList.remove(...rmList);
        c.classList.add(className + '-slide' + inOut);
    }
}
class HSL01_Calender_Scroll {
    _calenderTitle = null;
    _detaildate = null;
    _detailBody = null;
    _prevPos = null;
    constructor() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._calenderTitle = document.getElementById('HSL01-table-fixed-side-contents');
        if (!this._calenderTitle) throw 'not found HSL01-table-fixed-side-contents at HSL01_Calender_Scroll._setEventListeners()';
        this._detaildate = document.getElementById('HSL01-table-variable-contents-header');
        if (!this._detaildate) throw 'not found HSL01-table-variable-contents-header at HSL01_Calender_Scroll._setEventListeners()';
        this._detailBody = document.getElementById('HSL01-table-variable-contents-body');
        if (!this._detailBody) throw 'not found HSL01-table-variable-contents-body at HSL01_Calender_Scroll._setEventListeners()';
        if (typeof window.ontouchstart === "undefined") {
            // for PC
            this._detailBody.addEventListener('mousedown', this._getMouseDownEventFunction());
            this._detailBody.addEventListener('mouseup', this._getMouseUpEventFunction());
            this._detailBody.addEventListener('mousemove', this._getMouseMoveEventFunction());
            this._detailBody.addEventListener('mouseleave', this._getMouseLeaveEventFunction());
        } else {
            this._detailBody.addEventListener('touchstart', this._getTouchStartEventFunction());
            this._detailBody.addEventListener('touchend', this._getTouchEndEventFunction());
            this._detailBody.addEventListener('touchmove', this._getTouchMoveEventFunction());
        }

    }

    _getMouseDownEventFunction() {
        let self = this;
        return function(event) { setTimeout(function() { self._mouseDownEvent(event); }, 0); };
    }
    _getMouseUpEventFunction() {
        let self = this;
        return function(event) { setTimeout(function() { self._mouseUpEvent(event); }, 0); };
    }
    _getMouseMoveEventFunction() {
        let self = this;
        return function(event) { setTimeout(function() { self._mouseMoveEvent(event); }, 0); };
    }
    _getMouseLeaveEventFunction() {
        let self = this;
        return function(event) { setTimeout(function() { self._mouseLeaveEvent(event); }, 0); };
    }

    _getTouchStartEventFunction() {
        let self = this;
        return function(event) { setTimeout(function() { self._touchStartEvent(event); }, 0); };
    }
    _getTouchMoveEventFunction() {
        let self = this;
        return function(event) { setTimeout(function() { self._touchMoveEvent(event); }, 0); };
    }
    _getTouchEndEventFunction() {
        let self = this;
        return function(event) { setTimeout(function() { self._touchEndEvent(event); }, 0); };
    }

    _mouseDownEvent(event) { this._startDrag(event.clientX, event.clientY); }
    _mouseMoveEvent(event) { this._dragging(event.clientX, event.clientY); }
    _mouseUpEvent(event) { this._endDrag(); }
    _mouseLeaveEvent(event) { this._endDrag(); }

    _touchStartEvent(event) { this._startDrag(Math.trunc(event.touches[0].clientX), Math.trunc(event.touches[0].clientY)); }
    _touchMoveEvent(event) { this._dragging(Math.trunc(event.touches[0].clientX), Math.trunc(event.touches[0].clientY)); }
    _touchEndEvent(event) { this._endDrag(); }

    _startDrag(x, y) {
        this._prevPos = {x: x, y: y};
    }

    _dragging(x, y) {
        if (!this._prevPos) return;
        // console.log('_dragging');
        let dx = this._prevPos.x - x;
        let dy = this._prevPos.y - y;
        if (dx) {
            this._detailBody.scrollLeft += dx;
            this._detaildate.scrollLeft = this._detailBody.scrollLeft;
        }
        if (dy) {
            this._calenderTitle.scrollTop += dy;
            this._detailBody.scrollTop = this._calenderTitle.scrollTop;
            // console.log(this._detailBody.scrollTop);
        }
        this._prevPos.x = x;
        this._prevPos.y = y;
    }

    _endDrag() {
        this._prevPos = null;
    }
}
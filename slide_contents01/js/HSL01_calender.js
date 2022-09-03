/**
 * カレンダークラス
 */
 class HSL01_Calender {
    /**
     * 指定日付の月末日を取得する.
     * @param {Date} thisDate 
     * @returns 月末日付
     */
    _getLastDate(thisDate) {
        return new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0);
    }

    /**
     * 開始日から月末までの日付情報を生成する.
     * @deprecated 日数分の日付オブジェクトを作成する.
     * @param {Date} today 開始日付
     * @param {boolean} isStart1stDay 1日から日付情報を生成する場合、true
     * @returns 日付オブジェクト配列
     */
    _makeDayList(today, isStart1stDay) {
        const lastDate = this._getLastDate(today);      // 月末の日付
        const firstDate = isStart1stDay ? 1 : today.getDate();
        let dayWork = new Date(today.getFullYear(), today.getMonth(), firstDate);
        const dayList = [];
        while (dayWork <= lastDate) {
            dayList.push(new Date(dayWork.getTime()));
            dayWork.setDate(dayWork.getDate() + 1);
        }
        return dayList;
    }

    /**
     * 開始日から月末までの日付情報を生成する.
     * @param {Date} today 開始日付
     * @param {boolean} isStart1stDay 1日から日付情報を生成する場合、true
     * @returns 下記項目をもつ連想配列
     * <ul>
     *   <li>{Date} startDate 開始日付</li>
     *   <li>{Date} lastDate 月末の日付</li>
     *   <li>{int} days 日数</li>
     * </ul>
     */
    _makeMonthInfo(today, isStart1stDay) {
        const info = {};
        info['lastDate'] = this._getLastDate(today);    // 月末の日付
        const firstDate = isStart1stDay ? 1 : today.getDate();
        info['startDate'] = new Date(today.getFullYear(), today.getMonth(), firstDate);
        info['days'] = info['lastDate'].getDate() - info['startDate'].getDate() + 1;
        return info;
    }

    /**
     * カレンダー情報を作成する.
     * @param {Date} fromDate 開始日付
     * @param {boolean} isStart1stDay 1日から日付情報を生成する場合、true
     * @param {int} numberOfMonth 対象の月数
     * @returns 日付情報配列
     */
    getCalenderList(fromDate, isStart1stDay, numberOfMonth) {
        const calender = [];
        let flag = isStart1stDay;
        let now = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        for (let monthCount = 0; monthCount < numberOfMonth; ++monthCount) {
            calender.push(this._makeMonthInfo(now, flag));
            var nextMonth = now.getMonth() + 1;
            if (nextMonth < 12) {
                now = new Date(now.getFullYear(), nextMonth, 1);
            } else {
                now = new Date(now.getFullYear() + 1, 0, 1);
            }
            flag = true;
        }
        return calender;
    }
}
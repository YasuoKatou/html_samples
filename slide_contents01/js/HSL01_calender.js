/**
 * カレンダークラス
 */
 class HSL01_Calender {
    /**
     * 指定日付の月末日を取得する.
     */
    getLastDate(thisDate) {
        return new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0);
    }
    makeDayList(today, isStart1stDay) {
        const lastDate = this.getLastDate(today);      // 月末の日付
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
     * カレンダー情報を作成する.
     * 2022
     *      11  1 - 30
     *      12  1 - 31
     * 2023
     *      1   1 - 31
     *      2   1 - 28
     */
    getCalenderList(fromDate, isStart1stDay, numberOfMonth) {
        const calender = [];
        let monthList = null;
        let flag = isStart1stDay;
        let now = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        for (let monthCount = 0; monthCount < numberOfMonth; ++monthCount) {
            if (!monthList) monthList = [];
            monthList.push(this.makeDayList(now, flag));
            var nextMonth = fromDate.getMonth() + 1;
            if (nextMonth < 12) {
                now = new Date(now.getFullYear(), nextMonth, 1);
            } else {
                calender.push(monthList);
                now = new Date(now.getFullYear() + 1, 1, 1);
            }
            flag = false;
        }
        if (monthList && !calender.includes(monthList)) calender.push(monthList);
        return calender;
    }
}
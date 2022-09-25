function TodayList() {
    return ( 
        <>
            <div className="todayWrap">
                <p className="txt">오늘 할 일은 무엇인가요?</p>
                <input type="text" className="center" autoComplete="off" spellCheck="false"/>
            </div>
        </>
     );
}

export default TodayList;
function TodayList(props) {

    const currentValue = (e) => {
        props.setTodayStorage(e.target.value);
        console.log(e.target.value);
    }

    const enterPress = (e) => {
        if(e.key === 'Enter'){
            props.setTodayList(true);
            props.setTodayIsPressed(true);
            console.log(props.todayList);
            console.log('엔터를 눌렀다');
        }
    }

    return ( 
        <>
            <div className="todayWrap">
                <p className="txt">오늘 할 일은 무엇인가요?</p>
                <input type="text" className="center" autoComplete="off" spellCheck="false" onChange={currentValue}
                onKeyPress={enterPress}/>
            </div>
        </>
     );
}

export default TodayList;
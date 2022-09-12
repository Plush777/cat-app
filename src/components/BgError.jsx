import { useNavigate } from 'react-router-dom';

function BgError() {
    
    let navigate = useNavigate()

    return ( 
        <>
            <div className="center">
                <p className="reason">이런! 이미지를 불러오지 못했어요.</p>
                <button type="button" onClick={() => navigate(0)} className="btn btnHome">
                    <span>새로고침</span>
                </button>
            </div>
        </>
     );
}

export default BgError;
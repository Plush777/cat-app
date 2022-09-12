import SyncLoader from "react-spinners/SyncLoader";

function Loading() {
    return ( 
        <>
            <div className="loadingBg">
                <div id="loading">
                    <SyncLoader color='#000' width={24} height={24}/>
                    <p>잠시만 기다려줘요...</p>
                </div>
            </div>
        </>
     );
}

export default Loading;
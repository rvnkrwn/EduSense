export default function Loading() {
    return (
        <div className="fixed h-screen w-screen bg-base-300/50 backdrop-blur" style={{zIndex: 999999}}>
            <div
                className="w-full h-2 bg-base-100">
                <div id="loader" className="bg-blue-600 h-full"></div>
            </div>
        </div>
    )
}
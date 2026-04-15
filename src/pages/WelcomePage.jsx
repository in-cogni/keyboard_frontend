import '../styles/WelcomePage.css';

function WelcomePage({onNavigate}){
    return (
        <div className='welcome-container'>
            <div
            className='user-info'
            style={{display:'none'}}>
                <div>Имя: </div>
                <div>Рекорд: </div>
            </div>
            <button
            className='login-btn'
            onClick={()=>onNavigate('login')}>
                Войти
            </button>
            <h1 className='title'>Клавиатурный тренажёр</h1>
            <button
            className='start-btn'
            onClick={()=> onNavigate('text-selection')}>
                Начать
            </button>
            
        </div>
    );
}
export default WelcomePage;
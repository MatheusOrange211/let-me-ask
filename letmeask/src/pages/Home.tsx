import { Button } from '../components/button';
import { useHistory } from 'react-router';
import {auth, firebase} from '../services/firebase';
import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg';
import '../styles/global.scss';
import '../styles/auth.scss';

export function Home(){
    const history = useHistory();

    function HandleCreateRoom(){
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).then(result =>{
            console.log(result, true);
        })

        history.push('/rooms/new');
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Imagem de Ilustração da página"/>
                <strong>Crie  salas Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="let me Ask logo" />
                    <button  onClick = {HandleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">Ou crie uma sala</div>
                    <form>
                        <input 
                        type="text"
                        placeholder = "Digite o código de uma sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
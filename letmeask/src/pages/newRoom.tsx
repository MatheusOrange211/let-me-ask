import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg';
import '../styles/global.scss';
import '../styles/auth.scss';

export function NewRoom(){
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
                    <h2>Criar uma nova Sala</h2>
                    <form>
                        <input 
                        type="text"
                        placeholder = "Nome da Sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to= "/">Clique aqui</Link>.
                    </p>
                </div>
            </main>
        </div>
    )
}
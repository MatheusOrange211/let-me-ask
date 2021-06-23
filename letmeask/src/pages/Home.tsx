import { FormEvent } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../components/button';
import { useAuth } from '../hooks/useAuth';

import logoImg from '../assets/logo.svg';
import illustrationImg from '../assets/illustration.svg';
import googleIconImg from '../assets/google-icon.svg';

import '../styles/global.scss';
import '../styles/auth.scss';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home(){
    const history = useHistory();
    const {SignInWithGoogle, user} =  useAuth();
    const [roomCode, setRoomCode]  = useState('');
    async function HandleCreateRoom(){
      if(!user){
        await SignInWithGoogle();
      }
       history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        
        if(roomCode.trim() === ''){
            return;
        }
        const roomdef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomdef.exists()){
            alert('Room does Not Exist !');
            return;
        }

        history.push(`/rooms/${roomCode}`);
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
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit ={handleJoinRoom}>
                        <input 
                        type="text"
                        placeholder = "Digite o código de uma sala"
                        onChange = {event =>{setRoomCode(event.target.value)}}
                        value = {roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
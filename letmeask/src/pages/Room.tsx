import { Button } from '../components/button';
import { useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

import logoImg from '../assets/logo.svg';

import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
// import { error } from 'console';
import { database } from '../services/firebase';
import { useEffect } from 'react';

type RoomPars = {
    id: string;
}

type FirebaseQuestions = Record<string,{
    author:{
        name: string, 
        avatar: string,
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
} >

type Question = {
    id: string;
    author:{
        name: string, 
        avatar: string,
    },
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Room(){
    const {user} = useAuth();
    const [newQuestion, setNewQuestion] = useState('');
    const [Questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    const params  = useParams<RoomPars>();
    const roomId = params.id;
    const notifyError  =  () => toast.error("This didn't work.");

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.once('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {};
            
            const parsedQuestions =  Object.entries(firebaseQuestions ).map(([key, value])=>{
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })

    },[roomId]);

    async function handleSendQuestion(event:FormEvent){
        event.preventDefault();

        if (newQuestion.trim() === ''){
            return;
        }

        if(!user){
            notifyError();
            throw  new Error("ERROR  EXISTENTE");
        }else{
            toast.success('Successfully toasted!');
        }


        const question  = {
            content : newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted  : false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }
    return(
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="Logo do app" />
                  <RoomCode code = {roomId}/>
               </div>
           </header>

           <main>
               <div className="room-title">
                   <h1>Sala {title}</h1>
                   {Questions.length > 0 && <span> {Questions.length} pergunta(s)</span>}
               </div>

               <form onSubmit  = {handleSendQuestion}>
                   <textarea
                   placeholder = "O que deseja perguntar?"   
                   onChange = {event =>{setNewQuestion(event.target.value)}}
                   value = {newQuestion}
                   />
                   <div className="form-footer">
                       {user ?(
                           <div className = 'user-info'>
                               <img src={user.avatar} alt={user.name} />
                               <span>{user.name}</span>
                           </div>
                       ):(
                        <span>Para enviar uma pergunta, <button>faça o seu  Login</button></span>
                       )}
                       <Button type = "submit" disabled = {!user}>Enviar pergunta</Button>
                   </div>
               </form>

               {JSON.stringify(Questions)}
           </main>
       </div>
    );
}
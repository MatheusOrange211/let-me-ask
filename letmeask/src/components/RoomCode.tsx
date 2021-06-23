import copyImg from '../assets/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){

    function copyRoomToClipboard(){
        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick = {copyRoomToClipboard}>
            <div>
                <img src={copyImg} alt="Copy Image"/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}
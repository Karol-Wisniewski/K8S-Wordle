import '../App.scss';
import { useState } from 'react';

function Admin({axiosClient, currentUser}) {

    const [msg, setMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const wordInput = document.getElementById('wordInput');
        const word = wordInput.value.toLowerCase();
        console.log(word);
        axiosClient.post('/words', {
            word: word,
        }).then((response) => {
            console.log(response);
            setMsg(`Word ${word} added successfully!`);
        }).catch((error) => {
            console.log(error);
            setMsg(error.response.data.message || `Error while adding word ${word}!`);
        });
    };

    return (
    <div className="Admin">
        <form>
            <input type="text" placeholder="Word..." id="wordInput"/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Add word</button>
        </form>
        {msg && <p>{msg}</p>}
    </div>
    );
}

export default Admin;

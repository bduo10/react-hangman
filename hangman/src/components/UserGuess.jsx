
function UserGuess({submitGuess}) {
    return (

        <div>
            <form onSubmit={submitGuess}> 
                <label>Input Guess </label>
                <input id='user-guess' maxLength ='11' type ="text" />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UserGuess
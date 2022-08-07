
function DisplayGuesses(props) {
    const {wrongGuesses} = props 

    return (
        <div> 
            { wrongGuesses.length != 0 && 
            <div>
            <h2> Wrong Guesses: </h2>
            {
                wrongGuesses.map((letter, index) => {
                    return <h3 key={index} > {index+1} : {letter}</h3>
                })
            }
            
            </div>}
        </div> 
    )
}

export default DisplayGuesses 
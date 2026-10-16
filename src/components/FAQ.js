//-----------------------------Import all dependencies, other Components-----------------------------//
import Questions from './data/faqs.json';
import { useState } from 'react';
//-----------------------------Function Component-----------------------------//
function FAQ() {
    
//-----------------------------Declear a state "Key words"-----------------------------//
    const [enteredKeywords, setEnteredKeywords] = useState('');

    let id=0;
    const FAQHeader = { 
        minHeight: '60vh',
        backgroundColor: '#70b1f1'
    }
    const QuestionStyle = {   
        minHeight: '15vh',
        backgroundColor: '#6394c5'
    }

//-----------------------------Component UI: HTML Rendering-----------------------------//
    return(<>
        <div style={FAQHeader} >
            <h1>Frequently Asked Questions</h1>
            {/*Add search box on top*/}
            <div className='row'>
                <input className='col-11 m-3'
                type='text'
                name='search' 
                onChange={(e) => {setEnteredKeywords(e.target.value)} } placeholder='Keywords' >
                </input>
            </div> 
            {/*Loop through all questions and display them*/}
            <div>
                {/*and extract “question” & “answer” */}
                {Questions.filter(
                    question => question.question.toLowerCase().includes(enteredKeywords.toLowerCase())
                    || question.answer.toLowerCase().includes(enteredKeywords.toLowerCase())
                ).map(
                question => {
                    return(
                    
                        <div className=' p-3 m-2' key={id++} style={QuestionStyle}>
                            <h4>{question.question}</h4>
                            <p>{question.answer}</p>
                        </div>

                    );
                }
                )}
            </div> 
        </div>
    </>);
}
//-----------------------------Export this component to the entire app, can be re-used or hooked into other Components-----------------------------//
export default FAQ; 
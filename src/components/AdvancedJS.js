
//Function components
function AdvancedJS() {
 //Component UI: HTML Rendering
    const BackgroundStyle = { 
        minHeight: '68vh',
        backgroundColor: '#70b1f1'
    }
    const AccordionStyle = { 
        minHeight: '5vh',
        backgroundColor: '#88b9e9'
    }

 return(<>
    <div style={BackgroundStyle}>
{/*-----------------------------bootstrap section-----------------------------*/}
        <div className="accordion row align-items-start p-2" id="accordionExample" >
            <div className="row col-12 col-lg-3"  >
{/*-----------------------------Demo 1 Button-----------------------------*/}
                <h2 className="accordion-header col-6 col-lg-12 ">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"style={AccordionStyle} >
                        <h3>demo 1</h3>
                    </button>
                </h2>
{/*-----------------------------Demo 2 Button-----------------------------*/}
                <h2 className="accordion-header col-6 col-lg-12 ">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" style={AccordionStyle} >
                        <h3>demo 2</h3>
                    </button>
                </h2>
{/*-----------------------------Demo 3 Button-----------------------------*/}
                <h2 className="accordion-header col-6 col-lg-12 ">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" style={AccordionStyle}>
                        <h3>demo 3</h3>
                    </button>
                </h2>
{/*-----------------------------Demo 4 Button-----------------------------*/}
                <h2 className="accordion-header col-6 col-lg-12 ">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour" style={AccordionStyle}>
                        <h3>demo 4</h3>
                    </button>
                </h2>
{/*-----------------------------Demo 5 Button-----------------------------*/}
                <h2 className="accordion-header col-6 col-lg-12 ">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive" style={AccordionStyle}>
                        <h3>demo 5</h3>
                    </button>
                </h2>
            </div>
{/*-----------------------------DEMO SECTION-----------------------------*/}
           
            <div className="col-12 col-lg-9">
{/*-----------------------------Demo 1-----------------------------*/}
                <div className="accordion-item">
                    <div id="collapseOne" className="accordion-collapse collapse show border border-dark" data-bs-parent="#accordionExample">
                       <div className="accordion-body">Demo1
                            <p> this will be my address auto full section  </p>
                       </div>
                    </div>
                </div>
{/*-----------------------------Demo 2-----------------------------*/}
                <div className="accordion-item">
                    <div id="collapseTwo" className="accordion-collapse collapse border border-dark" data-bs-parent="#accordionExample">
                       <div className="accordion-body">Demo2
                            <p> this will be my Map section  </p>
                       </div>
                    </div>
                </div>
{/*-----------------------------Demo 3-----------------------------*/}
                <div className="accordion-item">
                    <div id="collapseThree" className="accordion-collapse collapse border border-dark" data-bs-parent="#accordionExample">
                       <div className="accordion-body">Demo3</div>
                    </div>
                </div>
{/*-----------------------------Demo 4-----------------------------*/}
                <div className="accordion-item">
                    <div id="collapseFour" className="accordion-collapse collapse border border-dark" data-bs-parent="#accordionExample">
                       <div className="accordion-body">Demo4</div>
                    </div>
                </div>
{/*-----------------------------Demo 5-----------------------------*/}
                <div className="accordion-item">
                    <div id="collapseFive" className="accordion-collapse collapse border border-dark" data-bs-parent="#accordionExample">
                       <div className="accordion-body">Demo5</div>
                    </div>
                </div>



                
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

 </>);
}

//Export this component to the entire app, can be re-used or hooked into other Components
export default AdvancedJS; 
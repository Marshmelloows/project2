//Function Component
function FormRepairDetail( {passDataToParent} ) {
 //Component UI: HTML Rendering
    //States
    //Data
    //Methods and functions 
    const handleWarrantyChange = (e) => {
        //Handle te waranty checkbox
        let purchaseDate = new Date(document.getElementById('purchaseDate').value);
        let currentDate = new Date(); //today
        let diffTime = Math.abs(currentDate - purchaseDate);
        let diffMonths = Math.ceil(diffTime/ (1000*60*60*24*30));
        //Enable or disable checkbox
        if (diffMonths > 24) {
            document.getElementById('warrantyCheck').disabled = true;
        } else {
            document.getElementById('warrantyCheck').disabled = false;
        }
        
    };

    const updateWarranty = (value) => {
    passDataToParent(value); //Child1 (FormCourtesyPhone)
    }

    return(<>
        {/*Purchase date*/}
        <h2>Repair Details</h2>
        <div className="row mt-1">
            <label class="col-12 col-md-12 col-lg-4">Purchase Date *</label>
            <input class="col-12 col-md-12 col-lg-7" type="date" id="purchaseDate"
                max={/**/
                    new Date(Date.now()).toISOString().split("T")[0]
                }
                onChange={handleWarrantyChange}
            required/>
        </div>
        {/*Repair date*/}
        <div class="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
            <input className="col-12 col-md-12 col-lg-7" type="date"
                min={/**/
                    new Date(Date.now()).toISOString().split("T")[0]}
            required/>
        </div>
        {/*Under Warranty*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                <legend className="col-11 float-none w-auto">Under Warranty</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                    <input type="checkbox" id="warrantyCheck" disabled={true} onChange={(event) => updateWarranty(event.target.checked) }/>
                        {/*passDataToParent(event.target.checked).
                        This is shared warranty need to pass upto parent Component "Home" */}
                </div>
            </fieldset>
        </div>
        {/*IMEI details*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">IMEI Number*</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" required 
            maxLength={15}
            minLength={15}/>
        </div>
        {/*Make*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Make *</label>
            <select className="col-12 col-md-12 col-lg-7">
                <option value="Apple" selected>Apple</option>
                <option value="LG">LG</option>
                <option value="Motorola">Motorola</option>
                <option value="Nokia">Nokia</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="Other">Other</option>    
            </select>
        </div>

        {/*Model number*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Model Number*</label>
            <input className="col-12 col-md-12 col-lg-7" type="number" required />
        </div>
        {/*Fault Category*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
            <select className="col-12 col-md-12 col-lg-7">
                <option value="Apple" selected>Battery</option>
                <option value="LG">Charging</option>
                <option value="Motorola">Screen</option>
                <option value="Nokia">SD-storage</option>
                <option value="Samsung">Software</option>
                <option value="Other">Other</option>    
            </select>
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormRepairDetail; 
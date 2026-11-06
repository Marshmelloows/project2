import React, { useState, useEffect } from 'react';
//Function Component
function FormRepairDetail( {passDataToParent, sendRepairDetails} ) {
 //Component UI: HTML Rendering
    //States
    const [RepairDetails, setRepairDetails] = useState({
        purchasedate: '',
        repairdate: '',
        repairtime: '',
        imeinumber: '',
        make: 'Apple',
        modelnumber: '',
        faultcategory: 'Battery',
        faultdescription: ''
    });
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
            //Out of warranty: untick the box and tell the parent
            document.getElementById('warrantyCheck').checked = false;
            passDataToParent(false);
        } else {
            document.getElementById('warrantyCheck').disabled = false;
        }
        
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRepairDetails( prev => ({...prev, ...{[name]: value} }));
    }
    useEffect(() => {
        //Call back function to send repair details to parent component
        if (typeof sendRepairDetails === 'function') {
            sendRepairDetails(RepairDetails);
        }
    }, [RepairDetails]);




    return(<>
        {/*Purchase date*/}
        <h2>Repair Details</h2>
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Purchase Date *</label>
            <input className="col-12 col-md-12 col-lg-7" type="date" id="purchaseDate" name="purchasedate"
                max={/**/
                    new Date(Date.now()).toISOString().split("T")[0]
                }
                onChange={(event) => { handleWarrantyChange(event); handleChange(event); }}
            required/>
        </div>
        {/*Repair date*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Repair Date *</label>
            <input className="col-12 col-md-12 col-lg-7" type="date" id="repairDate" name="repairdate"
                min={/**/
                    new Date(Date.now()).toISOString().split("T")[0]}
                onChange={handleChange}
            required/>
        </div>
        
        {/*Repair time*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Repair Time *</label>
            <input className="col-12 col-md-12 col-lg-7" type="time" id="repairTime" name="repairtime"
                onChange={handleChange}
            required/>
        </div>

        {/*Under Warranty*/}
        <div className="row">
            <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                <legend className="col-11 float-none w-auto">Under Warranty</legend>
                <div>
                    <label className="col-12 col-md-12 col-lg-4">Warranty</label>
                    <input type="checkbox" id="warrantyCheck" disabled={true} 
                        onChange={(event) => passDataToParent(event.target.checked) }/>
                        {/*passDataToParent(event.target.checked).
                        This is shared warranty need to pass upto parent Component "Home" */}
                </div>
            </fieldset>
        </div>
        {/*IMEI details*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">IMEI-Number*</label>
            <input className="col-12 col-md-12 col-lg-7" type="text" id="IMEINumber" name="imeinumber" required 
            pattern="\d{15}" title="IMEI must be exactly 15 digits"
            maxLength={15}
            minLength={15}
            onChange={handleChange}/>
        </div>
        {/*Make*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Make *</label>
            <select className="col-12 col-md-12 col-lg-7" id="Make" name="make" defaultValue="Apple" onChange={handleChange} required>
                <option value="Apple">Apple</option>
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
            <input className="col-12 col-md-12 col-lg-7" type="text" id="modelNumber" name="modelnumber" onChange={handleChange} required />
        </div>
        {/*Fault Category*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Fault Category *</label>
            <select className="col-12 col-md-12 col-lg-7" id="faultCategory" name="faultcategory" defaultValue="Battery" onChange={handleChange} required>
                <option value="Battery">Battery</option>
                <option value="Charging">Charging</option>
                <option value="Screen">Screen</option>
                <option value="SD-storage">SD-storage</option>
                <option value="Software">Software</option>
                <option value="Other">Other</option>    
            </select>
        </div>

        {/*Fault Description*/}
        <div className="row mt-1">
            <label className="col-12 col-md-12 col-lg-4">Fault Description *</label>
            <textarea className="col-12 col-md-12 col-lg-7" id="faultDescription" name="faultdescription" onChange={handleChange} required />
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormRepairDetail;
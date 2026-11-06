//Import all Dependinceys from other components 
import { useState } from 'react';

//Function Component
function FormCourtesyPhone({ passDataToParent, sendCourtesyDetails }) {
    //"passDataToParent" is a callback function: function passDataToParent(value)
    //The callback function is to change a piece of the state that is a part of the parent component.
    //Asume there is a list of courtsy items below

    //Assume there is a list of courtesy items as below 

    let courtesyList = [
    {id: 0, type: 'none', name: 'none', bond: 0},
    {id: 1, type: 'phone', name: 'iphone 10', bond: 275}, 
    {id: 2, type: 'phone', name: 'iphone 14', bond: 300}, 
    {id: 3, type: 'phone', name: 'iphone 16', bond: 500}, 
    {id: 4, type: 'phone', name: 'samsung galaxy', bond: 200}, 
    {id: 5, type: 'phone', name: 'nokia', bond: 150}, 
    {id: 6, type: 'phone', name: 'xiaomi', bond: 100},
    {id: 7, type: 'charger', name: 'iphone charger', bond: 45}, 
    {id: 8, type: 'charger', name: 'samsung charger', bond: 30}, 
    {id: 9, type: 'charger', name: 'nokia charger', bond: 25}, 
    {id: 10, type: 'charger', name: 'xiaomi', bond: 25} ];
    //Declearing "STATE"
    const [ChargerBorrow, setChargerBorrow] = useState(0);// 0 = 'none'
    const [phoneBorrow, setPhoneBorrow] = useState(0);// 0 = 'none'
    
    //Handle the "on change"
    let addPhone = (selectedOption) => {
        selectedOption == 'none' ? setPhoneBorrow(0) : setPhoneBorrow(Number(selectedOption));
        //Update totalBond
        let updateId = 0;
        selectedOption == 'none' ? (updateId = 0) : (updateId = Number(selectedOption))
        let updateBond = courtesyList.filter(item => {return item.id == updateId})[0].bond
            
        + courtesyList.filter(item => {return item.id == ChargerBorrow})[0].bond;
        //Send data upto Parent by calling callback function "passDataToParent"
        passDataToParent(updateBond);//Child1 (FormCourtesyPhone)
        //Also send the chosen phone and charger so Home can save them
        if (typeof sendCourtesyDetails === 'function') {
            sendCourtesyDetails({
                phoneid: updateId,
                phonebond: courtesyList[updateId].bond,
                chargerid: ChargerBorrow,
                chargerbond: courtesyList[ChargerBorrow].bond,
                bond: updateBond
            });
        }
    }
    let addCharger = (selectedOption) => {
        selectedOption == 'none' ? setChargerBorrow(0) : setChargerBorrow(Number(selectedOption));
        //Update totalBond
        let updateId = 0;
        selectedOption == 'none' ? (updateId = 0) : (updateId = Number(selectedOption))
        let updateBond = courtesyList.filter(item => {return item.id == phoneBorrow})[0].bond
            + courtesyList.filter(item => {return item.id == updateId})[0].bond;
        //Send data upto Parent by calling callback function "passDataToParent"
        passDataToParent(updateBond);//Child1 (FormCourtesyPhone)
        //Also send the chosen phone and charger so Home can save them
        if (typeof sendCourtesyDetails === 'function') {
            sendCourtesyDetails({
                phoneid: phoneBorrow,
                phonebond: courtesyList[phoneBorrow].bond,
                chargerid: updateId,
                chargerbond: courtesyList[updateId].bond,
                bond: updateBond
            });
        }
    }
    //-----------------------------------------------------------------//
    //Component UI: HTML Rendering
    //-----------------------------//Phone section//-----------------------------//
    return(<>
        <h2>Courtesy Phone</h2>
        {/*Phone item types*/}
        <h4 className='ms-4 mt-2'>Choose a phone</h4>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Item Type </label>
            <select className="col-12 col-md-12 col-lg-7" defaultValue="none"
                    onChange = {(selected) => addPhone(selected.target.value)}>
                <option value="none">None</option>
                <option value="1">iPhone</option>
                <option value="2">Samsung Galaxy</option>
                <option value="3">Nokia</option>
            </select>
        </div>

        {/*Charger item types*/}
        <h4 className='ms-4 mt-2'>Choose a charger</h4>
        <div className="row mt-2 ms-3">
            <label className="col-12 col-md-12 col-lg-4">Item Type </label>
            <select className="col-12 col-md-12 col-lg-7" defaultValue="none"
                    onChange = {(selected) => addCharger(selected.target.value)}>
                <option value="none">None</option>
                <option value="4">iPhone Charger</option>   
                <option value="5">Samgsung Charger</option>
                <option value="6">Nokia Charger</option>
            </select>
        </div>
        {/*Table of items*/}
        {/*Table of added Courtesy items*/}
        <h4 className='ms-4 mt-2'>Borrow items</h4>
        <div className="row mt-2 ms-3 me-3 bg-white">
            <table className="table table-bordered" >
                <tbody>
                <tr> 
                    <td>Item</td>
                    <td>Cost</td>   
                </tr>

                {/*Display all items in state in the table*/}
                {/*Phone borrow table*/}
                
                {phoneBorrow == 0? (null) : (
                    <tr>
                        <td>{courtesyList.filter(item => {return item.id == phoneBorrow})[0].name}</td>
                        <td>{courtesyList.filter(item => {return item.id == phoneBorrow})[0].bond}</td>
                    </tr>
                )
                }
                {/*Charger borrow*/}

                {ChargerBorrow == 0? (null) : (
                    <tr>
                        <td>{courtesyList.filter(item => {return item.id == ChargerBorrow})[0].name}</td>
                        <td>{courtesyList.filter(item => {return item.id == ChargerBorrow})[0].bond}</td>
                    </tr>
                )
                }
                </tbody>
            </table>
        </div>
    </>);
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default FormCourtesyPhone;
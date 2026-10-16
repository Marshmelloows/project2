//-----------------------------Import all dependencies, from other Components-----------------------------//
import FormCustomerDetail from './Home/FormCustomerDetail';

import FormRepairDetail from './Home/FormRepairDetail';

import FormCourtesyPhone from './Home/FormCourtesyPhone';

import FormCost from './Home/FormCost';

import FormButtons from './Home/FormButtons';
import { useNavigate } from "react-router-dom"; 
import { useState } from 'react';

//-----------------------------Component fuction-----------------------------//
function Home() {
    //States
    //Parent Component "Home"
    //Child1: FormCourtesyPhone pass data to Child2(FormCost)
    const updateSharedState = (value) => setSharedBond(value);//Child1(FormCourtesyPhone) pass data to Child2
    const [sharedBond, setSharedBond] = useState(0);//Child2(FormCost) receive data from Child1
    
    //Child1: formRepairDetail pass data to Child2: formCost
    const updateWarranty = (value) => {setSharedWarranty(value);};//Child1 pass data to Child2
    const [sharedWarranty, setSharedWarranty] = useState(false);//Child2 receive data from Child1

    //Child1: formCustomerDetail pass data to Child2 formCost
    const updateCustomerType = (value) => setSharedCustomerType(value);//Child1 pass data to Child2
    const [sharedCustomerType, setSharedCustomerType] = useState(0);//Child2 receive data from Child1

    //----
    //Pass customer details from "FormCustomerDetail" to "Home" component
    const [customerDetails, setCustomerDetails] = useState({title: "Mr", firstName: "", lastName: "",});

    const navigate = useNavigate();
    const onSubmit = async(event) => {
        event.preventDefault();//prevent browser from sending data to server
        try {
            //Build the "attached data"
            const attachedData ={sharedBond,
                                  sharedCustomerType,
                                  customerDetails,
                                };
            //open the "Bookings" component
            
            //embed this attachment data with the
            navigate("/bookings");
        }
        //alert('Form was submitted!');
        catch(e) {
            alert('ERROR!!!');
        }
    } 
//-----------------------------//DATA//-----------------------------//

//-----------------------------//FUNCTIONS AND METHODS//-----------------------------//

//-----------------------------UI RENDER For home.js-----------------------------//

    return(
        <>
                <form className="row" style={{minHeight: '60vh'}} onSubmit={onSubmit}>
                    {/* customer detail*/}
                    <div className="col-12 col-lg-4 p-4 m-0" style={{minHeight: '30vh', backgroundColor: '#FCF3CF'}}>
                        <FormCustomerDetail  passDataToParent={updateCustomerType}
                                                sendCustomerDetails={(value) => setCustomerDetails(value)} />

                    </div>

                    {/* Repair detail*/}
                    <div className="col-12 col-lg-4 p-4 m-0" style={{minHeight: '30vh', backgroundColor: '#fccfcf'}}>
                        <FormRepairDetail  passDataToParent={updateWarranty}/>
                    </div>

                    {/*phone and cost*/}
                    <div className="col-12 col-lg-4 p-0 m-0">
                        {/*curticy phone */}
                        <div className="p-4" style={{minHeight: '30vh', backgroundColor: '#e05118'}}>
                            <FormCourtesyPhone passDataToParent={updateSharedState} /> {/*Child1*/}  
                        </div>
                        {/*curticy Cost */}
                        <div className="p-4" style={{minHeight: '29vh', backgroundColor: '#df8612'}}>
                            <FormCost sharedPropBond={sharedBond}   sharedPropWarranty={sharedWarranty} /> {/*Child2*/}
                        </div>
                    </div>
                    {/*Buttion area*/}
                    <div className="p-4 text-center" style={{minHeight: '10vh', backgroundColor: '#df8612'}}><FormButtons />
                    </div>
                </form>
            
        </>
    );
}   

//EXPORT
export default Home;
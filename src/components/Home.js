//-----------------------------Import all dependencies, from other Components-----------------------------//
import FormCustomerDetail from './Home/FormCustomerDetail';

import FormRepairDetail from './Home/FormRepairDetail';

import FormCourtesyPhone from './Home/FormCourtesyPhone';

import FormCost from './Home/FormCost';

import FormButtons from './Home/FormButtons';
import { useNavigate } from "react-router-dom"; 
import { useState } from 'react';
import { supabase } from './supabaseClient.js'; 
//-----------------------------Component function-----------------------------//
function Home() {
    //States
    //Parent Component "Home"
    //Child1: FormCourtesyPhone pass data to Child2(FormCost)
    const updateSharedState = (value) => setSharedBond(value);//Child1(FormCourtesyPhone) pass data to Child2
    const [sharedBond, setSharedBond] = useState(0);//Child2(FormCost) receive data from Child1

    //Child1: FormCourtesyPhone also passes the chosen phone and charger up to Home so they can be saved
    const [courtesyDetails, setCourtesyDetails] = useState({phoneid: 0, phonebond: 0, chargerid: 0, chargerbond: 0, bond: 0});
    
    //Child1: formRepairDetail pass data to Child2: formCost
    const updateWarranty = (value) => {setSharedWarranty(value);};//Child1 pass data to Child2
    const [sharedWarranty, setSharedWarranty] = useState(false);//Child2 receive data from Child1

    //Child1: formCustomerDetail pass data to Child2 formCost
    const updateCustomerType = (value) => setSharedCustomerType(value);//Child1 pass data to Child2
    const [sharedCustomerType, setSharedCustomerType] = useState(true);//Child2 receive data from Child1 (true = customer, which is the default radio button)

    const updateRepairDetails = (value) => setSharedRepairDetails(value);//Child1 pass data to Child2
    const [sharedRepairDetails, setSharedRepairDetails] = useState({});//Child2 receive data from Child1

    //Child1: formCustomerDetail pass data to Child2 formCost
    const [costDetails, setCostDetails] = useState({serviceFee: 85, totalCost: 0, GST: 0, totalCostWithGST: 0});
    
    //----
    //Pass customer details from "FormCustomerDetail" to "Home" component
    const [customerDetails, setCustomerDetails] = useState({title: "Mr", firstname: "", lastname: "",});

    const navigate = useNavigate();
    const onSubmit = async(event) => {
        event.preventDefault();//prevent browser from sending data to server
        try {
            //1: Build bookingData object
            const bookingdata = {
                
                //Customer details (from FormCustomerDetail)
                customertype: sharedCustomerType ? "customer" : "business",
                title: customerDetails.title,
                firstname: customerDetails.firstname,
                lastname: customerDetails.lastname,
                street: customerDetails.street,
                suburb: customerDetails.suburb,
                city: customerDetails.city,
                postcode: customerDetails.postcode,
                phone: customerDetails.phone,
                email: customerDetails.email,

                //Repair details (from FormRepairDetail)
                purchasedate: sharedRepairDetails.purchasedate,
                repairdate: sharedRepairDetails.repairdate,
                repairtime: sharedRepairDetails.repairtime,
                warrantycheck: sharedWarranty,
                imeinumber: sharedRepairDetails.imeinumber,
                make: sharedRepairDetails.make,
                modelnumber: sharedRepairDetails.modelnumber,
                faultcategory: sharedRepairDetails.faultcategory,
                faultdescription: sharedRepairDetails.faultdescription,

                //Courtesy items (from FormCourtesyPhone)
                phoneborrow: courtesyDetails.phoneid,
                phonebond: courtesyDetails.phonebond,
                chargerborrow: courtesyDetails.chargerid,
                chargerbond: courtesyDetails.chargerbond,
                bond: courtesyDetails.bond,

                //Costs (from FormCost)
                service: costDetails.serviceFee,
                gst: costDetails.GST,
                total: costDetails.totalCost,
                totalcostgst: costDetails.totalCostWithGST,

            };
            //
            console.log('bookingData:', bookingdata); // Log the bookingData object to the console

            //2: Insert booking into Supabase
            // Insert data into Supabase
            const { data, error } = await supabase.from('bookings').insert([bookingdata]);
            // Handle error
            if (error) throw error;
            // Log success and refresh bookings
            console.log('Booking added:', data);
            // Clear form
            event.target.reset();

            //3: Notification to user
            alert('Thanks for your submission!');
            
            //4 Navigate to bookings page
            //embed this attachment data with the
            navigate("/bookings");
        }
        //alert('Form was submitted!');
        catch(e) {
            console.error('Error adding booking:', e);
            alert('ERROR: ' + e.message);
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
                        <FormRepairDetail  passDataToParent={updateWarranty}
                        sendRepairDetails={updateRepairDetails} />
                    </div>

                    {/*phone and cost*/}
                    <div className="col-12 col-lg-4 p-0 m-0">
                        {/*courtesy phone */}
                        <div className="p-4" style={{minHeight: '30vh', backgroundColor: '#e05118'}}>
                            <FormCourtesyPhone passDataToParent={updateSharedState} sendCourtesyDetails={setCourtesyDetails} /> {/*Child1*/}  
                        </div>
                        {/*courtesy Cost */}
                        <div className="p-4" style={{minHeight: '29vh', backgroundColor: '#df8612'}}>
                            <FormCost sharedPropBond={sharedBond}   sharedPropWarranty={sharedWarranty} sendCostDetails={setCostDetails} /> {/*Child2*/}
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
//-----------------------------Import function-----------------------------//
import { Link , useLocation} from "react-router-dom";
import { useEffect } from "react";
//-----------------------------Component fuction-----------------------------//

 

function Header() {
//-----------------------------States-----------------------------//
//-----------------------------DATA-----------------------------//
//-----------------------------syles-----------------------------//

    const buttonStyle1 = {
        backgroundColor: '#22c014'
    };
    const buttonStyle2 = {
        backgroundColor: '#181f17'
    };
    const headerStyle = { 
        minHeight: '15vh',
        backgroundColor: '#2C3E50'
    };
    const taglineStyle = {
        minHeight: '15vh',
        fontSize: '2em'
    };
//-----------------------------Titles for my pages-----------------------------//
    const Pagecontent = {
        '/': {
            pagetitle: 'Home',  
            title: 'Homepage'
        },
        '/advancedJS':{
            pagetitle: 'AdvancedJS',
            title: 'AdvancedJS'
        },
        '/faq':{
            pagetitle: 'FAQ',
            title: 'FAQ'
        },
        '/Bookings':{
            pagetitle: 'Bookings',
            title: 'Bookings'
        }
        
    };
//-----------------------------FUNCTIONS AND METHODS-----------------------------//
    const location = useLocation();
    const currentpage = Pagecontent[location.pathname] || {
        pagetitle: 'Phone Fix Booking System'
    };
//-----------------------------checking we are on the right page-----------------------------//
    useEffect (() =>{
        document.title = currentpage.title;
        }, [currentpage.title]);
    //UI RENDER
    return(
        <>
            <header className="row" style={headerStyle} >
                <div className="col-12 col-lg-8 text-center text-white
                d-flex justify-content-center align-items-center"
                style={taglineStyle}>{currentpage.pagetitle}
                </div>

                <div className="col-12 col-md-12 col-lg-4">
                    <div class="row">
                    {/*-----------------------------Button 1-----------------------------*/}
                    <Link to="/" class="col-12 col-md-6 col-lg-6 p-0 m-0 border border-dark text-center
                    text-white" style={buttonStyle1}>HOME</Link>
                    {/*-----------------------------Button 2-----------------------------*/}
                    <Link to="/advancedJS" class="col-12 col-md-6 col-lg-6 p-0 m-0 border border-dark
                    text-center text-white" style={buttonStyle2}>EXTENSION</Link>
                    </div>
                </div>
            </header>
        </>
    );
}

//-----------------------------EXPORT-----------------------------//
export default Header;
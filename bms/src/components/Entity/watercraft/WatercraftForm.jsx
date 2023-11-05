import './WatercraftForm.scss';

const initialWatercraft = 
{
    Img_URL: 'https://idea7.co.uk/wp-content/uploads/2021/02/placeholder-250x250-1.png',
    Registration_Number: null,
    Model_Name: null,
    Type: null,
    Status: null
};

function WatercraftForm(options) {
    // Initialisation ------------------------------
    const conformance ={
        html2js:{
            Img_URL: (value) => (value=== ''? null: value),
            Registration_Number: (value) => (value=== ''? null: parseInt(value)),
            Model_Name: (value) => (value=== ''? null: value),
            Type: (value) => (value=== ''? null: value),
            Status: (value) => value

        },

        js2html:{
            Img_URL: (value) => (value=== null? '': value),
            Registration_Number: (value) => (value=== null? '': value),
            Model_Name: (value) => (value=== null? '': value),
            Type: (value) => (value=== null? '': value),
            Status: (value) => value
        },
    }
    
    //State ---------------------------------------
    //Handlers -------------------------------------
    //View -----------------------------------------


}
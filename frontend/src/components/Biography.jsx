import React from "react";


const Biography = (props) =>{
    return (
        <div className="container biography">
            <div className="banner">
                <img src={props.imageUrl} alt="AboutImg" />
            </div>
            <div className="banner">
                <p>
                    Biography
                </p>
                <h3>Who We Are</h3>
                <p>
                At our medical practice, we are dedicated to 
                providing compassionate and comprehensive 
                healthcare to our patients. With a team of 
                highly skilled and experienced healthcare 
                professionals, we strive to deliver personalized 
                treatment plans tailored to each individual's needs.
                 Our commitment to excellence drives us to stay at the 
                 forefront of medical advancements and technologies, ensuring that 
                 our patients receive the highest standard of care. We believe in
                  fostering a trusting and collaborative relationship with our patients, empowering them 
                  to take an active role in their healthcare journey. With a focus on integrity,
                   respect, and empathy, we aim to be your trusted partner in health, guiding you 
                   towards a healthier and happier life.
                </p>

            </div>
        </div>
    )
}

export default Biography;
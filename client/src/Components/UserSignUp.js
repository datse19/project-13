import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { Link, useNavigate } from 'react-router-dom';

export default function UserSignUp() {

    //Declaring state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState( [] );

    const context = useContext(Context);
    const history = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        context.actions.createUser({firstName, lastName, emailAddress, password})
            .then(errors => {
                if (errors.length) {
                    setErrors(errors)
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            history('/');
                        });
                }
            })
            .catch((err) => {
                console.log(err); 
                history('/error');
            });
    }

    const errorHandler = errors.length ?  
        (<div className="validation--errors">
            <h3>Validation Errors</h3>
                <ul>{errors.map((error, i) => {return (<li key={i}>{error}</li>)})}</ul>
        </div>) : null


    return (
        <main>
            <div className="form--centered" >
                <h2>Sign Up</h2>
                {errorHandler}
                <form onSubmit= {handleSubmit} >
                    <label htmlFor="firstName"> First Name</label>
                    <input onChange= {(e) => setFirstName(e.target.value)} id="firstName" name="firstName" type="text" value={firstName} />

                    <label htmlFor= "lastName"> Last Name</label>
                    <input onChange={(e) => setLastName(e.target.value)} id="lastName" name="lastName" type="text" value={lastName} />

                    <label htmlFor= "emailAddress"> Email Address</label>
                    <input onChange={(e) => setEmailAddress(e.target.value)} id="emailAddress" name="emailAddress" type="email" value={emailAddress} />

                    <label htmlFor= "password"> Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" value={password} />

                    <button className= "button" type="submit" onClick={handleSubmit}> Sign Up</button>
                    <Link className='button button-secondary' to="/">Cancel</Link>
                </form>
                <p>Already have an account? Click here to <Link to='/signin'>Sign In</Link>!</p>
            </div>
        </main>
    );

}    


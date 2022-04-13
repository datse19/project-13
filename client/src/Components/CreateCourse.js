import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { useNavigate} from 'react-router-dom';

//Function creates a new course
export default function CreateCourse() {

    const context = useContext(Context);
    let history = useNavigate();

    //Creating state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState( [] );


    //Function creates new course in the API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors( [] );
        
        const authCred = btoa( `${context.authenticatedUser.emailAddress} : ${context.authenticatedPassword}`);
        const res = await fetch('http://localhost:5000/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${authCred}`, 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description, 
                estimatedTime: estimatedTime, 
                materialsNeeded: materialsNeeded, 
                userId: context.authenticatedUser.id}),
        })

        if (res.status === 201) {
            history('/');
          } else if (res.status === 401) {
            history('/forbidden')
          } else if (res.status === 400) {
            res.json()
              .then(data => {
                setErrors(data.errors)
              });
          } else {
            throw new Error();
          }
    }

    //Directs the Home page when cancel is clicked 
    const handleCancel = (e) => {
        e.preventDefault();
        history('/');
    }

    const errorHandler = errors.length ?
    ( <div className="validation--errors" >
        <h3> Validation Errors </h3>
            <ul> {errors.map( (error, i) => {return (<li key={i} > { error } </li>)})} </ul>
    </div>) : null


    //Conditional check if there are any errors. If error, then throw error message
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
               {errorHandler}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                            <p>By {context?.authenticatedUser ? `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` : ''}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" onClick={handleSubmit}>Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}  
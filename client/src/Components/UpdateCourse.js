import { useState, useContext, useEffect } from 'react';
import { appContext } from '../Context';
import { useHistory } from 'react-router-dom';
import ValidationError from './ValidationError';

const UpdateCourse = (props) => {
    let identifier = props.match.params.id;
    const { actions } = useContext(appContext);

    const [title, setTitle] = useState ('');
    const [desc, setDesc] = useState ('');
    const [time, setTime] = useState ('');
    const [materials, setMaterials] = useState('');
    const [errors, setErrors] = useState('');
    const [id, setId] = useState('');
    const [course, setCourse] = useState('');

    const history = useHistory();
    const routeChange = () => {
        history.push(`/courses/${id}`);
    }

    //Hook redners the selected course
    useEffect( () => {
        const getCourse = async () => {
            await actions.getCourse(identifier)
            .then (response => {
                if (response.status === 200) {
                    response.json()
                    .then(data => {
                        setCourse(data.course)
                        return data.course;
                    })
                    .then( (course) => {
                        setTitle(course.title);
                        setDesc(course.description);
                        setTime(course.estimatedTime);
                        setMaterials(course.materialsNeeded);
                        setId(course.id);
                        return course;
                    })
                } else {
                    history.push('/error')
                }
            })
        }
        getCourse();
    }, [actions, history, identifier] );

    //Function updates the state of the element when user inputs text
    const onChange = (e) => {
        e.preventDefault();
        if(e.target.name === 'courseTitle') {
            setTitle(e.target.value);
        } else if (e.target.name === 'courseDescription') {
            setDesc(e.target.value);
        } else if (e.target.name === 'estimatedTime') {
            setTime(e.target.value);
        } else if (e.target.name === 'materialsNeeded') {
            setMaterials(e.target.value);
        }
    }

    //Function creates an object that holds the new data created by the user
    const handleSubmit = async(e) => {
        e.preventDefault();
        let body = {
            title: title,
            description: desc,
            estimatedTime: time,
            materialsNeeded: materials
        };

        //Variable updates the course after submission and redirects users to the detail's course screen. If bad request, an error page will be thrown.
        const response = actions.updateCourse(identifier, body, actions.authUser.emailAddress, actions.authUser.password)
            .then(response => {
                if (response.status === 204) {
                    setTimeout( () => {
                        history.push(`/courses/${identifier}`)
                    }, 500)
                } else if (response.status === 400) {
                    response.json().then(response => {
                        setErrors([response]);
                        console.log(course);
                    })
                }
            })
            console.log(response);
    }

    //Conditional checks if there are any errors. If error, then throw error message from the API backend

    return (
        <main>
        <div className='wrap'>
            <h2> Update Course</h2>
                {
                    (errors.length !== 0)
                    ? errors.localeCompare( (error, index) => <ValidationError key={index} data{errors} />)
                    : null
                }
            <form onSubmit= {handleSubmit}>
                <div className='main--flex' >
                    <div>
                        <label htmlFor='courseTitle' >Course Title</label>
                        <input onChange={onChange} id='courseTitle' name='courseTitle' type='text' value={title} />
                        <p>By {actions.authUser.firstName} {actions.authUser.lastName} </p>

                        <label htmlFor='courseDescription' > Course Description</label>
                        <textarea onChange={onChange} id='courseDescription' name='courseDescription' type='text' value={desc} > </textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime" > Estimated Time </label>
                        <input onChange={onChange} id='estimatedTime' name='estimatedTime' type='text' value={time} />

                        <label htmlFor='materialsNeeded' >Materials Needed</label>
                        <textarea onChange={onChange} id='materialsNeeded' name='materialsNeeded' type='text' value={materials} ></textarea>
                        
                    </div>
                </div>
                <button className='button' type='submit' >Update Course</button>
                <button onClick={routeChange} className='button button-secondary' >Cancel</button>
            </form>
        </div>
        </main>
    );
}


export default UpdateCourse;
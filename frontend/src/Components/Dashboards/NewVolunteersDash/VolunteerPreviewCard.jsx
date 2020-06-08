/*
ANIME BENSALEM, BRIAHANA MAUGÉ, JOSEPH P. PASAOA
VolunteerPreviewCard Component | Capstone App (Pursuit Volunteer Mgr)
*/


/* IMPORTS */
import React from 'react';


export default function VolunteerPreviewCard(props) {
    const { volunteer } = props;
    let emailRef = '';

    const handleEmailClick = (e) => {
        e.preventDefault();
        emailRef.click();
        return false;
    }

    return ( 
        <>
            <div className='g1NewVolCard row ml-lg-2'>
                <div className='g1NewVolBtns col-6 offset-6 offset-lg-0 col-lg-3 mb-3 mb-lg-0'>
                    <button className='btn btn-success mb-lg-1' onClick={e => props.acceptVolunteer(volunteer.v_id)}>Accept</button>
                    <button className='btn btn-primary ml-2 ml-lg-0 mb-lg-1' onClick={handleEmailClick}>E-mail</button>
                    <button className='btn btn-danger ml-2 mx-lg-0' onClick={e => e.preventDefault()}>Dismiss</button>
                </div>

                <div className='g1NewVolData col-12 col-lg-9'> 
                        <img 
                            className='g1Avatar ml-3 ml-md-0 mr-md-3 mb-3' 
                            src={volunteer.v_picture || '/images/default_pic.png'} alt={`${volunteer.v_first_name} ${volunteer.v_last_name}`}
                            data-toggle='modal' data-target={`.volunteer_${volunteer.v_id + volunteer.v_first_name}`} 
                        />
                    
                    <div className='g1NVFaceDate'>
                        <a
                            className='g1NVFaceDate__EmailLink'
                            href={`mailto:${volunteer.v_email}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            ref={input => { // this ref is used to target this link when the handleEmailClick function is called
                                emailRef = input;
                            }}
                        >
                            {volunteer.v_email}
                        </a>
                        <div className='g1NVName'>{`${volunteer.v_first_name} ${volunteer.v_last_name}`}</div>
                        <span className='d-block'>{volunteer.company}</span>
                        <span className='d-block'>{volunteer.title}</span>
                        <ul className='g1NewVolSkills'>
                            { volunteer.skills.map(skill => <li key={skill}>{skill}</li>) }
                        </ul>
                    </div>
                </div>

            </div>

            <div className={`modal fade volunteer_${volunteer.v_id + volunteer.v_first_name}`} tabIndex='-1' role='dialog'
                aria-labelledby='myLargeModalLabel' aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <img className='d-block mx-auto' 
                            src={volunteer.v_picture || '/images/default_pic.png'} 
                            alt={`${volunteer.v_first_name} ${volunteer.v_last_name}'s pic`} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
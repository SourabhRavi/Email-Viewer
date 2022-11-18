import React, { useEffect, useState } from 'react';

function MailBody(props) {

    useEffect(() => {
        getSingleMail(props.id);
    }, [props.id])

    const [mailBody, setMailBody] = useState('');

    let getSingleMail = (id) => {
        let url = `https://6366339879b0914b75cba9c2.mockapi.io/api/email/${id}`;
        fetch(url).then((response) => response.json()).then((data) => setMailBody(data));
    }

    return (
        <div className='mail-body'>
            <div className="main-wrap">
                <div className="avatar-wrap">
                    <div className="avatar">
                        <p>{props.name}</p>
                    </div>
                </div>
                <div className="text-wrap">
                    <div className="header-wrap">
                        <p className="heading" style={{ textTransform: 'capitalize' }} >{props.subject}</p>
                        <button className='favourite-btn' onClick={() => props.fav(props.id)} >Mark as favorite</button>
                    </div>
                    <div className="date-time-wrap">
                        <p className='date'>{props.date.getDay()}/{props.date.getMonth()}/{props.date.getFullYear()}</p>
                        <p>{props.date.getHours() > 12 ? props.date.getHours() - 12 : props.date.getHours()}:{props.date.getMinutes()}{props.date.getHours() > 12 ? 'pm' : 'am'}</p>
                    </div>
                    <div className='email-text' dangerouslySetInnerHTML={{ __html: mailBody.body }} />
                </div>
            </div>
        </div >
    )
}

export default MailBody;
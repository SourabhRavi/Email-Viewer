import React, { useEffect, useState } from 'react';
// import MailBody from './MailBody';

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
                        <button className='favourite-btn'>Mark as favorite</button>
                    </div>
                    <div className="date-time-wrap">
                        <p className='date'>{props.date.getDay()}/{props.date.getMonth()}/{props.date.getFullYear()}</p>
                        <p>{props.date.getHours() > 12 ? props.date.getHours() - 12 : props.date.getHours()}:{props.date.getMinutes()}{props.date.getHours() > 12 ? 'pm' : 'am'}</p>
                    </div>
                    <div className='email-text' dangerouslySetInnerHTML={{ __html: mailBody.body }} />
                </div>
            </div>
        </div>
    )
}

function FetchMails() {

    const [mailItem, setMailItem] = useState([]);
    const [openId, setOpenId] = useState(false);

    let getMails = () => {
        fetch('https://6366339879b0914b75cba9c2.mockapi.io/api/email/').then((response) => response.json()).then((data) => setMailItem(data.map((item) => ({ ...item, fav: false }))));
    }

    const date = new Date();

    useEffect(() => {
        getMails();
    }, [])

    return (
        <div className='App'>

            {/* Mail list left side */}
            <div className="mail-list" style={openId ? { flexBasis: '40%' } : {}}>
                {getMails && mailItem.map((mail) => {
                    return (
                        <div key={mail.id} onClick={() => { setOpenId(mail.id); }} className="mail-item">
                            <div className="avatar-wrap">
                                <div className="avatar">
                                    <p>{mail.from_name[0]}</p>
                                </div>
                            </div>
                            <div className="detail-wrap">
                                <p className="from">
                                    From:{" "}
                                    <span style={{ fontWeight: "500" }}>
                                        {mail.from_name}&nbsp; &lt;{mail.from_email}&gt;
                                    </span>
                                </p>

                                <p className="subject">
                                    Subject:{" "}
                                    <span style={{ fontWeight: "500" }}>{mail.subject}</span>
                                </p>

                                <p className="short-description">{mail.short_description}</p>

                                <div className="other-details" style={{ fontSize: '15px' }}>
                                    <p className="date" style={{ marginRight: "10px" }}>
                                        {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
                                    </p>
                                    <p className="time">{date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes()}{date.getHours() > 12 ? 'pm' : 'am'}</p>
                                </div>
                                {mail.fav && <p>Hello</p>}
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* Mail list left side end */}

            {openId ? <MailBody fav={false} date={date} subject={mailItem[openId - 1].subject} name={mailItem[openId - 1].from_name[0]} id={openId} /> : null}

        </div>
    )
}

export default FetchMails;

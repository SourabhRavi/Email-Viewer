import React, { useEffect, useState } from 'react';
import MailBody from './MailBody';

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

    function markAsFavorite(id) {
        setMailItem((prevData) =>
            prevData.map((item) => {
                if (item.id === id) {
                    return { ...item, fav: !item.fav };
                }
                return item;
            })
        );
    }

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
                                    {mail.fav ? <p style={{ marginLeft: '30px', color: '#E54065', fontWeight: '500' }}>Favorite</p> : null}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* Mail list left side end */}

            {openId ? <MailBody fav={markAsFavorite} date={date} subject={mailItem[openId - 1].subject} name={mailItem[openId - 1].from_name[0]} id={openId} /> : null}

        </div>
    )
}

export default FetchMails;

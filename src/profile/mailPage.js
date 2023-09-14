import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import classes from './editor.module.css';

const ComposeEmail = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState(EditorState.createEmpty());
    const [receivedEmails, setReceivedEmails] = useState([]);
    const [sentEmails, setSentEmails] = useState([]);


    const firebaseRealtimeDatabase = 'https://chatbox-76072-default-rtdb.firebaseio.com/';


    useEffect(() => {
        const loadRecievedEmails = async () => {
            try{
                const response = await fetch(`${firebaseRealtimeDatabase}/emails.json?orderBy="recipientEmail"&equalTo="${recipient}"`);
                if(response.ok){
                    const data = await response.json();
                    const receivedEmails = Object.values(data);
                    setReceivedEmails(receivedEmails);
                }else {
                    console.error('Failed to load received emails.');
                }
            }catch (error){
                console.error('Error loading received emails: ', error);
            }
        };
        const loadSentEmails = async () => {
            try {
                const response = await fetch(`${firebaseRealtimeDatabase}/emails.json?orderBy="senderEmail"&equalTo="${recipient}"`);
                if (response.ok) {
                    const data = await response.json();
                    const sentEmails = Object.values(data);
                    setSentEmails(sentEmails);
                } else {
                    console.error('Failed to load sent emails.');
                }
            } catch (error) {
                console.error('Error loading sent emails: ', error);
            }
        };
        if (recipient) {
            loadRecievedEmails();
            loadSentEmails();
        }
    },[recipient])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const messagePlainText = message.getCurrentContent().getPlainText();

        const emailData = {
            recipient,
            subject,
            message: messagePlainText,

        };


        try {
            const response = await fetch(`${firebaseRealtimeDatabase}/emails.json`, {
                method : "POST",
                headers : {
                    'Content-Type':'application/json',
                },
                body : JSON.stringify(emailData),
            });
            if(response.ok){
                alert('Email sent successfully');
            }else{
                alert('Failed to send email. Please try again.');
            }
        }catch(error){
            console.error('Error sending email: ', error);
            alert('An error occuered while sending the email. Please try again later.')
        }


        setRecipient('');
        setSubject('');
        setMessage(EditorState.createEmpty());
    };

    return (
        <div>
            <form  onSubmit={handleSubmit}>
            <h2>Welcome To ChatBox Client</h2>
                <div>
                    <label>To:</label>
                    <input
                        type="email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <Editor
                        editorState={message}
                        onEditorStateChange={(editorState) => setMessage(editorState)}
                        wrapperClassName={classes.editorwrapper}
                        editorClassName={classes.editorcontent}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Send</button>
                </div>
            </form>


            <h2>Received Emails</h2>
            <ul>
                {receivedEmails.map((email, index) => (
                    <li key={index}>
                        Subject: {email.subject}, Sender: {email.senderEmail}
                    </li>
                ))}
            </ul>

            <h2>Sent Emails</h2>
            <ul>
                {sentEmails.map((email, index) => (
                    <li key={index}>
                        Subject: {email.subject}, Recipient: {email.recipientEmail}
                    </li>
                ))}
            </ul>


        </div>
    );
};

export default ComposeEmail;

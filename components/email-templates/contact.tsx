import * as React from 'react';

interface ContactEmailTemplateProps {
  firstName?: string;
  email: string;
  phone?: string;
  message?: string;
}

export const ContactEmailTemplate: React.FC<
  Readonly<ContactEmailTemplateProps>
> = ({ firstName, email, phone, message }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      padding: '20px',
      lineHeight: '1.6',
      backgroundColor: '#f9f9f9',
    }}
  >
    <h2 style={{ color: '#0070f3' }}>📩 New Contact Us Message</h2>

    <p><strong>Name:</strong> {firstName}</p>
    <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
    <p><strong>Phone:</strong> <a href={`tel:${phone}`}>{phone}</a></p>

    <div style={{ marginTop: '20px' }}>
      <h4 style={{ marginBottom: '5px' }}>📝 Message:</h4>
      <p
        style={{
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          whiteSpace: 'pre-line',
        }}
      >
        {message}
      </p>
    </div>

    <p style={{ marginTop: '40px', fontSize: '12px', color: '#888' }}>
      This message was sent from your website contact form.
    </p>
  </div>
);

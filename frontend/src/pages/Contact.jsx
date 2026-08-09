import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend endpoint for this yet — just a UI confirmation for now
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h1>CONTACT</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        Have a question or feedback? Send us a message.
      </p>

      {sent && (
        <p style={{ border: '2px solid var(--border)', padding: '12px 16px', marginBottom: '20px' }}>
          Thanks — your message has been noted.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ ...styles.input, minHeight: '120px' }}
        />
        <button type="submit" className="btn btn-solid">Send Message</button>
      </form>
    </div>
  );
};

const styles = {
  input: {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '16px',
    border: '2px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text)',
    fontSize: '14px',
  },
};

export default Contact;
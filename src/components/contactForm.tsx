import { useState } from 'react';

export default function contactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
            }),
        });
        const data = await response.json();
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <div>
                <input
                    type="text"
                    placeholder='Navn'
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    placeholder='Din e-mail'
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <div className="text-center">
                <button className='btn' type="submit">Submit</button>
            </div>
        </form>
    );
}


import { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <>
      <Head>
        <title>Termux LLM - Uncensored AI Chat</title>
        <meta name="description" content="Lightweight uncensored LLM service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Termux LLM Chat</h1>
          <p className={styles.description}>
            Uncensored AI powered by lightweight models
          </p>

          <div className={styles.chatContainer}>
            <div className={styles.messages}>
              {messages.length === 0 && (
                <div className={styles.placeholder}>
                  Send a message to start chatting...
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.message} ${
                    msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                  }`}
                >
                  <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
                  <div className={styles.messageContent}>{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div className={styles.message}>
                  <div className={styles.loading}>Thinking...</div>
                </div>
              )}
            </div>

            {error && (
              <div className={styles.error}>
                Error: {error}
              </div>
            )}

            <form onSubmit={sendMessage} className={styles.inputForm}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={styles.input}
                disabled={loading}
              />
              <button
                type="submit"
                className={styles.button}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
              <button
                type="button"
                onClick={clearChat}
                className={`${styles.button} ${styles.secondaryButton}`}
                disabled={loading || messages.length === 0}
              >
                Clear
              </button>
            </form>
          </div>

          <div className={styles.footer}>
            <p>
              API Endpoint: <code>/api/chat</code> | Health: <code>/api/health</code>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

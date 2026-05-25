import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError(data.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Villa Hillcrest</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Sign in with username</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>Get Started</button>
          </form>
          <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          <div className={styles.divider}>or sign in with</div>
          <div className={styles.socialButtons}>
            <button className={styles.socialButton}>Google</button>
            <button className={styles.socialButton}>Apple</button>
          </div>
        </div>
      </div>
    </>
  );
}

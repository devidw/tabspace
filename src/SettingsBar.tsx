import React, { useEffect } from 'react';
import { Link } from 'wouter';
import './SettingsBar.css'

export function loadDefault() {
  const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  const currentTheme = localStorage.getItem('theme') || userPref;
  document.documentElement.setAttribute('saved-theme', currentTheme);
  return currentTheme;
}

interface ISettingsBar {
  theme: string,
  setTheme: (newTheme: string) => void,
}

function SettingsBar({ theme, setTheme }: ISettingsBar) {
  const setDocumentTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('saved-theme', theme);
  }

  const switchTheme = () => {
    setDocumentTheme(theme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    const updateClosure = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) return;
      if (event.key === 'theme' && event.newValue !== null) {
        setDocumentTheme(event.newValue);
      }
    };
    window.addEventListener('storage', updateClosure);
    return () => window.removeEventListener('storage', updateClosure);
  }, []);

  return (<div className='settings-bar'>
    <Link href="/index.html/help">
      <div className='settings-item helpbutton'>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
          <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z" />
        </svg>
      </div>
    </Link>
    <div className='settings-item darkmode'>
      <input className='toggle' id='darkmode-toggle' type='checkbox' tabIndex={-1} onChange={switchTheme} checked={theme === 'dark'} />
      <label id="toggle-label-light" htmlFor='darkmode-toggle' tabIndex={-1}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="dayIcon" x="0px" y="0px" viewBox="0 0 35 35" >
          <title>Light Mode</title>
          <path d="M6,17.5C6,16.672,5.328,16,4.5,16h-3C0.672,16,0,16.672,0,17.5    S0.672,19,1.5,19h3C5.328,19,6,18.328,6,17.5z M7.5,26c-0.414,0-0.789,0.168-1.061,0.439l-2,2C4.168,28.711,4,29.086,4,29.5    C4,30.328,4.671,31,5.5,31c0.414,0,0.789-0.168,1.06-0.44l2-2C8.832,28.289,9,27.914,9,27.5C9,26.672,8.329,26,7.5,26z M17.5,6    C18.329,6,19,5.328,19,4.5v-3C19,0.672,18.329,0,17.5,0S16,0.672,16,1.5v3C16,5.328,16.671,6,17.5,6z M27.5,9    c0.414,0,0.789-0.168,1.06-0.439l2-2C30.832,6.289,31,5.914,31,5.5C31,4.672,30.329,4,29.5,4c-0.414,0-0.789,0.168-1.061,0.44    l-2,2C26.168,6.711,26,7.086,26,7.5C26,8.328,26.671,9,27.5,9z M6.439,8.561C6.711,8.832,7.086,9,7.5,9C8.328,9,9,8.328,9,7.5    c0-0.414-0.168-0.789-0.439-1.061l-2-2C6.289,4.168,5.914,4,5.5,4C4.672,4,4,4.672,4,5.5c0,0.414,0.168,0.789,0.439,1.06    L6.439,8.561z M33.5,16h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3c0.828,0,1.5-0.672,1.5-1.5S34.328,16,33.5,16z     M28.561,26.439C28.289,26.168,27.914,26,27.5,26c-0.828,0-1.5,0.672-1.5,1.5c0,0.414,0.168,0.789,0.439,1.06l2,2    C28.711,30.832,29.086,31,29.5,31c0.828,0,1.5-0.672,1.5-1.5c0-0.414-0.168-0.789-0.439-1.061L28.561,26.439z M17.5,29    c-0.829,0-1.5,0.672-1.5,1.5v3c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3C19,29.672,18.329,29,17.5,29z M17.5,7    C11.71,7,7,11.71,7,17.5S11.71,28,17.5,28S28,23.29,28,17.5S23.29,7,17.5,7z M17.5,25c-4.136,0-7.5-3.364-7.5-7.5    c0-4.136,3.364-7.5,7.5-7.5c4.136,0,7.5,3.364,7.5,7.5C25,21.636,21.636,25,17.5,25z" />
        </svg>
      </label>
      <label id="toggle-label-dark" htmlFor='darkmode-toggle' tabIndex={-1}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="nightIcon" x="0px" y="0px" viewBox="0 0 100 100">
          <title>Dark Mode</title>
          <path d="M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z" />
        </svg>
      </label>
    </div>
  </div>)
}

export default SettingsBar;

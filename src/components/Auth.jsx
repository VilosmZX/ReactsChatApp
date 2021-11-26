import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';
const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});



    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://jsocialweb.herokuapp.com/auth';   

        const {data: {token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup){
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup); 
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? 'Daftar' : 'Masuk'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Nama Lengkap</label>
                                <input 
                                    name='fullName' type='text'
                                    placeholder='Nama Lengkap'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='username'>Username</label>
                                <input 
                                    name='username' type='text'
                                    placeholder='Username'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>Nomor Telpon</label>
                                <input 
                                    name='phoneNumber' type='text'
                                    placeholder='Nomor Telpon'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarURL'>Avatar URL</label>
                                <input 
                                    name='avatarURL' type='text'
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        
                        <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='password'>Password</label>
                                <input 
                                    name='password' type='password'
                                    placeholder='Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmPassword'>Konfirmasi Password</label>
                                <input 
                                    name='confirmPassword' type='password'
                                    placeholder='Konfirmasi Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className='auth__form-container_fields-content_button'>
                            <button>
                                {isSignup ? 'Daftar' : 'Masuk'}
                            </button>

                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup 
                            ? 'Sudah punya akun?' 
                            : 'Tidak punya akun?'
                            }
                            <span onClick={switchMode}>
                                {isSignup ? 'Masuk' : 'Daftar'}

                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={signinImage} alt='sign in' />
            </div>
        </div>
    )
}

export default Auth

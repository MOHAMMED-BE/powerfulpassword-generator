import React, { useState } from 'react'
import { generatePassword } from './PasswordGenerate';
import copy from 'clipboard-copy';
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import * as yup from "yup";
import { useFormik } from "formik";
import Swal from 'sweetalert2';

const Home = () => {

    const initalPassword = 'Powerfull Password Here';
    const [password, setPassword] = useState(initalPassword);
    const [passwordCopy, setPasswordCopy] = useState(true);
    const [lowerCaseChecked, setLowerCaseChecked] = useState(true);
    const [upperCaseChecked, setUpperCaseChecked] = useState(true);
    const [digitsChecked, setDigitsChecked] = useState(true);
    const [specialCharsChecked, setSpecialCharsChecked] = useState(true);
    const [checkedCount, setCheckedCount] = useState(4);

    const validationSchema = yup.object({
        passwordLength: yup.number()
            .typeError('Please enter a valid number')
            .min(1, 'Password length should be greater than 0')
            .max(100, 'Password length should be less than 100')
            .required('Password length is required')
            .test('no-leading-zero', 'Password length cannot start with 0',
                (value) => value.toString().charAt(0) !== '0'),
    });

    const formik = useFormik({
        initialValues: {
            passwordLength: 10,
        },
        validationSchema: validationSchema,
    });

    const {
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
    } = formik;

    const handleLowerCaseChange = (e) => {
        if (e.target.checked) {
            setCheckedCount((prevCount) => prevCount + 1);
        } else {
            setCheckedCount((prevCount) => prevCount - 1);
        }
    }

    const handleUpperCaseChange = (e) => {
        if (e.target.checked) {
            setCheckedCount((prevCount) => prevCount + 1);
        } else {
            setCheckedCount((prevCount) => prevCount - 1);
        }
    }

    const handleDigitsChange = (e) => {
        if (e.target.checked) {
            setCheckedCount((prevCount) => prevCount + 1);
        } else {
            setCheckedCount((prevCount) => prevCount - 1);
        }
    }

    const handleSpecialCharsChange = (e) => {
        if (e.target.checked) {
            setCheckedCount((prevCount) => prevCount + 1);
        } else {
            setCheckedCount((prevCount) => prevCount - 1);
        }
    }
    const lengthIncrement = (e) => {
        e.preventDefault();
        values.passwordLength = values.passwordLength + 1;
    }

    const lengthDecrement = (e) => {
        e.preventDefault();
        values.passwordLength = values.passwordLength - 1;
    }

    const hundleClick = (e) => {
        if (checkedCount === 0) {
            setPassword(initalPassword);
            setPasswordCopy(passwordCopy && !passwordCopy);
        }
        else {
            e.preventDefault();
            const generatedPassword = generatePassword(values.passwordLength, lowerCaseChecked, upperCaseChecked, digitsChecked, specialCharsChecked, checkedCount);
            setPassword(generatedPassword);
            setPasswordCopy(passwordCopy && !passwordCopy);
        }
    }

    const handleCopy = (e) => {
        e.preventDefault();

        let timerInterval
        Swal.fire({
            title: 'Password Copied',
            timer: 800,
            width: 400,
            height: 100,
            color: '#665191',
            customClass: {
                loader: 'loader',
                title: 'swal-title'
            },
            didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })

        copy(password);
        setPasswordCopy(true);
    };


    return (
        <>
            <div className="home-page">
                <div className="overlay">
                    <div className="container top-container d-flex justify-content-center pt-5">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row mt-2">
                                    <div className="col-md-2 col-12"></div>
                                    <div className="col-md-8 col-12">
                                        <h5
                                            className={`card-title ${password ? 'password-text' : ''} text-center p-2`}>
                                            {password}
                                            {password !== initalPassword && password ? !passwordCopy
                                                ?
                                                <button className='clipboard-btn' type='submit' onClick={handleCopy}><FaClipboard className='clipboard' /></button>
                                                : <button className='clipboard-btn'><FaClipboardCheck className='clipboard clipboardcheck' /></button> : ''}
                                        </h5>
                                    </div>
                                    <div className="col-md-2 col-12"></div>

                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="container">
                                        <div className="row mt-5 mb-4">
                                            <div className="col-md-2 col-0 col-lg-2"></div>
                                            <div className="col-md-2 col-3 col-lg-2">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"
                                                        role="switch"
                                                        id="lower"
                                                        checked={lowerCaseChecked}
                                                        onChange={(e) => {
                                                            setLowerCaseChecked(e.target.checked);
                                                            handleLowerCaseChange(e);
                                                        }} />
                                                    <label className="form-check-label" htmlFor="lower">abc</label>
                                                </div>
                                            </div>

                                            <div className="col-md-2 col-3 col-lg-2">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"
                                                        role="switch"
                                                        id="upper"
                                                        checked={upperCaseChecked}
                                                        onChange={(e) => {
                                                            setUpperCaseChecked(e.target.checked);
                                                            handleUpperCaseChange(e);
                                                        }} />
                                                    <label className="form-check-label" htmlFor="upper">ABC</label>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-3 col-lg-2">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"
                                                        role="switch"
                                                        id="digits"
                                                        checked={digitsChecked}
                                                        onChange={(e) => {
                                                            setDigitsChecked(e.target.checked);
                                                            handleDigitsChange(e);
                                                        }} />
                                                    <label className="form-check-label" htmlFor="digits">123</label>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-3 col-lg-2">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"
                                                        role="switch"
                                                        id="specialshars"
                                                        checked={specialCharsChecked}
                                                        onChange={(e) => {
                                                            setSpecialCharsChecked(e.target.checked);
                                                            handleSpecialCharsChange(e);
                                                        }} />
                                                    <label className="form-check-label" htmlFor="specialshars">@$#&</label>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-2 col-lg-2"></div>

                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="d-flex justify-content-end col-md-4 col-4 col-lg-4">
                                                <button type='submit' onClick={(e) => {
                                                    lengthDecrement(e);
                                                    handleSubmit();
                                                }}
                                                    className='btn rounded-5 length-btn'><AiOutlineMinus className='icon-plus' /></button>
                                            </div>
                                            <div className="col-md-4 col-4 col-lg-4">
                                                <input
                                                    type="text"
                                                    name="passwordLength"
                                                    className={
                                                        touched.passwordLength && errors.passwordLength
                                                            ? "form-control is-invalid"
                                                            : "form-control mb-2"
                                                    }
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.passwordLength}
                                                />

                                            </div>

                                            <div className="d-flex justify-content-start col-md-4 col-4 col-lg-4">
                                                <button type='submit' onClick={(e) => {
                                                    lengthIncrement(e);
                                                    handleSubmit();
                                                }}
                                                    className='btn rounded-5 length-btn'><AiOutlinePlus className='icon-plus' /></button>
                                            </div>

                                        </div>

                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-12 col-12 d-flex justify-content-center">
                                                {touched.passwordLength && errors.passwordLength ? (
                                                    <div className="invalid-feedback d-block text-center">{errors.passwordLength}</div>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="row mt-4 d-flex justify-content-center">
                                            <div className="col-md-4 col-4 col-lg-4"></div>
                                            <div className="col-md-4 col-4 col-lg-4 d-flex justify-content-center">
                                                <button className='btn px-5 py-2 generate-btn' onClick={hundleClick} type="submit">Generate</button>
                                            </div>
                                            <div className="col-md-4 col-4 col-lg-4"></div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer fixed-bottom">

                </div>
            </div>
        </>
    )
}

export default Home

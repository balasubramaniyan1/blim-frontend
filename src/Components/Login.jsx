
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [loginMessage, setLoginMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const emailError = !email.trim()
        ? 'Please enter your email address.'
        : !EMAIL_PATTERN.test(email.trim())
            ? 'Enter a valid email address.'
            : ''
    const passwordError = !password
        ? 'Please enter your password.'
        : password.length < MIN_PASSWORD_LENGTH
            ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
            : ''
    const isValid = !emailError && !passwordError

    function handleSubmit(event) {
        event.preventDefault()
        setSubmitted(true)

        if (!isValid) return

        setLoginMessage('')
        setIsLoading(true)
        const apiUrl = import.meta.env.VITE_API_URL || ''
        axios.post(`${apiUrl}/api/login`, {
            email: email.trim(),
            password,
        }, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                const result = response.data
                if (!result || typeof result.success !== 'boolean') {
                    setLoginMessage('The login server returned an unexpected response.')
                } else if (result.success) {
                    navigate('/DashBoard', { state: { email: result.user?.email || email.trim() } })
                } else {
                    setLoginMessage(result.message || 'Email or password is incorrect.')
                }
            })
            .catch((error) => {
                setLoginMessage(
                    error.response?.data?.message ||
                    'Could not connect to the login server. Please try again.',
                )
            })
            .finally(() => setIsLoading(false))
    }



    return (
        <section className="login-form-panel flex items-center justify-center">
            <div className="login-content w-full">
                <div className="mobile-brand flex items-center font-bold tracking-tight md:hidden">
                    <div className="brand-symbol grid place-items-center">b.</div>
                    <div>blimmet<strong className="mobile-brand-dot">.</strong></div>
                </div>
                <div className="form-kicker font-bold uppercase">
                    Your space is ready
                </div>
                <h2 className="form-heading font-semibold">
                    Welcome back.
                </h2>
                <p className="form-intro">
                    Pick up where your mind left off.
                </p>

                <form className="login-form" noValidate onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label block font-semibold" htmlFor="email">
                            Email address
                        </label>
                        <input
                            className="login-input w-full border outline-none transition aria-invalid:border-red-500"
                            autoComplete="email"
                            aria-describedby={submitted && emailError ? 'email-error' : undefined}
                            aria-invalid={submitted && Boolean(emailError)}
                            id="email"
                            name="email"
                            onChange={(event) => {
                                setEmail(event.target.value)
                                setLoginMessage('')
                            }}
                            placeholder="you@example.com"
                            type="email"
                            value={email}
                        />
                        {submitted && emailError && (
                            <span className="field-error block text-red-600" id="email-error" role="alert">
                                {emailError}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="password-label-row flex items-center justify-between">
                            <label className="form-label font-semibold" htmlFor="password">Password</label>
                            <span className="password-hint">8+ characters</span>
                        </div>
                        <div className="relative">
                            <input
                                className="login-input password-input w-full border outline-none transition aria-invalid:border-red-500"
                                autoComplete="current-password"
                                aria-describedby={submitted && passwordError ? 'password-error' : undefined}
                                aria-invalid={submitted && Boolean(passwordError)}
                                id="password"
                                name="password"
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                    setLoginMessage('')
                                }}
                                placeholder="Enter your password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                            />
                            <button
                                className="password-toggle absolute inset-y-0 font-semibold"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword((visible) => !visible)}
                                type="button"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {submitted && passwordError && (
                            <span className="field-error block text-red-600" id="password-error" role="alert">
                                {passwordError}
                            </span>
                        )}
                    </div>

                    <button
                        className="login-button flex w-full items-center justify-center font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? 'Checking…' : 'Step back in'}
                        {!isLoading && <span aria-hidden="true">↗</span>}
                    </button>
                    {loginMessage && (
                        <p className="form-status text-red-600" role="alert">
                            {loginMessage}
                        </p>
                    )}
                </form>

                <p className="form-footer text-center">
                    Made for the things you're becoming <span className="footer-sparkle" aria-hidden="true">✳</span>
                </p>
            </div>
        </section>
    )
}

export default Login
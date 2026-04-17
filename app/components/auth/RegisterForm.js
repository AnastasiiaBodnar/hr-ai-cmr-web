'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Input from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'
import { register } from '@/lib/auth'
import StatusCard from './StatusCard'

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [isRegistered, setIsRegistered] = useState(false)

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value || value.trim().split(/\s+/).length < 2)
          setFieldErrors(f => ({ ...f, name: 'Please enter your full name' }))
        break
      case 'email':
        if (!value.includes('@'))
          setFieldErrors(f => ({ ...f, email: 'Invalid email address' }))
        break
      case 'password': {
        const errs = []
        if (value.length < 8) errs.push('min 8 characters')
        if (!/[A-Z]/.test(value)) errs.push('uppercase letter')
        if (!/[0-9]/.test(value)) errs.push('number')
        if (!/[!@#$%^&*]/.test(value)) errs.push('special character (!@#$...)')
        if (errs.length > 0) setFieldErrors(f => ({ ...f, password: `Missing: ${errs.join(', ')}` }))
        break
      }
      case 'repeatPassword':
        if (value !== password)
          setFieldErrors(f => ({ ...f, repeatPassword: 'Passwords do not match' }))
        break
    }
  }

  const validate = () => {
    const errors = {}
    if (!name || name.trim().split(/\s+/).length < 2) errors.name = 'Please enter your full name'
    if (!email.includes('@')) errors.email = 'Invalid email address'

    const passwordErrors = []
    if (password.length < 8) passwordErrors.push('min 8 characters')
    if (!/[A-Z]/.test(password)) passwordErrors.push('uppercase letter')
    if (!/[0-9]/.test(password)) passwordErrors.push('number')
    if (!/[!@#$%^&*]/.test(password)) passwordErrors.push('special character (!@#$...)')
    if (passwordErrors.length > 0) errors.password = `Missing: ${passwordErrors.join(', ')}`

    if (password !== repeatPassword) errors.repeatPassword = 'Passwords do not match'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setLoading(true)
    try {
      await register(name, email, password)
      setIsRegistered(true)
    } catch (err) {
      setError(err.message)
      setFieldErrors({ name: true, email: true, password: true, repeatPassword: true })
    } finally {
      setLoading(false)
    }
  }

  if (isRegistered) {
    return (
      <StatusCard 
        type="success"
        title="Registration successful!"
        description={`We've sent a verification link to:\n${email}\n\nPlease check your email to continue.`}
        actions={[
          { label: 'Back to Log In', href: '/login', variant: 'outline-success' }
        ]}
      />
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-7 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-12 h-8 shrink-0">
          <Image src="/images/logo.png" alt="HR Logo" fill sizes="48px" className="object-contain" />
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium">
          <Link href="/login" className="text-gray-400 hover:text-gray-600 transition-colors">Sign In</Link>
          <span className="text-primary cursor-default">Create account</span>
        </div>
      </div>

      <form className="space-y-2 mb-2" onSubmit={handleSubmit}>
        <div>
          <Input type="text" placeholder="Full Name" value={name}
            onChange={e => { setName(e.target.value); setFieldErrors(f => ({ ...f, name: null })) }}
            onBlur={e => validateField('name', e.target.value)}
            error={!!fieldErrors.name} required />
          {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
        </div>

        <div>
          <Input type="email" placeholder="Email address" value={email}
            onChange={e => { setEmail(e.target.value); setFieldErrors(f => ({ ...f, email: null })) }}
            onBlur={e => validateField('email', e.target.value)}
            error={!!fieldErrors.email} required />
          {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
        </div>

        <div>
          <Input type="password" placeholder="Password" value={password}
            onChange={e => { setPassword(e.target.value); setFieldErrors(f => ({ ...f, password: null })) }}
            onBlur={e => validateField('password', e.target.value)}
            error={!!fieldErrors.password} required />
          {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
        </div>

        <div>
          <Input type="password" placeholder="Repeat password" value={repeatPassword}
            onChange={e => { setRepeatPassword(e.target.value); setFieldErrors(f => ({ ...f, repeatPassword: null })) }}
            onBlur={e => validateField('repeatPassword', e.target.value)}
            error={!!fieldErrors.repeatPassword} required />
          {fieldErrors.repeatPassword
            ? <p className="text-red-500 text-xs mt-1">{fieldErrors.repeatPassword}</p>
            : <p className="text-gray-400 text-xs mt-1">
              <span className="text-red-500 align-middle">*</span> Must be 8+ characters with uppercase, number & symbol
            </p>
          }
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="pt-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Sign up...' : 'Register'}
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center py-3">
        <hr className="w-3/4 border-gray-200" />
      </div>

      <div className="space-y-2">
        <Button type="button" variant="outline" onClick={() => alert('Feature in development.')}>
          Register with Google
          <Image src="/images/LogoGoogle.png" alt="Google" width={20} height={20} className="ml-1" />
        </Button>
        <Button type="button" variant="outline" onClick={() => alert('Feature in development.')}>
          Register with LinkedIn
          <Image src="/images/LogoLinkedIn.png" alt="LinkedIn" width={20} height={20} className="ml-1" />
        </Button>
      </div>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-700">
          Do you have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">Log In</Link>
        </span>
      </div>
    </div>
  )
}
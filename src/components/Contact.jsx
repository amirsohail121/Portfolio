import React, { useState } from 'react'
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'

const FORMSPREE_URL = 'https://formspree.io/f/meeygqdb'

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'sohail2456@gmail.com',
    href: 'mailto:sohail2456@gmail.com',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Amir Sohail',
    href: 'https://www.linkedin.com/in/amir-sohail-a5310b290/',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Raipur, Chhattisgarh, India',
    href: null,
  },
]

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono">
            Get In Touch
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mt-2"
            style={{ color: 'var(--text-heading)' }}
          >
            Contact <span className="text-yellow-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 rounded-full mt-3" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">

          {/* Left — Contact Info */}
          <div className="space-y-4">

            {/* Intro */}
            <div
              className="rounded-3xl border p-6"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                I'm currently open to internships,
                full-time opportunities, and freelance projects.

                Feel free to reach out—
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="rounded-2xl border px-5 py-4 flex items-center gap-4 transition-all duration-300 hover:border-yellow-500"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-sm font-medium hover:text-yellow-500 transition-colors duration-200"
                        style={{ color: 'var(--text-heading)' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}

          </div>

          {/* Right — Contact Form */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {/* Terminal Bar */}
            <div
              className="flex items-center gap-1.5 px-6 py-3 border-b"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
            >
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                contact.js
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">

              {/* Name */}
              <div>
                <label
                  className="block font-mono text-xs mb-2 uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all duration-300"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-heading)',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#eab308'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block font-mono text-xs mb-2 uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="youremail@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all duration-300"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-heading)',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#eab308'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block font-mono text-xs mb-2 uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all duration-300 resize-none"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-heading)',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#eab308'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm font-mono transition-all duration-300"
                style={{
                  background: status === 'sending' ? 'var(--border)' : '#eab308',
                  color: status === 'sending' ? 'var(--text-muted)' : '#000',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <div
                  className="rounded-xl border border-green-400/30 px-4 py-3 text-center"
                  style={{ background: 'rgba(74,222,128,0.05)' }}
                >
                  <p className="text-sm font-mono text-green-400">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div
                  className="rounded-xl border border-red-400/30 px-4 py-3 text-center"
                  style={{ background: 'rgba(248,113,113,0.05)' }}
                >
                  <p className="text-sm font-mono text-red-400">
                    ✗ Something went wrong. Please try again or email me directly.
                  </p>
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section >
  )
}

export default Contact
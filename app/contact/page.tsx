import Header from '../components/Header'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Summit Climate Systems',
  description: 'Contact Summit Climate Systems about HVAC service, installation, or to request a free estimate.',
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="relative bg-gradient-to-r from-primary-800 via-primary-900 to-primary-800 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Have questions about HVAC service, installation, or need a free estimate? We&#39;d love to hear from you.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">service@summitclimate.com</p>
                    <p className="text-gray-600">support@summitclimate.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">(555) 345-6718</p>
                    <p className="text-sm text-gray-500">Emergency Service: 24/7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Office</h3>
                    <p className="text-gray-600">850 Climate Control Road<br />Atlanta, GA 30301</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 7:00 AM - 6:00 PM<br />Sat: 8:00 AM - 2:00 PM<br />Emergency: 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Request a Quote</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea id="message" name="message" rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Tell us about your HVAC needs..." required />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white py-3 px-4 rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-bold">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 md:mt-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 md:p-8">
            <div className="text-center">
              <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-4">Need Emergency Service?</h2>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Our emergency HVAC team is available 24/7. Call us anytime for urgent heating or cooling issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-700 text-primary-700 rounded-full hover:bg-primary-700 hover:text-white transition-all duration-200 font-bold">
                  View Services
                </a>
                <a href="#" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-bold">
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

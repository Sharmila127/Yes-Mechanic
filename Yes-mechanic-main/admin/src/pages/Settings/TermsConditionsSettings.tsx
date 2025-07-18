import { FONTS } from "../../constants/uiConstants"
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const TermsConditionsSettings = () => {
  const navigate = useNavigate()

  const handleBackToDashboard = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header with Back Button */}
        <div className="flex items-center mb-10">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-3xl shadow-md text-[#9b111e] hover:text-white hover:bg-[#9b111e] transition-all duration-300 mr-6 group"
            aria-label="Back to Dashboard"
          >
            <FaArrowLeft className="text-lg group-hover:scale-110 transition-transform duration-200" />
          </button>
          <div>
            <h1 
              className="text-5xl font-bold text-[#9b111e] mb-2" 
              style={{ fontFamily: FONTS.header.fontFamily }}
            >
              Terms and Conditions
            </h1>
            <p 
              className="text-lg text-gray-600"
              style={{ fontFamily: FONTS.header.fontFamily }}
            >
              Car Service Platform Agreement
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
          
          {/* Service Agreement */}
          <div className="mb-10 pb-8 border-b border-gray-200">   
            <h2 className="pb-6 text-3xl font-bold text-[#9b111e] flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-[#9b111e] rounded-full mr-4"></span>
              Service Agreement
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-lg" style={{ fontFamily: FONTS.header.fontFamily }}>
                By using our premium car service platform, you agree to these comprehensive terms and conditions. Our professional automotive services include:
              </p>
              <ul className="mt-4 space-y-2 text-gray-700" style={{ fontFamily: FONTS.header.fontFamily }}>
                <li className="flex items-start"><span className="text-[#9b111e] mr-2">•</span>Complete vehicle maintenance and scheduled servicing</li>
                <li className="flex items-start"><span className="text-[#9b111e] mr-2">•</span>Advanced diagnostic testing and computer analysis</li>
                <li className="flex items-start"><span className="text-[#9b111e] mr-2">•</span>Engine, transmission, and brake system repairs</li>
                <li className="flex items-start"><span className="text-[#9b111e] mr-2">•</span>24/7 emergency roadside assistance and towing</li>
                <li className="flex items-start"><span className="text-[#9b111e] mr-2">•</span>Air conditioning, electrical, and suspension services</li>
              </ul>
              <p className="mt-4 text-gray-700 leading-relaxed" style={{ fontFamily: FONTS.header.fontFamily }}>
                All services are performed by ASE-certified technicians using genuine OEM or premium aftermarket parts. We guarantee superior workmanship and stand behind every service with comprehensive warranties and customer satisfaction guarantees.
              </p>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mb-10 pb-8 border-b border-gray-200">   
            <h2 className="pb-6 text-3xl font-bold text-[#9b111e] flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-[#9b111e] rounded-full mr-4"></span>
              Payment Terms & Pricing
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-lg mb-4" style={{ fontFamily: FONTS.header.fontFamily }}>
                We offer flexible payment options to ensure convenient service experience:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Payment Methods</h4>
                  <ul className="text-gray-700 space-y-1" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li>• Cash and Check</li>
                    <li>• All Major Credit Cards</li>
                    <li>• Digital Payments (Apple Pay, Google Pay)</li>
                    <li>• Financing Options Available</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Payment Policy</h4>
                  <ul className="text-gray-700 space-y-1" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li>• Payment due upon service completion</li>
                    <li>• Pre-approval required for repairs over $500</li>
                    <li>• Estimates valid for 30 days</li>
                    <li>• Special order parts are non-refundable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Policy */}
          <div className="mb-10 pb-8 border-b border-gray-200">   
            <h2 className="pb-6 text-3xl font-bold text-[#9b111e] flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-[#9b111e] rounded-full mr-4"></span>
              Comprehensive Warranty Policy
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-[#9b111e] text-white p-4 rounded-lg mb-4">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                  🛡️ Premium Warranty Coverage
                </h3>
                {/* <p className="text-lg" style={{ fontFamily: FONTS.header.fontFamily }}>
                  12 Months or 12,000 Miles - Whichever Comes First
                </p> */}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#9b111e] mb-3" style={{ fontFamily: FONTS.header.fontFamily }}>Warranty Includes:</h4>
                  <ul className="text-gray-700 space-y-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>Parts and labor coverage</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>Free re-inspection services</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>Nationwide warranty honor</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>24/7 warranty support hotline</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#9b111e] mb-3" style={{ fontFamily: FONTS.header.fontFamily }}>Warranty Exclusions:</h4>
                  <ul className="text-gray-700 space-y-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li className="flex items-start"><span className="text-red-500 mr-2">✗</span>Normal wear and tear items</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2">✗</span>Accident or collision damage</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2">✗</span>Customer modifications</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2">✗</span>Neglected maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Liability and Insurance */}
          <div className="mb-10 pb-8 border-b border-gray-200">   
            <h2 className="pb-6 text-3xl font-bold text-[#9b111e] flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-[#9b111e] rounded-full mr-4"></span>
              Liability & Insurance Protection
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <h4 className="font-bold text-blue-800 mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                  🛡️ Full Insurance Coverage
                </h4>
                <p className="text-blue-700" style={{ fontFamily: FONTS.header.fontFamily }}>
                  Our facility maintains comprehensive liability insurance and bonding to protect your vehicle investment.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>We Cover:</h4>
                  <ul className="text-gray-700 space-y-1" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li>• Vehicle damage during service</li>
                    <li>• Theft while in our custody</li>
                    <li>• Fire and natural disasters</li>
                    <li>• Comprehensive liability protection</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Customer Responsibility:</h4>
                  <ul className="text-gray-700 space-y-1" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li>• Remove all personal items</li>
                    <li>• Secure valuable belongings</li>
                    <li>• Provide accurate vehicle information</li>
                    <li>• Report pre-existing damage</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium" style={{ fontFamily: FONTS.header.fontFamily }}>
                  ⚠️ Important: We reserve the right to refuse service on vehicles deemed unsafe or beyond economical repair for safety reasons.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Services */}
          <div className="mb-10 pb-8 border-b border-gray-200">   
            <h2 className="pb-6 text-3xl font-bold text-[#9b111e] flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-[#9b111e] rounded-full mr-4"></span>
              24/7 Emergency Roadside Services
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                  🚨 Emergency Hotline: 1-800-CAR-HELP
                </h3>
                <p className="text-lg" style={{ fontFamily: FONTS.header.fontFamily }}>
                  Available 24 Hours a Day, 365 Days a Year
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-3xl mb-2">🔧</div>
                  <h4 className="font-bold text-[#9b111e]" style={{ fontFamily: FONTS.header.fontFamily }}>Mechanical</h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: FONTS.header.fontFamily }}>Jump-starts, battery replacement, minor repairs</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-3xl mb-2">🚛</div>
                  <h4 className="font-bold text-[#9b111e]" style={{ fontFamily: FONTS.header.fontFamily }}>Towing</h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: FONTS.header.fontFamily }}>Local and long-distance towing services</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-3xl mb-2">🔑</div>
                  <h4 className="font-bold text-[#9b111e]" style={{ fontFamily: FONTS.header.fontFamily }}>Lockout</h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: FONTS.header.fontFamily }}>Professional lockout assistance</p>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h4 className="font-bold text-orange-800 mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Emergency Service Notes:</h4>
                <ul className="text-orange-700 space-y-1" style={{ fontFamily: FONTS.header.fontFamily }}>
                  <li>• Premium rates apply after hours, weekends, and holidays</li>
                  <li>• Response times vary by location and weather conditions</li>
                  <li>• Stay in a safe location and follow technician instructions</li>
                  <li>• Payment required at time of service for emergency calls</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy and Data Protection */}
          <div className="mb-10 pb-8 border-b border-gray-200">   
            <h2 className="pb-6 text-3xl font-bold text-[#9b111e] flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-[#9b111e] rounded-full mr-4"></span>
              Privacy & Data Protection
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <h4 className="font-bold text-green-800 mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                  🔒 Your Privacy is Our Priority
                </h4>
                <p className="text-green-700" style={{ fontFamily: FONTS.header.fontFamily }}>
                  We employ industry-leading security measures to protect your personal and vehicle information.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Information We Collect:</h4>
                  <ul className="text-gray-700 space-y-1" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li>• Contact and billing information</li>
                    <li>• Vehicle specifications and history</li>
                    <li>• Service records and maintenance logs</li>
                    <li>• Diagnostic and repair documentation</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>How We Protect You:</h4>
                  <ul className="text-gray-700 space-y-1" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li>• Encrypted data storage and transmission</li>
                    <li>• Secure payment processing systems</li>
                    <li>• Limited access on need-to-know basis</li>
                    <li>• Regular security audits and updates</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800" style={{ fontFamily: FONTS.header.fontFamily }}>
                  <strong>Data Sharing Policy:</strong> We never sell or share your personal information with third parties for marketing purposes. Information is only shared as required by law or with your explicit consent.
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="mb-10 pb-8 border-b border-gray-200">   
            <h2 className="pb-6 text-3xl font-bold text-[#9b111e] flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-[#9b111e] rounded-full mr-4"></span>
              Appointment & Cancellation Policy
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-3" style={{ fontFamily: FONTS.header.fontFamily }}>Scheduling Guidelines:</h4>
                  <ul className="text-gray-700 space-y-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>Online booking available 24/7</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>Same-day appointments when available</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>Flexible rescheduling options</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span>Appointment reminders via SMS/email</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-[#9b111e] mb-3" style={{ fontFamily: FONTS.header.fontFamily }}>Cancellation Terms:</h4>
                  <ul className="text-gray-700 space-y-2" style={{ fontFamily: FONTS.header.fontFamily }}>
                    <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>24-hour advance notice required</li>
                    <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Late cancellation fee: $25</li>
                    <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>No-show fee: $50</li>
                    <li className="flex items-start"><span className="text-blue-500 mr-2">•</span>Emergency exceptions considered</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Emergency Service Cancellations:</h4>
                <p className="text-yellow-700" style={{ fontFamily: FONTS.header.fontFamily }}>
                  If our technician is already dispatched to your location, cancellation fees apply. We understand emergencies happen and evaluate each situation individually for unavoidable circumstances.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-[#9b111e] to-red-700 p-8 rounded-2xl text-white">
            <h2 className="pb-6 text-3xl font-bold flex items-center" style={{ fontFamily: FONTS.header.fontFamily }}>
              <span className="w-2 h-8 bg-white rounded-full mr-4"></span>
              Contact Our Expert Team
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl mb-2">📞</div>
                <h4 className="font-bold mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Phone Support</h4>
                <p style={{ fontFamily: FONTS.header.fontFamily }}>1-800-CAR-SERV</p>
                <p className="text-sm opacity-90" style={{ fontFamily: FONTS.header.fontFamily }}>Mon-Fri: 7AM-7PM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl mb-2">💬</div>
                <h4 className="font-bold mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Live Chat</h4>
                <p style={{ fontFamily: FONTS.header.fontFamily }}>Available 24/7</p>
                <p className="text-sm opacity-90" style={{ fontFamily: FONTS.header.fontFamily }}>Instant support online</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl mb-2">📧</div>
                <h4 className="font-bold mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Email Support</h4>
                <p style={{ fontFamily: FONTS.header.fontFamily }}>support@carservice.com</p>
                <p className="text-sm opacity-90" style={{ fontFamily: FONTS.header.fontFamily }}>Response within 24hrs</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h4 className="font-bold mb-2" style={{ fontFamily: FONTS.header.fontFamily }}>Important Notice:</h4>
              <p className="leading-relaxed" style={{ fontFamily: FONTS.header.fontFamily }}>
                These terms and conditions are subject to periodic updates to reflect changes in our services and legal requirements. 
                The most current version will always be available on our platform. We are committed to providing transparent, 
                excellent service and addressing any concerns promptly and professionally.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default TermsConditionsSettings
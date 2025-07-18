import { FONTS } from "../../constants/uiConstants"
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PrivacyPolicySettings = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Back Arrow */}
      <div className='flex flex-row items-center gap-4 mb-6'>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-[#9b111e] hover:underline transition-colors duration-200 rounded-3xl"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        
        <h1 className="font-bold text-3xl text-[#9b111e]" 
            style={{...FONTS.header}}>
          Privacy Policy & Terms
        </h1>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
        
        {/* Privacy Policy Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#9b111e] mb-6 border-b-2 border-[#9b111e] pb-2" 
              style={{...FONTS.subHeader}}>
            Car Service Privacy Policy
          </h2>
          
          <div className="space-y-6">
            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Information We Collect:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                We collect personal information when you book our car services, including your name, contact details, vehicle information, and service preferences. We also collect location data to provide accurate pickup and delivery services, and payment information to process transactions securely.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                How We Use Your Information:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                Your information is used to provide and improve our car services, schedule appointments, send service reminders, process payments, and communicate important updates about your vehicle. We may also use aggregated data to enhance our service quality and develop new features.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Data Security & Protection:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. Your payment information is processed through PCI-compliant payment processors, and we never store complete credit card details on our servers.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Information Sharing:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                We do not sell, trade, or rent your personal information to third parties. We may share necessary information with our trusted service partners (mechanics, parts suppliers) only to fulfill your service requests. We may also disclose information when required by law or to protect our rights and safety.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Your Rights & Choices:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                You have the right to access, update, or delete your personal information at any time. You can opt-out of marketing communications while still receiving essential service notifications. Contact our support team to exercise these rights or if you have any privacy concerns.
              </p>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="border-t-2 border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-[#9b111e] mb-6 border-b-2 border-[#9b111e] pb-2" 
              style={{...FONTS.subHeader}}>
            Car Service Terms & Conditions
          </h2>
          
          <div className="space-y-6">
            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Service Agreement:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                By using our car service platform, you agree to these terms and conditions. Our services include vehicle maintenance, repairs, inspections, and related automotive services. All work is performed by certified technicians using quality parts and following industry standards.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Booking & Cancellation Policy:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                Service appointments can be booked online or through our mobile app. Cancellations must be made at least 24 hours in advance to avoid cancellation fees. Emergency services are available with additional charges. We reserve the right to reschedule appointments due to unforeseen circumstances.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Payment Terms:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                Payment is due upon completion of services unless prior arrangements are made. We accept cash, credit cards, and digital payments. Estimates are provided before work begins, and additional charges require customer approval. Late payment fees may apply to outstanding balances.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Warranty & Liability:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                We provide warranties on parts and labor as specified in your service agreement. Our liability is limited to the cost of services provided. Customers are responsible for providing accurate vehicle information and disclosing known issues that may affect service quality or safety.
              </p>
            </div>

            <div>   
              <h3 className="pb-3 text-xl font-bold text-[#9b111e]" style={{...FONTS.cardheader}}>
                Customer Responsibilities:
              </h3>
              <p className="text-gray-700 leading-relaxed" style={{...FONTS.paragraph}}>
                Customers must provide accurate contact information, ensure vehicle accessibility for pickup/delivery services, remove personal items before service, and promptly report any concerns about completed work. Failure to comply may result in additional charges or service delays.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-[#9b111e] mb-3" style={{...FONTS.cardheader}}>
            Questions or Concerns?
          </h3>
          <p className="text-gray-700" style={{...FONTS.paragraph}}>
            If you have any questions about our Privacy Policy or Terms & Conditions, please contact our customer support team. We're here to help and ensure your experience with our car service platform is excellent.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicySettings
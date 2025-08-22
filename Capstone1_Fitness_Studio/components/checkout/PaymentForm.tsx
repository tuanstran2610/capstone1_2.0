'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCreditCard, FaMoneyBillWave, FaQrcode, FaSpinner, FaMobile, FaShieldAlt } from 'react-icons/fa'
import ZaloPayIcon from '../ui/ZaloPayIcon'
import ZaloPayLoading from '../ui/ZaloPayLoading'

type PaymentFormProps = {
  onSubmit: (paymentDetails: any) => void
  onBack: () => void
  isProcessing: boolean
  error: string
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  onBack,
  isProcessing,
  error,
  paymentMethod,
  setPaymentMethod
}) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .slice(0, 19)
      
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }))
    } 
    // Format expiry date as MM/YY
    else if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '')
      let formattedValue = cleaned
      
      if (cleaned.length > 2) {
        formattedValue = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }
      
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }))
    }
    // CVV - only allow numbers and max 3 digits
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 3)
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }))
    }
    else {
      setCardDetails(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateCardDetails = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    if (paymentMethod === 'card') {
      // Validate card number
      if (!cardDetails.cardNumber.trim() || cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid card number (16 digits)'
        isValid = false
      }

      // Validate card name
      if (!cardDetails.cardName.trim()) {
        newErrors.cardName = 'Please enter cardholder name'
        isValid = false
      }

      // Validate expiry date
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
      if (!cardDetails.expiryDate.trim() || !expiryRegex.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
        isValid = false
      } else {
        // Check if card is expired
        const [month, year] = cardDetails.expiryDate.split('/')
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
        const today = new Date()
        
        if (expiryDate < today) {
          newErrors.expiryDate = 'Card has expired'
          isValid = false
        }
      }

      // Validate CVV
      if (!cardDetails.cvv.trim() || cardDetails.cvv.length !== 3) {
        newErrors.cvv = 'Please enter a valid CVV (3 digits)'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate based on payment method
    if (paymentMethod === 'card' && !validateCardDetails()) {
      return
    }
    
    onSubmit({
      paymentMethod,
      ...(paymentMethod === 'card' ? { cardDetails } : {})
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment</h2>
      <p className="text-gray-600 mb-8">
        Choose your preferred payment method
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center justify-center px-4 py-4 border-2 rounded-lg transition-all duration-200 ${
              paymentMethod === 'card'
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <FaCreditCard className={`mr-3 text-xl ${paymentMethod === 'card' ? 'text-accent' : 'text-gray-500'}`} />
            <div className="text-left">
              <div className={`font-medium ${paymentMethod === 'card' ? 'text-accent' : 'text-gray-700'}`}>
                Credit Card
              </div>
              <div className="text-xs text-gray-500">Visa, MasterCard</div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentMethod('banking')}
            className={`flex items-center justify-center px-4 py-4 border-2 rounded-lg transition-all duration-200 ${
              paymentMethod === 'banking'
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <FaQrcode className={`mr-3 text-xl ${paymentMethod === 'banking' ? 'text-accent' : 'text-gray-500'}`} />
            <div className="text-left">
              <div className={`font-medium ${paymentMethod === 'banking' ? 'text-accent' : 'text-gray-700'}`}>
                Internet Banking
              </div>
              <div className="text-xs text-gray-500">QR Code</div>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentMethod('zalopay')}
            className={`flex items-center justify-center px-4 py-4 border-2 rounded-lg transition-all duration-200 relative overflow-hidden ${
              paymentMethod === 'zalopay'
                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm hover:bg-blue-50/30'
            }`}
          >
            {/* ZaloPay Logo Background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 ${
              paymentMethod === 'zalopay' ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-200`} />
            
            <div className={`mr-3 text-2xl relative z-10 ${
              paymentMethod === 'zalopay' ? 'text-blue-600' : 'text-gray-500'
            }`}>
              <ZaloPayIcon size={32} className={paymentMethod === 'zalopay' ? '' : 'grayscale'} />
            </div>
            <div className="text-left relative z-10">
              <div className={`font-bold ${
                paymentMethod === 'zalopay' ? 'text-blue-700' : 'text-gray-700'
              }`}>
                ZaloPay
              </div>
              <div className={`text-xs flex items-center ${
                paymentMethod === 'zalopay' ? 'text-blue-600' : 'text-gray-500'
              }`}>
                <FaMobile className="mr-1" /> Fast & Secure
              </div>
            </div>
            
            {/* Popular badge */}
            {paymentMethod !== 'zalopay' && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full transform rotate-12">
                Popular
              </div>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentMethod('cash')}
            className={`flex items-center justify-center px-4 py-4 border-2 rounded-lg transition-all duration-200 ${
              paymentMethod === 'cash'
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <FaMoneyBillWave className={`mr-3 text-xl ${paymentMethod === 'cash' ? 'text-accent' : 'text-gray-500'}`} />
            <div className="text-left">
              <div className={`font-medium ${paymentMethod === 'cash' ? 'text-accent' : 'text-gray-700'}`}>
                Cash
              </div>
              <div className="text-xs text-gray-500">At gym location</div>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Credit/Debit Card Information */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cardNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
                  }`}
                  maxLength={19}
                />
                {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
              </div>

              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardDetailsChange}
                  placeholder="JOHN DOE"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cardName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
                  }`}
                />
                {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                    placeholder="MM/YY"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.expiryDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
                    }`}
                    maxLength={5}
                  />
                  {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    placeholder="123"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.cvv ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-accent/20'
                    }`}
                    maxLength={3}
                  />
                  {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Internet Banking/QR Code Information */}
          {paymentMethod === 'banking' && (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex justify-center mb-4">
                <div className="w-48 h-48 bg-white p-2 border border-gray-200 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <FaQrcode size={120} className="mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Payment QR Code</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="font-medium">Scan QR code to pay</p>
                <p className="text-sm text-gray-600 mt-2">
                  Or transfer to account number:
                </p>
                <p className="font-medium mt-1">1234567890</p>
                <p className="text-sm">NGUYEN VAN A - ABC Bank</p>
                <p className="text-sm text-gray-600 mt-2">
                  Transfer content: [Full Name] - [Phone Number]
                </p>
              </div>
            </div>
          )}

          {/* Cash Payment Information */}
          {paymentMethod === 'cash' && (
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="text-center">
                <FaMoneyBillWave size={48} className="mx-auto mb-4 text-green-500" />
                <p className="font-medium">Cash Payment at Gym</p>
                <p className="text-sm text-gray-600 mt-2">
                  You can pay directly at the gym's reception counter.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Address: 123 ABC Street, XYZ District, Ho Chi Minh City
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Hours: 6:00 - 22:00 daily
                </p>
                <p className="text-sm font-medium text-gray-800 mt-4">
                  Note: Membership will only be activated after successful payment.
                </p>
              </div>
            </div>
          )}

          {/* ZaloPay Payment Information */}
          {paymentMethod === 'zalopay' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-blue-200 rounded-xl p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm"
            >
              <div className="text-center">
                <ZaloPayIcon size={80} className="mx-auto mb-4" />
                
                <h3 className="text-xl font-bold text-blue-800 mb-2">Payment via ZaloPay</h3>
                <p className="text-blue-600 mb-4">Fast and secure payment method</p>
                
                <div className="bg-white/70 rounded-lg p-4 mb-4 border border-blue-100">
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center text-green-600">
                      <FaShieldAlt className="mr-2" />
                      <span className="font-medium">SSL Security</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <FaMobile className="mr-2" />
                      <span className="font-medium">Instant Payment</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">
                      Click <strong>"Complete Payment"</strong> to go to ZaloPay
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">
                      Log in to ZaloPay and confirm payment
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="text-sm text-gray-700 pt-0.5">
                      Return to website to complete registration
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-center text-amber-700">
                    <div className="mr-2">💡</div>
                    <p className="text-xs font-medium">
                      Make sure you have installed ZaloPay app for faster payments
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-8">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              disabled={isProcessing}
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            
            <motion.button
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              type="submit"
              className={`relative overflow-hidden font-medium py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center min-w-[200px] ${
                paymentMethod === 'zalopay'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg'
                  : isProcessing 
                  ? 'bg-accent/70 text-white cursor-not-allowed' 
                  : 'bg-accent hover:bg-accent/90 text-white shadow-md hover:shadow-lg'
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                paymentMethod === 'zalopay' ? (
                  <ZaloPayLoading message="Redirecting..." />
                ) : (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                )
              ) : (
                <>
                  {paymentMethod === 'zalopay' ? (
                    <>
                      <ZaloPayIcon size={20} className="mr-2" />
                      Pay with ZaloPay
                    </>
                  ) : (
                    'Complete Payment'
                  )}
                </>
              )}
              
              {/* ZaloPay button effect */}
              {paymentMethod === 'zalopay' && !isProcessing && (
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></div>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentForm 
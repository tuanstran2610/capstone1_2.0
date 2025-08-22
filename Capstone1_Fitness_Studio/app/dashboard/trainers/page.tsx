'use client'

import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar, FaFilter, FaCalendarAlt, FaSearch } from 'react-icons/fa';

// Mock data for trainers
const trainersData = [
  {
    id: 1,
    name: 'David Johnson',
    image: '/assets/img/trainers/david.jpg',
    specialties: ['Cardio', 'HIIT', 'Weight Loss'],
    experience: '8 years',
    rating: 4.8,
    reviews: 124,
    bio: 'David is a trainer specializing in cardio and HIIT with over 8 years of experience. He has helped hundreds of clients achieve weight loss goals and improve cardiovascular health.',
    availableSlots: [
      { date: '15/08/2023', slots: ['08:00', '10:00', '15:00'] },
      { date: '16/08/2023', slots: ['09:00', '14:00', '17:00'] },
      { date: '17/08/2023', slots: ['10:00', '13:00', '16:00'] },
    ]
  },
  {
    id: 2,
    name: 'Sofia Wilson',
    image: '/assets/img/trainers/sofia.jpg',
    specialties: ['Yoga', 'Pilates', 'Meditation'],
    experience: '10 years',
    rating: 4.9,
    reviews: 156,
    bio: 'Sofia is a yoga and meditation specialist with international certification. She has taught at many prestigious yoga centers before joining Fitness Studio.',
    availableSlots: [
      { date: '15/08/2023', slots: ['07:00', '09:00', '16:00'] },
      { date: '16/08/2023', slots: ['08:00', '15:00', '18:00'] },
      { date: '17/08/2023', slots: ['07:00', '14:00', '17:00'] },
    ]
  },
  {
    id: 3,
    name: 'Matt Smith',
    image: '/assets/img/trainers/matt.jpg',
    specialties: ['Strength Training', 'Bodybuilding', 'Nutrition'],
    experience: '6 years',
    rating: 4.7,
    reviews: 98,
    bio: 'Matt specializes in strength training and bodybuilding. He is also a certified nutritionist, helping clients build meal plans that align with their training goals.',
    availableSlots: [
      { date: '15/08/2023', slots: ['11:00', '14:00', '18:00'] },
      { date: '16/08/2023', slots: ['10:00', '13:00', '16:00'] },
      { date: '17/08/2023', slots: ['09:00', '15:00', '19:00'] },
    ]
  },
  {
    id: 4,
    name: 'Rosy Lee',
    image: '/assets/img/trainers/rosy.jpg',
    specialties: ['Zumba', 'Dance Fitness', 'Aerobic'],
    experience: '7 years',
    rating: 4.9,
    reviews: 132,
    bio: 'Rosy is an energetic trainer specializing in group classes like Zumba and Dance Fitness. She was a professional dancer before becoming a fitness trainer.',
    availableSlots: [
      { date: '15/08/2023', slots: ['09:00', '12:00', '17:00'] },
      { date: '16/08/2023', slots: ['11:00', '15:00', '19:00'] },
      { date: '17/08/2023', slots: ['08:00', '13:00', '18:00'] },
    ]
  },
];

// List of specialties for filtering
const specialties = ['Cardio', 'HIIT', 'Yoga', 'Pilates', 'Meditation', 'Strength Training', 'Bodybuilding', 'Nutrition', 'Zumba', 'Dance Fitness', 'Aerobic', 'Weight Loss'];

export default function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get selected trainer information
  const getSelectedTrainer = () => {
    return trainersData.find(trainer => trainer.id === selectedTrainer) || null;
  };

  // Filter trainers by search and specialties
  const filteredTrainers = trainersData.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         trainer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialties = selectedSpecialties.length === 0 || 
                              trainer.specialties.some(s => selectedSpecialties.includes(s));
    
    return matchesSearch && matchesSpecialties;
  });

  // Handle specialty selection
  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  // Display rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  // Handle booking
  const handleBooking = () => {
    if (selectedTrainer && selectedDate && selectedTime) {
      alert(`Booked session with ${getSelectedTrainer()?.name} on ${selectedDate} at ${selectedTime}`);
      setSelectedTrainer(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Trainers</h1>

      {/* Search and filter */}
      <div className="bg-primary-300 rounded-lg shadow-2xl p-6 mb-8 border border-primary-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-md bg-primary-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="border-t border-primary-100 pt-4">
            <h3 className="font-medium text-white mb-3">Specialties:</h3>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => toggleSpecialty(specialty)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedSpecialties.includes(specialty)
                      ? 'bg-accent text-white'
                      : 'bg-primary-200 text-gray-300 hover:bg-primary-100 border border-primary-100'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trainers list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-300">
            No trainers found matching your criteria
          </div>
        )}
        {filteredTrainers.map((trainer) => (
          <div
            key={trainer.id}
            className={`bg-primary-300 rounded-lg shadow-2xl p-6 cursor-pointer transition-all border ${
              selectedTrainer === trainer.id 
                ? 'border-accent shadow-3xl' 
                : 'border-primary-100 hover:border-accent/50'
            }`}
            onClick={() => setSelectedTrainer(trainer.id)}
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{trainer.name}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(trainer.rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-500'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-300">({trainer.reviews} reviews)</span>
                </div>
                <p className="text-gray-300 mb-3"><span className="font-medium">Experience:</span> {trainer.experience}</p>

                <div className="mb-4">
                  <p className="font-medium mb-1 text-white">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {trainer.specialties.map(specialty => (
                      <span key={specialty} className="bg-primary-200 px-2 py-1 rounded-md text-xs text-gray-300 border border-primary-100">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-primary-300 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{getSelectedTrainer()?.name}</h2>
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(getSelectedTrainer()?.rating || 0) 
                          ? 'text-yellow-400' 
                          : 'text-gray-500'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300">({getSelectedTrainer()?.reviews})</span>
              </div>

              <p className="text-sm text-gray-300 mb-2"><span className="font-medium">Experience:</span> {getSelectedTrainer()?.experience}</p>
              <p className="text-gray-300 mb-4">{getSelectedTrainer()?.bio}</p>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2 text-white">Choose Date:</h3>
                <div className="flex flex-wrap gap-2">
                  {getSelectedTrainer()?.availableSlots.map(slot => (
                    <button
                      key={slot.date}
                      onClick={() => {
                        setSelectedDate(slot.date);
                        setSelectedTime(null);
                      }}
                      className={`px-3 py-1 border rounded-md ${
                        selectedDate === slot.date
                          ? 'bg-accent text-white border-accent'
                          : 'border-primary-100 hover:bg-primary-200 text-gray-300'
                      }`}
                    >
                      {slot.date}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedDate && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2 text-white">Choose Time:</h3>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedTrainer()?.availableSlots
                      .find(slot => slot.date === selectedDate)
                      ?.slots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-1 border rounded-md ${
                            selectedTime === time
                              ? 'bg-accent text-white border-accent'
                              : 'border-primary-100 hover:bg-primary-200 text-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className="px-4 py-2 border border-primary-100 rounded-md hover:bg-primary-200 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                  className={`px-4 py-2 rounded-md ${
                    selectedDate && selectedTime
                      ? 'bg-accent hover:bg-accent/90 text-white'
                      : 'bg-primary-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
import { NextResponse } from 'next/server';

// Dữ liệu về phòng tập
const gymData = {
  name: 'Fitness Studio',
  openingHours: 'Mở cửa từ 6:00 sáng đến 10:00 tối hàng ngày, kể cả ngày lễ',
  classes: [
    { name: 'Yoga', schedule: 'Thứ 2, 4, 6: 7:00-8:30, 18:00-19:30', instructor: 'Nguyễn Thị Hương' },
    { name: 'Cardio', schedule: 'Thứ 3, 5, 7: 8:00-9:30, 17:00-18:30', instructor: 'Trần Văn Minh' },
    { name: 'CrossFit', schedule: 'Thứ 2, 3, 5: 9:00-10:30, 19:00-20:30', instructor: 'Lê Đình Tuấn' },
    { name: 'Bodybuilding', schedule: 'Thứ 4, 6, 7: 10:00-11:30, 16:00-17:30', instructor: 'Phạm Văn Đức' }
  ],
  membership: [
    { type: 'Cơ bản', price: '500.000đ/tháng', benefits: 'Sử dụng phòng tập, tủ đồ, phòng tắm' },
    { type: 'Tiêu chuẩn', price: '800.000đ/tháng', benefits: 'Cơ bản + tham gia các lớp tập nhóm' },
    { type: 'VIP', price: '1.200.000đ/tháng', benefits: 'Tiêu chuẩn + 2 buổi PT/tháng, ưu tiên đặt lịch' },
    { type: 'Platinum', price: '2.000.000đ/tháng', benefits: 'VIP + 4 buổi PT/tháng, đồ uống miễn phí, khăn tắm' }
  ],
  trainers: [
    { name: 'Nguyễn Thị Hương', specialty: 'Yoga, Pilates', experience: '8 năm' },
    { name: 'Trần Văn Minh', specialty: 'Cardio, HIIT', experience: '6 năm' },
    { name: 'Lê Đình Tuấn', specialty: 'CrossFit, Functional Training', experience: '10 năm' },
    { name: 'Phạm Văn Đức', specialty: 'Bodybuilding, Strength Training', experience: '12 năm' }
  ],
  location: '123 Đường ABC, Quận XYZ, Thành phố HCM',
  contact: {
    phone: '0123.456.789',
    email: 'support@fitnessstudio.com',
    facebook: 'fb.com/fitnessstudio',
    instagram: 'instagram.com/fitnessstudio'
  },
  facilities: [
    'Phòng tập hiện đại 1000m²',
    'Máy tập nhập khẩu từ Mỹ và châu Âu',
    'Phòng xông hơi và tắm',
    'Khu vực thay đồ rộng rãi',
    'Bãi đậu xe miễn phí',
    'Quầy bar dinh dưỡng'
  ]
};

// Xử lý các câu hỏi thường gặp
const faqResponses = {
  greeting: [
    'Xin chào! Tôi có thể giúp gì cho bạn về Fitness Studio?',
    'Chào bạn! Bạn cần tìm hiểu thông tin gì về phòng tập của chúng tôi?',
    'Xin chào! Rất vui được hỗ trợ bạn. Bạn quan tâm đến dịch vụ nào của chúng tôi?'
  ],
  openingHours: [
    `${gymData.name} ${gymData.openingHours}.`,
    `Chúng tôi ${gymData.openingHours}. Bạn có thể ghé thăm bất kỳ lúc nào trong khung giờ này.`,
    `Thời gian hoạt động của chúng tôi là ${gymData.openingHours}.`
  ],
  classes: [
    `Chúng tôi cung cấp nhiều lớp tập khác nhau như: ${gymData.classes.map(c => c.name).join(', ')}.`,
    `Các lớp tập tại ${gymData.name} bao gồm: ${gymData.classes.map(c => `${c.name} (${c.schedule})`).join('; ')}.`,
    `Bạn có thể tham gia các lớp: ${gymData.classes.map(c => c.name).join(', ')}. Bạn quan tâm đến lớp nào cụ thể không?`
  ],
  membership: [
    `Chúng tôi có các gói thành viên: ${gymData.membership.map(m => `${m.type} (${m.price})`).join(', ')}.`,
    `Các gói thành viên tại ${gymData.name}: ${gymData.membership.map(m => `${m.type}: ${m.price} - ${m.benefits}`).join('; ')}.`,
    `Giá thành viên bắt đầu từ ${gymData.membership[0].price} cho gói ${gymData.membership[0].type}. Bạn muốn biết chi tiết về gói nào?`
  ],
  trainers: [
    `Đội ngũ huấn luyện viên của chúng tôi gồm: ${gymData.trainers.map(t => `${t.name} (${t.specialty})`).join(', ')}.`,
    `Các huấn luyện viên tại ${gymData.name} đều có kinh nghiệm và chuyên môn cao: ${gymData.trainers.map(t => `${t.name} - ${t.specialty} - ${t.experience} kinh nghiệm`).join('; ')}.`,
    `Chúng tôi có ${gymData.trainers.length} huấn luyện viên chuyên nghiệp. Bạn muốn tìm hiểu về ai cụ thể không?`
  ],
  location: [
    `${gymData.name} tọa lạc tại ${gymData.location}.`,
    `Bạn có thể tìm thấy chúng tôi tại địa chỉ: ${gymData.location}.`,
    `Địa chỉ của chúng tôi là ${gymData.location}. Rất dễ tìm và có bãi đậu xe miễn phí.`
  ],
  contact: [
    `Bạn có thể liên hệ với chúng tôi qua số điện thoại ${gymData.contact.phone} hoặc email ${gymData.contact.email}.`,
    `Thông tin liên hệ: SĐT: ${gymData.contact.phone}, Email: ${gymData.contact.email}, Facebook: ${gymData.contact.facebook}.`,
    `Để đặt lịch hoặc tư vấn, vui lòng gọi ${gymData.contact.phone} hoặc gửi email đến ${gymData.contact.email}.`
  ],
  facilities: [
    `Cơ sở vật chất của chúng tôi bao gồm: ${gymData.facilities.join(', ')}.`,
    `${gymData.name} tự hào với: ${gymData.facilities.join('; ')}.`,
    `Chúng tôi cung cấp đầy đủ tiện nghi hiện đại như: ${gymData.facilities.join(', ')}.`
  ],
  pricing: [
    `Giá thành viên bắt đầu từ ${gymData.membership[0].price} cho gói ${gymData.membership[0].type} và cao nhất là ${gymData.membership[gymData.membership.length-1].price} cho gói ${gymData.membership[gymData.membership.length-1].type}.`,
    `Các mức giá thành viên: ${gymData.membership.map(m => `${m.type}: ${m.price}`).join(', ')}.`,
    `Chúng tôi có nhiều gói giá phù hợp với nhu cầu của bạn, từ ${gymData.membership[0].price} đến ${gymData.membership[gymData.membership.length-1].price}.`
  ],
  personalTraining: [
    `Giá huấn luyện cá nhân (PT) là 300.000đ/buổi hoặc 2.500.000đ/10 buổi.`,
    `Dịch vụ PT có giá 300.000đ/buổi. Bạn sẽ được giảm giá nếu đăng ký gói nhiều buổi.`,
    `Huấn luyện viên cá nhân có sẵn với mức giá 300.000đ/buổi. Các gói VIP và Platinum đã bao gồm một số buổi PT hàng tháng.`
  ],
  trial: [
    `Chúng tôi cung cấp buổi tập thử miễn phí cho khách hàng mới. Bạn có thể đăng ký tại quầy lễ tân hoặc qua số điện thoại ${gymData.contact.phone}.`,
    `Bạn có thể đăng ký buổi tập thử miễn phí để trải nghiệm dịch vụ của chúng tôi trước khi quyết định đăng ký thành viên.`,
    `${gymData.name} luôn chào đón khách hàng mới với buổi tập thử miễn phí. Vui lòng liên hệ ${gymData.contact.phone} để đặt lịch.`
  ],
  default: [
    'Cảm ơn bạn đã liên hệ. Bạn cần hỗ trợ thêm về vấn đề gì?',
    'Tôi không chắc mình hiểu câu hỏi của bạn. Bạn có thể hỏi về giờ mở cửa, các lớp tập, giá thành viên, huấn luyện viên, địa điểm hoặc cơ sở vật chất của chúng tôi.',
    'Xin lỗi, tôi không có thông tin về vấn đề này. Bạn có thể liên hệ trực tiếp với chúng tôi qua số điện thoại ' + gymData.contact.phone + ' để được hỗ trợ tốt hơn.'
  ]
};

// Định nghĩa kiểu cho đối tượng faqResponses
type ResponseCategories = keyof typeof faqResponses;

// Trợ giúp xác định loại câu hỏi
const questionPatterns = {
  greeting: ['xin chào', 'chào', 'hello', 'hi', 'hey', 'alo', 'chào bạn'],
  openingHours: ['giờ', 'mở cửa', 'đóng cửa', 'thời gian', 'hoạt động', 'khi nào', 'mấy giờ'],
  classes: ['lớp', 'khóa', 'tập', 'học', 'yoga', 'cardio', 'crossfit', 'bodybuilding', 'lịch tập', 'lịch học'],
  membership: ['thành viên', 'đăng ký', 'membership', 'gói', 'hội viên'],
  trainers: ['huấn luyện', 'pt', 'cá nhân', 'trainer', 'giáo viên', 'hướng dẫn', 'hlv'],
  location: ['địa chỉ', 'ở đâu', 'vị trí', 'đường', 'quận', 'tìm', 'bản đồ', 'map', 'tới', 'đến'],
  contact: ['liên hệ', 'gọi', 'số điện thoại', 'email', 'facebook', 'zalo', 'instagram'],
  facilities: ['cơ sở', 'thiết bị', 'máy', 'phòng', 'tiện nghi', 'trang thiết bị', 'trang bị'],
  pricing: ['giá', 'phí', 'tiền', 'bao nhiêu', 'chi phí', 'trả'],
  personalTraining: ['pt', 'huấn luyện cá nhân', 'riêng', 'one-on-one', '1-1'],
  trial: ['thử', 'miễn phí', 'trải nghiệm', 'dùng thử', 'free', 'tập thử']
};

// Hàm trả về câu trả lời ngẫu nhiên từ một danh sách
const getRandomResponse = (responses: string[]) => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Hàm xác định loại câu hỏi dựa trên từ khóa
const determineQuestionType = (message: string): ResponseCategories => {
  const lowerMessage = message.toLowerCase();
  
  for (const [type, patterns] of Object.entries(questionPatterns)) {
    for (const pattern of patterns) {
      if (lowerMessage.includes(pattern)) {
        return type as ResponseCategories;
      }
    }
  }
  
  return 'default';
};

// Xử lý chi tiết cho các lớp tập cụ thể
const handleSpecificClass = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  for (const classInfo of gymData.classes) {
    if (lowerMessage.includes(classInfo.name.toLowerCase())) {
      return `Lớp ${classInfo.name} được dạy bởi ${classInfo.instructor} theo lịch: ${classInfo.schedule}. Bạn có thể đăng ký tại quầy lễ tân hoặc qua số điện thoại ${gymData.contact.phone}.`;
    }
  }
  
  return null;
};

// Xử lý chi tiết cho các gói thành viên cụ thể
const handleSpecificMembership = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  for (const membershipInfo of gymData.membership) {
    if (lowerMessage.includes(membershipInfo.type.toLowerCase())) {
      return `Gói ${membershipInfo.type} có giá ${membershipInfo.price}. Quyền lợi: ${membershipInfo.benefits}.`;
    }
  }
  
  return null;
};

// Xử lý chi tiết cho huấn luyện viên cụ thể
const handleSpecificTrainer = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  for (const trainerInfo of gymData.trainers) {
    if (lowerMessage.includes(trainerInfo.name.toLowerCase())) {
      return `${trainerInfo.name} là huấn luyện viên chuyên về ${trainerInfo.specialty} với ${trainerInfo.experience} kinh nghiệm. Bạn có thể đặt lịch tập cùng ${trainerInfo.name.split(' ').pop()} qua số điện thoại ${gymData.contact.phone}.`;
    }
  }
  
  return null;
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Xử lý tin nhắn và tạo phản hồi
    let response = '';
    
    // Kiểm tra các trường hợp đặc biệt trước
    const specificClassResponse = handleSpecificClass(message);
    if (specificClassResponse) {
      response = specificClassResponse;
    } else {
      const specificMembershipResponse = handleSpecificMembership(message);
      if (specificMembershipResponse) {
        response = specificMembershipResponse;
      } else {
        const specificTrainerResponse = handleSpecificTrainer(message);
        if (specificTrainerResponse) {
          response = specificTrainerResponse;
        } else {
          // Xác định loại câu hỏi dựa trên từ khóa
          const questionType = determineQuestionType(message);
          
          // Lấy câu trả lời phù hợp
          response = getRandomResponse(faqResponses[questionType]);
        }
      }
    }
    
    // Trì hoãn phản hồi để tạo cảm giác tự nhiên
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xử lý tin nhắn của bạn.' },
      { status: 500 }
    );
  }
} 
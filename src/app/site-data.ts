/**
 * ALL WEBSITE CONTENT LIVES HERE.
 * Edit this file to change text, add students, papers or videos —
 * no other code needs to change.
 *
 * Images:  put them in  public/images/...   and reference as 'images/...'
 * Papers:  put PDFs in  public/papers/...   and reference as 'papers/...'
 */

export const CONTACT = {
  email: 'devendraswain@gmail.com',
  whatsapp: '919839875454',          // country code + number, no "+" or spaces
  whatsappDisplay: '+91 98398 75454',
  whatsappMessage: 'Hello Alpha Classes, I would like to know more about your home tuition.',
};

export const OWNER = {
  name: 'Mr. Debendra Kumar Swain',
  title: 'Founder & Head Teacher, Alpha Classes',
  photo: 'images/founder.jpg',
  quote: 'A student who understands the “why” never has to memorise the “how”.',  // TODO: his own words
  bio: [
    'Mr. Debendra Kumar Swain founded Alpha Classes with one simple belief: every student can excel when concepts are taught clearly and patiently, one doubt at a time.',
    'Over the years he has guided students through board examinations and competitive entrance tests, focusing on strong fundamentals, regular practice and personal attention that a crowded classroom cannot offer.',
  ],
  // TODO: confirm the degree names
  qualifications: [
    { degree: 'M.Sc. — Mathematics', institute: 'Kanpur University' },
    { degree: 'B.Ed.', institute: 'Kanpur University' },
    { degree: 'B.Sc. — Mathematics (Hons.)', institute: 'Kanpur University' },
  ],
  // TODO: replace with real numbers
  stats: [
    { value: '20+', label: 'Years teaching' },
    { value: '1000+', label: 'Students guided' },
    { value: '95%', label: 'Board results above 85%' },
  ],
};

export const ABOUT_CLASSES = {
  headline: 'Coaching Classes & Home Tuition Provider',   // bold line under the big "Alpha Classes" in the hero
  tagline: 'Home tuition that builds understanding, not just marks.',
  // Words typed one after another in the hero ("Expert coaching in …")
  rotatingWords: ['Mathematics', 'Physics', 'Chemistry', 'Board exams', 'Entrance exams'],
  points: [
    { icon: '👥', title: 'Small batches', text: 'Personal attention for every student, at home or in small groups.' },
    { icon: '💡', title: 'Concept first', text: 'Clear explanations followed by graded practice and regular tests.' },
    { icon: '📈', title: 'Progress tracking', text: 'Monthly tests and feedback shared with parents.' },
    { icon: '🧭', title: 'Exam strategy', text: 'Time management, paper-solving technique and revision plans before every exam.' },
  ],
  subjects: ['Mathematics', 'Physics', 'Chemistry', 'Science (Class 6–10)', 'Board exam preparation', 'Entrance exam foundation'],
};

export interface Student {
  name: string;
  photo: string;          // e.g. 'images/students/priya.jpg' — falls back to initials if missing
  achievement: string;
  exam: string;           // shown on the badge, e.g. 'ISC · XII'
  school: string;
  year?: string;
  currently?: string;     // what they are doing now — card back shows the school until this is filled in
}

// The first four also appear in the hero section.
// TODO: add `year` and `currently` for each student when known
export const HALL_OF_FAME: Student[] = [
  // ISC — Class XII
  { name: 'Isha Gera', photo: 'images/students/isha-gera.jpg', achievement: '96% in ISC Class XII · Kanpur Topper with 97.6% earlier', exam: 'ISC · XII', school: 'Jaipuria School' },
  { name: 'Riya Naval', photo: 'images/students/riya-naval.jpg', achievement: '93% in ISC Class XII · 94.4% earlier', exam: 'ISC · XII', school: 'Mercy Memorial School' },
  { name: 'Zainab Moiz', photo: 'images/students/zainab-moiz.jpg', achievement: '91% in ISC Class XII · 92.6% earlier', exam: 'ISC · XII', school: 'Jaipuria School' },
  { name: 'Rishi Singh', photo: 'images/students/rishi-singh.jpg', achievement: '90% in ISC Class XII', exam: 'ISC · XII', school: 'Mercy Memorial School' },

  // ICSE — Class X
  { name: 'Utkersh Dixit', photo: 'images/students/utkersh-dixit.jpg', achievement: '96% in ICSE Class X', exam: 'ICSE · X', school: 'Jaipuria School' },
  { name: 'Anmol Bansal', photo: 'images/students/anmol-bansal.jpg', achievement: '96% in ICSE Class X', exam: 'ICSE · X', school: 'Jaipuria School' },
  { name: 'Saksham Agarwal', photo: 'images/students/saksham-agarwal.jpg', achievement: '95% in ICSE Class X', exam: 'ICSE · X', school: 'Jaipuria School' },
  { name: 'Umang Goel', photo: 'images/students/umang-goel.jpg', achievement: '95% in ICSE Class X', exam: 'ICSE · X', school: 'Dr. V.S.E.C., Kidwai Nagar' },
  { name: 'Bharti Tandon', photo: 'images/students/bharti-tandon.jpg', achievement: '94% in ICSE Class X', exam: 'ICSE · X', school: 'Jaipuria School' },

  // CBSE — Class X
  { name: 'Ashok Arora', photo: 'images/students/ashok-arora.jpg', achievement: 'CGPA 10 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },
  { name: 'Aakash Sharma', photo: 'images/students/aakash-sharma.jpg', achievement: 'CGPA 10 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },
  { name: 'Satakshi Shukla', photo: 'images/students/satakshi-shukla.jpg', achievement: 'CGPA 9.6 in CBSE Class X', exam: 'CBSE · X', school: 'DPS Kalyanpur' },
  { name: 'Versha Nigam', photo: 'images/students/versha-nigam.jpg', achievement: 'CGPA 9.6 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },
  { name: 'Kripanshu Yadav', photo: 'images/students/kripanshu-yadav.jpg', achievement: 'CGPA 9.6 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },
  { name: 'Shruti Sharma', photo: 'images/students/shruti-sharma.jpg', achievement: 'CGPA 9.6 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },
  { name: 'Anshit Arora', photo: 'images/students/anshit-arora.jpg', achievement: 'CGPA 9.2 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },
  { name: 'Raghav Agarwal', photo: 'images/students/raghav-agarwal.jpg', achievement: 'CGPA 9.0 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },
  { name: 'Aman Kumar', photo: 'images/students/aman-kumar.jpg', achievement: 'CGPA 8.4 in CBSE Class X', exam: 'CBSE · X', school: 'Puranchand School' },

  // Earlier toppers
  { name: 'Srijan Khare', photo: 'images/students/srijan-khare.jpg', achievement: '96.8% in Boards', exam: 'Boards', school: 'Jaipuria School', year: '2009' },
  { name: 'Rohan Gandhi', photo: 'images/students/rohan-gandhi.jpg', achievement: '96.7% in Boards', exam: 'Boards', school: 'Puranchandra School' },
  { name: 'Yashveer Singh', photo: 'images/students/yashveer-singh.jpg', achievement: '94.6% in Boards', exam: 'Boards', school: 'Mercy Memorial School', year: '2008' },
  { name: 'Hemant Tandon', photo: 'images/students/hemant-tandon.jpg', achievement: '93.6% in Boards', exam: 'Boards', school: 'Jaipuria School', year: '2007' },
  { name: 'Shraddha Sureka', photo: 'images/students/shraddha-sureka.jpg', achievement: '92% in Boards', exam: 'Boards', school: 'Jaipuria School' },
  { name: 'Surabhi Tandon', photo: 'images/students/surabhi-tandon.jpg', achievement: '91.6% in Boards', exam: 'Boards', school: 'Jaipuria School' },
  { name: 'Ashwin Bajpai', photo: 'images/students/ashwin-bajpai.jpg', achievement: '91% in Boards', exam: 'Boards', school: 'Jaipuria School', year: '2007' },
  { name: 'Vaswee Dubey', photo: 'images/students/vaswee-dubey.jpg', achievement: '90% in Boards', exam: 'Boards', school: 'Methodist School' },
];

export interface Paper {
  title: string;
  subject: string;
  classLevel: string;
  file: string;           // path inside /public
}

export const DEMO_PAPERS: Paper[] = [
  { title: 'Algebra & Linear Equations — Practice Test', subject: 'Mathematics', classLevel: 'Class 10', file: 'papers/sample-maths-class10.pdf' },
  { title: 'Motion & Laws of Motion — Unit Test', subject: 'Physics', classLevel: 'Class 9', file: 'papers/sample-physics-class9.pdf' },
  { title: 'Calculus — Mock Board Paper', subject: 'Mathematics', classLevel: 'Class 12', file: 'papers/sample-maths-class12.pdf' },
];

export interface Video {
  title: string;
  topic: string;
  youtubeId: string;      // the part after "watch?v=" in a YouTube link. Leave '' until uploaded.
}

export const DEMO_VIDEOS: Video[] = [
  { title: 'Quadratic Equations in 15 minutes', topic: 'Mathematics · Class 10', youtubeId: '' },
  { title: 'Newton’s Laws with everyday examples', topic: 'Physics · Class 9', youtubeId: '' },
  { title: 'Integration by parts — solved examples', topic: 'Mathematics · Class 12', youtubeId: '' },
];

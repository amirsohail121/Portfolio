import chatApp from "../assets/chat-app/cover.png";
import airbnb from "../assets/airbnb/cover.png";
import food from "../assets/food/cover.png";

export const projects = [
  {
    id: 1,
    title: "Full-Stack Real-Time Chat Application",
    tag: "MERN Stack + Socket.io",
    description:
      "Production-grade one-to-one and group messaging platform with real-time delivery via Socket.io WebSockets. Implemented end-to-end encryption (RSA-2048 + AES-256-GCM), passwordless OTP authentication, encrypted file sharing, and real-time UX features like typing indicators and read receipts.",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
      "Cloudinary",
      "Framer Motion",
    ],
    github: "https://github.com/amirsohail121/realtime-chat-app",
    live: "https://chatwave-frontend-eight.vercel.app/",
    image: chatApp,
    featured: true,
  },
  {
    id: 2,
    title: "Airbnb Clone",
    tag: "Full Stack",
    description:
      "Full-stack rental platform with role-based authentication (Admin / Host / User), REST APIs for listings, bookings, and user management, secure login with Bcrypt, and a responsive UI for mobile and desktop.",
    stack: ["HTML", "CSS", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/amirsohail121/airbnb",
    live: "https://airbnbclone-sng4.onrender.com/",
    image: airbnb,
    featured: false,
  },
  {
    id: 3,
    title: "Food Website",
    tag: "Frontend",
    description:
      "Fully responsive frontend food website with JavaScript-based menu filtering and form handling. Focused on performance and accessibility using semantic HTML and optimized CSS.",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    github: "https://github.com/amirsohail121/tasty",
    live: null,
    image: food,
    featured: false,
  },
];

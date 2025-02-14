export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently upskilling by building projects",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "PetPatchers",
    des: "A pet care and adoption platform with service booking, payments, authentication, and donation campaigns for pet welfare.",
    img: "/p1.jpg",
    iconLists: ["/re.svg", "/ex.jpg", "/postgre.jpg", "/aws.jpg"],
    //link: "/ui.earth.com",
  },
  {
    id: 2,
    title: "Vibe - Video Conferencing App",
    des: "Seamlessly connect with friends and family. Vibe is a dynamic social media platform where users can post, like, share, and discover content.",
    img: "/p2.jpg",
    iconLists: ["/re.svg", "/js.jpg", "/ex.jpg", "/mysql.jpg"],
    //link: "/ui.yoom.com",
  },
  {
    id: 3,
    title: "Kids Playbook",
    des: "Fun and interactive app for kindergarten and elementary kids, featuring alphabet pronunciation, poems, and sketch drawing to enhance learning and creativity.",
    img: "/p3.jpg",
    iconLists: ["/re.svg","/js.jpg", "/postgre.jpg", "/aws.jpg"],
    //link: "/ui.aiimg.com",
  },
  {
    id: 4,
    title: "News App",
    des: "Smart app that delivers headlines, category-based news, search functionality, and text-to-speech for seamless news consumption.",
    img: "/p4.jpg",
    iconLists: ["/re.svg", "/ts.svg", "/rest.jpg"],
    //link: "/ui.apple.com",
  },
];

export const skills = {
  frontend: [
    { name: "React", img: "/fe1.jpg" },
    { name: "Next.js", img: "/fe2.jpg" },
    { name: "Tailwind CSS", img: "/fe3.jpg" },
    { name: "TypeScript", img: "/fe4.jpg" },
    
  ],
  backend: [
    { name: "Python", img: "/be1.jpg" },
    { name: "Java", img: "/be2.jpg" },
    { name: "Node.js", img: "/be3.jpg" },
    { name: "Express.js", img: "/be4.jpg" },
  ],
  database: [
    { name: "PostgreSQL", img: "/db1.jpg" },
    { name: "MySQL", img: "/db2.jpg" },
    { name: "MongoDB", img: "/db3.jpg" },
    
  ],
  cloudcomputing: [
    { name: "AWS", img: "/cc1.jpg" },
    { name: "Azure", img: "/cc2.jpg" },
    
  ],
};



export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];


export const workExperience = [
  {
    id: 1,
    title: "Freelance App Dev Project",
    desc: "Assisted in the development of a web-based platform as a Full Stack Developer.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 2,
    title: "Mobile App Dev",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp4.svg",
  },
  
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];

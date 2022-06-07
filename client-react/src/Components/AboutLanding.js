import React from 'react'
import Features from './Features'
import LandingEnding from './LandingEnding'
import PagePreview from './PagePreview'

function AboutLanding( {match} ) {
    return (
        <div>
            <PagePreview attr={{
                header: "Inspiration Behind TalentFlex.",
                text: "TalentFlex was initially developed as a student project\
                for sharpening web developement skills. This project involves the use of react, databases, routing, and of course dynamic interaction among users and between the\
                user and the site itself. The webapp aims to target the essentials of web developement in an enviroment\
                that could actually be beneficial. TalentFlex will never fail to amaze you.",
                activeLink: "About"
            }} />
            <div style={{textAlign: "center", marginTop: "50px"}} className="used-tech-wrap">
                <h1 className="discover-header heavy large white" data-aos="fade-up" duration="500" data-aos-mirror="false">Technologies Used: </h1>
            </div>
            <Features attr={{
                title1: "React",
                text1:"React is a free and open-source front-end JavaScript library for building user interfaces or UI components.\
                React can be used as a base in the development of single-page or mobile applications.",
                img1: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582103/TalentFlex_Static/Technologies_Logos/react_logo_z8jxzy.png",
                title2: "Flask",
                text2:"Flask is an API of Python that allows us to build up web-applications. It was developed by Armin Ronacher. Flask's framework is more explicit than Django's\
                framework and is also easier to learn because it has less base code to implement a simple web-Application.",
                img2: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582103/TalentFlex_Static/Technologies_Logos/flask_logo_juezv8.png",
                title3: "Firebase",
                text3: "Firebase is a development platform known originally for its realtime database that’s still at its core a multi-node, key-value database optimized for synchronizing data, often between user machines or smartphones and centralized storage in the cloud.",
                img3: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582103/TalentFlex_Static/Technologies_Logos/firebase_gvrfrt.png",
            }} />
            <Features attr={{
                title1: "Javascript",
                text1: "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.",
                img1: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582103/TalentFlex_Static/Technologies_Logos/js_logo_k1kcms.png",
                title2: "Python",
                text2: "Python is an interpreted high-level general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation. Python is used for web development, AI, machine learning, operating systems, mobile application development, and video games.",
                img2: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582103/TalentFlex_Static/Technologies_Logos/python_logo_dxrquy.png",
                title3: "PostgreSQL",
                text3:"PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. The origins of PostgreSQL date back to 1986 as part of the POSTGRES project at the University of California at Berkeley and has more than 30 years of active development on the core platform.",
                img3: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1641759993/TalentFlex_Static/Technologies_Logos/584815fdcef1014c0b5e497a_1_lnn0cc.png",
            }} />
            <Features attr={{
                title1: "Cloudinary",
                text1: "Cloudinary is a SaaS technology company headquartered in Santa Clara, California, with offices in Israel, England, Poland, and Singapore. The company provides a cloud-based image and video management services. It enables users to upload, store, manage, manipulate, and deliver images and video for websites and apps.",
                img1: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1641993466/TalentFlex_Static/Technologies_Logos/cloudinary_megqgg.png",
                title2: "HTML & CSS",
                text2: "HTML (the Hypertext Markup Language) and CSS (Cascading Style Sheets) are two of the core technologies for building Web pages. HTML provides the structure of the page, CSS the (visual and aural) layout, for a variety of devices. Along with graphics and scripting, HTML and CSS are the basis of building Web pages and Web Applications.",
                img2: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1637582103/TalentFlex_Static/Technologies_Logos/html_css_logo_kfun7u.png",
                title3: "Heroku",
                text3: "Heroku is a cloud platform as a service supporting several programming languages. One of the first cloud platforms, Heroku has been in development since June 2007, when it supported only the Ruby programming language, but now supports Java, Node.js, Scala, Clojure, Python, PHP, and Go",
                img3: "https://res.cloudinary.com/dhcl5t8to/image/upload/v1641760655/TalentFlex_Static/Technologies_Logos/Webp.net-resizeimage_2_kwpxt1.png" 

            }} />
            <LandingEnding />
        </div>
    )
}

export default AboutLanding
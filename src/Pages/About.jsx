import React from 'react'
import '../Styles/About.css'
import teamimg from '../assets/TeamSVG.svg'

const About = () => {
  return (
    <section id='about_sec'>
    <div id='about_sec1'>
      <div id='abt_sec1_cont_div'>
        <p className='abt_ttl pp1'>Who Are We?</p>
        <p className='pp2'>We are a trusted platform dedicated to providing verifiable proof of first use for your important documents. Our advanced technology ensures authenticity and security, giving you peace of mind in your legal and intellectual property endeavors</p>
      </div>
      <div id='abt_sec1_img_div'>
        <img src={teamimg} alt="" />
      </div>
    </div>
    <div id='about_sec2'>
    <p className='abt_ttl ps1'>Aim</p>
    <p className='aim_cnt'>
    Our aim is to empower individuals and businesses by offering a reliable and efficient solution for proving the first use of their documents, enhancing trust and credibility in legal and intellectual property matters
    </p>
    </div>
    <div id='about_sec3'>
    <p className='abt_ttl ps2'>About team</p>
    <p className='team_cnt'>
    Our team comprises skilled professionals including Soaham, Darshan, Aditya, and Rahul, bringing diverse expertise to ensure top-notch service delivery. With a shared passion for innovation and excellence, we collaborate seamlessly to fulfill our mission of providing unparalleled proof of first use services
    </p>
    </div>
    <p id='about_sec4'>
      <p id='cont_us_div'>
        Contact Us : <span >unchainedip@gmail.com</span>
      </p>
      <a href="http://google.com">Feedback</a>
    </p>
    </section>
  )
}

export default About
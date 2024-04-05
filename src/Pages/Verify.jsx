import React from 'react'
import '../Styles/Verify.css';
import Modal from '../Components/Modal/Modal';
import { useState } from 'react';
import axios from 'axios';
import { Ips } from './Ipdata';

const Verify = () => {
  const [showModal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null)
  const [valid, setValid] = useState(true);
  const [isverified, setIsVerified] = useState(false);
  // let modalData;
  const validSubmit = async (event) => {
    event.preventDefault()
    const docid = event.target.docid.value;


    //validate docid
    //set isverified
  
    const res=await axios.get(`/user/read${event.target.doctype.value}?id=${docid}`)
    // .then((res) => {
      
      // modalData=data;
     
      // console.log("data",res.data.record)
      if(res){
        const data=res.data.record;
        setModalData(data)
        console.log("veridata",modalData)
      }
      else{
        setValid(false)
      }
      console.log("modaldata",modalData)
  // })
  // .catch(() => {
  //   setValid(false)
  //     alert('something went wrong')
  // })
  // console.log("modaldata",modalData)


    // # TODO : data is in result object 
    // console.log(result);

    if (docid === "") {
      setValid(false)
    }
    else {
      setValid(true)
      setModal(true);
    }

    // (result) ? setModalData(result) : setValid(false);
    // setModalData(Ips[0])
  }
  console.log("modaldata",modalData)
  return (
    <>
      <section id='verify_sec'>
        <div id='verify_main_div'>
          <p id='verify_title'>Verify Document</p>
          <form action="" onSubmit={validSubmit}>
            <div id='verify_id_div'>
              <input type="text" placeholder='Enter Document Type' name='doctype' />
            </div>
            <div id='verify_id_div'>
              <input type="text" placeholder='Enter Document ID' name='docid' />
            </div>
            {
              !valid &&
              <p id='valid_verify'>
                Enter Valid ID
              </p>

            }
            <div id='verify_sub_div'>
              <button >
                Submit
              </button>
            </div>

          </form>
        </div>
      </section>
      {
        modalData &&
        <Modal modalData={modalData} setModal={setModal} isverified={true} setIsVerified={setIsVerified} />
      }
    </>

  )
}

export default Verify
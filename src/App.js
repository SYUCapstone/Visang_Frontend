import React, { useState } from 'react';
import './App.css';
import { FaPhoneAlt } from 'react-icons/fa';
import Modal from 'react-modal' ;
import Emergency from './Emergency';
import Hospital from './Hospital';

const customStyles = {
  content: {
    top: '50%' ,
    left: '50%' ,
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showEmergency, setShowEmergency] = useState(true);

  // 모달 열기
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };


  // 119 버튼 핸들러
  const handleEmergencyCall = () => {
    alert('119로 전화합니다!');
    window.location.href = 'tel:119';
  };

  // 병원 전화번호 핸들러
  const handleHospitalCall = (phoneNumber) => {
    alert(`${phoneNumber}로 전화합니다!`);
    window.location.href = `tel:${phoneNumber}`;
  };


  return (
    <div className="app-container">
      {/* 상단 바 */}
      <div className="header-bar">
        <div className="logo-container">
          <img src="path" alt="logo" className="logo-image" />
          <span className="header-text">응급실 정보 제공 서비스</span>
        </div>
        <div className="call-container">
          <button className="header-button" onClick={handleEmergencyCall}>
            <FaPhoneAlt /> 119
          </button>
        </div>
      </div>

      {/* 지도*/}
      <div className="map-container">
        <span className="current-status">
          현재 표시중 : {showEmergency ? '응급실' : '입원실'}
        </span>

        {showEmergency ? (
        <Emergency openModal={openModal} />
      ) : (
        <Hospital openModal={openModal} />
      )}
      </div>

      {/* 병원 정보 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="병원 정보"
      >

        <h2>{modalContent}</h2>
        <div><h4>병원주소</h4></div>
        <div>가능여부</div>
        <button onClick={() => handleHospitalCall('010-1234-5678')}>병원 전화 연결</button>
      </Modal>


      {/* 하단 버튼들 */}
      <div className="bottom-bar">
        <button className="category-button">Cat 1</button>
        <button className="category-button">Cat 2</button>
        <button className={`hospital-button ${showEmergency ? 'emergency' : 'hospital'}`}
        onClick={() => setShowEmergency((prev) => !(prev))}>
          {showEmergency ? '응급실' : '입원실'}</button>
        <button className="category-button selected">선택중</button>
        <button className="category-button">Cat 4</button>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import { FaPhoneAlt } from 'react-icons/fa';
import Modal from 'react-modal' ;
import Emergency from './Emergency';
import Hospital from './Hospital';
import logo from './img/Logo.png';

// Modal Style
const customStyles = { 
  content: {
    top: '50%' ,
    left: '50%' ,
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',  
    transform: 'translate(-50%, -50%)',
    borderRadius: '25 px',
  },
};

//Modal에 대한 집중모드 설정
Modal.setAppElement('#root');

function App() {
//useState 상태값 설정
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 오픈 여부
  const [modalContent, setModalContent] = useState(null); //모달 내용물
  const [showEmergency, setShowEmergency] = useState(true); //응급실, 입원실 표시상태
  const [selectedCategory, setSelectedCategory] = useState(null); //카테고리 선택
  const [hospitalData, setHospitalData] = useState({
    adress: '',
    hours: '',
    availability: []
  }); //병원 데이터 

  // Modal Open Function
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Modal Close Function
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  //react tel: 과 href 를 이용해서 전화 연결
  // 119 Call Button Handler
  const handleEmergencyCall = () => {
    alert('119로 전화합니다!');
    window.location.href = 'tel:119';
  };

  // Hospital Call Button Handler
  const handleHospitalCall = (phoneNumber) => {
    alert(`${phoneNumber}로 전화합니다!`);
    window.location.href = `tel:${phoneNumber}`;
  };

//Category Button Selection Handler
const handleCategoryClick = (index) => {
setSelectedCategory(index);
};

useEffect(() => {
    fetch('/api/hospitalData.json')
    .then(response => response.json())
    .then(data => setHospitalData(data))
    .catch(error => console.error('Error fetching hospital data:', error));
  }
,[]);

//Application Rendering
  return (
    <div className="app-container">
      {/* 상단 바 */}
      <div className={`header-bar ${showEmergency ? 'emergency' : 'hospital'}`}>
        {/* 삼항 조건 연산자를 이용하여 현재 상태에 따른 CSS Class 변경*/}
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo-image" />
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

{/* Map Pin Component 호출 , showEmegency State에 따라 응급실 ,병원을 구분하여 호출*/}
        {showEmergency ? (
        <Emergency openModal={openModal} />
      ) : (
        <Hospital openModal={openModal} />
      )}
      </div>

      {/* 병원 정보 모달  Frame*/}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="병원 정보"
      >

        <h2>{modalContent}</h2>
        <div className="Modal">{hospitalData.address}</div>
        <div className="Modal">진료 시간 : {hospitalData.hours}</div>
        <div className="ModalContainer">
          {hospitalData.availability.map((item, index) => (
            <React.Fragment key={index}>
          <div className="ContainerCell">{item.label} :</div>
          <div className="ContainerCell">{item.status}</div>
          </React.Fragment>
          ))}
          </div>
        <button onClick={() => handleHospitalCall('010-1234-5678')}>병원 전화 연결</button>
      </Modal>

      {/* 하단 버튼들 */}
      <div className="bottom-bar">
        <button 
        className={`category-button ${selectedCategory === 1 ? 'selected' : showEmergency ? 'emergency' : 'hospital'}`}
        onClick={() => handleCategoryClick(1)}>
          {/* 삼항 조건 연산자를 중첩 사용하여 응급실, 병원 css class 속성 선적용 후 selected state index 에따라 색 추가변경*/}
        CT
        </button>
        <button 
        className={`category-button ${selectedCategory === 2 ? 'selected' : showEmergency ? 'emergency' : 'hospital'}`}
        onClick={() => handleCategoryClick(2)}> 
        MRI
        </button>
        <button className={`hospital-button ${showEmergency ? 'emergency' : 'hospital'}`}
        onClick={() => setShowEmergency((prev) => !(prev))}>
          {showEmergency ? '응급실' : '입원실'}</button>
          {/* prev = 현재상태 !prev = 현재상태의 반전 -> prev 에서 반전상태로 변경. 예시 : true 일 경우 false로 변경*/}
        <button className={`category-button ${selectedCategory === 3 ? 'selected' : showEmergency ? 'emergency' : 'hospital'}`}
        onClick = {() => handleCategoryClick(3)}>
        소아과
        </button>
        <button 
        className={`category-button ${selectedCategory === 4 ? 'selected' : showEmergency ? 'emergency' : 'hospital'}`}
        onClick={()=> handleCategoryClick(4)}>
          인큐베이터
        </button>
      </div>
    </div>
  );
}

export default App;

// 값의 범위를 다른 범위로 매핑하는 함수
const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };
  
  // 값을 주어진 범위 내로 제한하는 함수
  const clamp = (min, max, value) => {
    return Math.min(Math.max(value, min), max);
  };
  
  // 마우스 움직임에 따라 CSS 변수 업데이트
  const UPDATE = ({ x, y }) => {
    document.documentElement.style.setProperty('--x', mapRange(x, 0, window.innerWidth, -1, 1));
    document.documentElement.style.setProperty('--y', mapRange(y, 0, window.innerHeight, -1, 1));
  };
  
  // 마우스 이벤트 리스너 등록
  window.addEventListener('mousemove', UPDATE);
  
  // 디바이스 방향에 따라 CSS 변수 업데이트
  const handleOrientation = ({ beta, gamma }) => {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    const x = isLandscape ? mapRange(beta, -45, 45, -1, 1) : mapRange(gamma, 45, -45, -1, 1);
    const y = isLandscape ? mapRange(Math.abs(gamma), 20, 70, 1, 1) : mapRange(beta, 20, 70, 1, -1);
    document.documentElement.style.setProperty('--x', clamp(-1, 1, x));
    document.documentElement.style.setProperty('--y', clamp(-1, 1, y));
  };
  
  // 디바이스 방향 이벤트 시작 함수
  const START = () => {
    if (DeviceOrientationEvent?.requestPermission) {
      DeviceOrientationEvent.requestPermission().then((result) => {
        if (result === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };
  
  // 클릭 이벤트로 디바이스 방향 감지 시작
  document.body.addEventListener('click', START, { once: true });
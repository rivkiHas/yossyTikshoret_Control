const customMarkerIcon2 = {
    position: 'absolute',
    left: '135.168px',
    top: '133.716px',
    borderRadius: '73px',
    background: 'rgba(248, 189, 0, 0.20)',
    backdropFilter: 'blur(5.9px)',
    width: '73px',  // אורך ורוחב הדיב הראשי
    height: '73px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',  // לוודא שה-SVG לא ייצא מגבולות הדיב
  };
  
  const customSVGs = {
    svg1: {
      width: '56.851px',
      height: '56.851px',
      position: 'absolute',  // למקם את ה-SVG הראשון בתוך הדיב
    },
    svg2: {
      width: '19px',
      height: '19px',
      position: 'absolute',  // למקם את ה-SVG השני בתוך הדיב
      zIndex: 1,  // לוודא שהוא מעל ה-SVG הראשון
    }
  };
  
  const CustomMarker = () => (
    <div style={customMarkerIcon2}>
      <svg xmlns="http://www.w3.org/2000/svg" style={customSVGs.svg1} viewBox="0 0 58 58" fill="none">
        <path d="M46.934 25.5881C46.934 42.5059 29.1682 52.2368 29.1682 52.2368C29.1682 52.2368 11.4023 42.5059 11.4023 25.5881C11.4023 20.8763 13.2741 16.3575 16.6058 13.0258C19.9376 9.69401 24.4564 7.82227 29.1682 7.82227C33.8799 7.82227 38.3987 9.69401 41.7305 13.0258C45.0622 16.3575 46.934 20.8763 46.934 25.5881Z" stroke="white" strokeWidth="2.36877" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" style={customSVGs.svg2} viewBox="0 0 19 19" fill="none">
        <path d="M16.2742 9.40369C16.2742 11.2884 15.5255 13.0959 14.1928 14.4286C12.8601 15.7613 11.0526 16.51 9.16785 16.51C7.28313 16.51 5.47561 15.7613 4.14292 14.4286C2.81022 13.0959 2.06152 11.2884 2.06152 9.40369C2.06152 7.51897 2.81022 5.71145 4.14292 4.37876C5.47561 3.04606 7.28313 2.29736 9.16785 2.29736C11.0526 2.29736 12.8601 3.04606 14.1928 4.37876C15.5255 5.71145 16.2742 7.51897 16.2742 9.40369Z" stroke="white" strokeWidth="3.55316" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
  
  export default CustomMarker;
  
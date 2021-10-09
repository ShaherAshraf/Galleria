import spinner from '../../assets/images/spinner.svg';

/**
 * @component
 * @name Skeleton
 * @description Shows skeleton shapes that replace elements while loading.
 * @param {object} props
 * @param {string} props.type - The desired skeleton shape.
 * @returns {object} - HTML element simulates the loading state.
 */
const Skeleton = ({ type }) => {
  switch (type) {
    case 'spinner':
      return <img src={spinner} style={{ width: `3rem`, margin: `0 auto` }} alt='' />;
    case 'title':
      return <div style={{ width: `500px`, padding: '15px', backgroundColor: '#7a7a7a', opacity: 0.1 }}></div>;
    default:
      return null;
  }
};
export default Skeleton;

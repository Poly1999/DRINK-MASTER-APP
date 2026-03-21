import './Paginator.css';
import vectorLeft from '../../assets/vectorLeft.png';
import vectorRight from '../../assets/vectorRight.png';

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 0) return null;

  // Показуємо максимум 8 сторінок
  const getPages = () => {
    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let start = Math.max(1, currentPage - 3);
    let end = start + 7;
    if (end > totalPages) {
      end = totalPages;
      start = end - 7;
    }
    return Array.from({ length: 8 }, (_, i) => start + i);
  };

  const pages = getPages();

  return (
    <div className='paginator'>
      <button
        className='paginator-arrow'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={vectorLeft} alt='prev' />
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`paginator-page ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className='paginator-arrow'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={vectorRight} alt='next' />
      </button>
    </div>
  );
};

export default Paginator;

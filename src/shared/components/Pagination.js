import { useSearchParams, useLocation, Link } from "react-router-dom";
const Pagination = ({ pages }) => {
  //  Tính toán các thông số đầu vào cần thiết cho giai thuật phân trang
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { total, limit, currentPage, hasNext, hasPrev, prev, next } = pages;
  const totalPages = Math.ceil(total / limit);

  // Tạo ra cấu trúc URL để người dùng có thể click vào trang kết quả cần xem
  const formatUrl = (page) => {
    return `${pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
  };
  
  

  //  Tạo ra một mảng các trang theo cấu trúc 1 ... 8 9 (trang hiện hành) 11 12 ... trang cuối
  function renderPagesHTML(delta = 2) {
    const pagesHtml = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === currentPage ||
        i === totalPages ||
        (i >= left && i <= right)
      ) {
        pagesHtml.push(i);
      }
    }
    return pagesHtml;
  }

  //  Tạo ra danh sách phân trang ở bước trước đó có kết hợp giao diện HTML kèm kiểm tra trạng thái trang đầu, cuối
  return (
    <ul className="pagination">
      {currentPage > 1 ? (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(prev)}>
            Trang trước
          </Link>
        </li>
      ) : null}

      {renderPagesHTML().map((page, index) => (
        <li className={`page-item ${page === currentPage && "active"}`}>
          <Link className="page-link" to={formatUrl(page)}>
            {page}
          </Link>
        </li>
      ))}

      {currentPage < totalPages ? (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(next)}>
            Trang sau
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

export default Pagination;

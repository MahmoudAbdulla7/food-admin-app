import React from 'react'

export default function Pagination({getList,searchValue,numberOfPages}) {
  return (
    <div className="d-flex justify-content-center">
    <nav className=" me-5" aria-label="Page navigation example">
      <ul className="pagination">
        {numberOfPages.map((i) => (
          <li onClick={() => getList({pageNumber:i,name:searchValue})} key={i} className="page-item">
            <p className="page-link" href="#">
              {i}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  </div>
  )
}

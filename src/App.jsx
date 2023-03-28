import "./App.css";
import React, { useState, useEffect } from "react";
import f from "./data/data.json";
import ReactPaginate from "react-paginate";

function App() {
  const [items, setItem] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [currentItemPage, setCurrentItemPage] = useState(1);
  const postItemPerPage = 30;

  const rgx = new RegExp(/^\d{0,}.\d/gi);
  const regex = /[a-z]/g;

  useEffect(() => {
    setItem(f.data);
    setSearchItem(f.data);
  }, []);

  const lastPostIndex = currentItemPage * postItemPerPage;
  const firstPostIndex = lastPostIndex - postItemPerPage;
  const currentPosts = items.slice(firstPostIndex, lastPostIndex);

  const totalPosts = Math.ceil(items.length / postItemPerPage);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setItem(searchItem);
    } else if (rgx.test(e.target.value)) {
      const filterResult = searchItem.filter((item) =>
        item.ISSN.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setItem(filterResult);
    } else if (regex.test(e.target.value)) {
      const filterResult = searchItem.filter((item) =>
        item["Başlık"].toLowerCase().includes(e.target.value.toLowerCase())
      );
      setItem(filterResult);
    }
    setFilterItem(e.target.value);
  };

  const handlePageClick = (data) => {
    setCurrentItemPage(data.selected + 1);
  };

  return (
    <div>
      <div className="input-group">
        <div className="form-outline ">
          <input
            type="search"
            value={filterItem}
            onInput={(e) => handleFilter(e)}
            className={"form-control justify-content-center"}
            placeholder="Search"
          />
        </div>
      </div>
      <br />
      <table className="table table-hover table-striped table-sm table-responsive-sm table-bordered">
        <thead>
          <tr className={"text-center"}>
            <th scope="col">SNO</th>
            <th scope="col">Başlık</th>
            <th scope="col">Kısa Başlık</th>
            <th scope="col">Ödeme</th>
            <th scope="col">MEP</th>
            <th scope="col">ISSN</th>
            <th scope="col">EISSN</th>
            <th scope="col">AHCI?</th>
            <th scope="col">SOC?</th>
            <th scope="col">SCI</th>
            <th scope="col">Kaynak</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((d) => (
            <tr key={d.Sno} className={"text-center"}>
              <th scope="row">{d.Sno}</th>
              <td>{d["Başlık"]}</td>
              <td>{d["Kısa Başlık"]}</td>
              <td>{d["Ödeme"]}</td>
              <td>{d.MEP}</td>
              <td>{d.ISSN}</td>
              <td>{d.EISSN}</td>
              <td>{d["AHCI?"] ? "✓" : ""}</td>
              <td>{d["SOC?"] ? "✓" : ""}</td>
              <td>{d.SCI ? "✓" : ""}</td>
              <td>{d["Kaynak"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPosts}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        activeLinkClassName={"page-link"}
      />
      <div>Bu sayfa yalnızca bilgilendirme amaçlıdır...</div>
      <div>Detaylı bilgi için: https://cabim.ulakbim.gov.tr/ubyt/</div>
    </div>

  );
}

export default App;

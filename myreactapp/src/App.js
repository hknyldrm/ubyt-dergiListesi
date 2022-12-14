import "./App.css";

import React, { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [items, setItem] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      console.log(d);
      setItem(d);
      setSearchItem(d);
    });
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setItem(searchItem);
    } else {
      const filterResult = searchItem.filter((item) =>
        item.baslik.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setItem(filterResult);
    }
    setFilterItem(e.target.value);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <br />

      <div className="input-group">
        <div className="form-outline">
          <input
            type="search"
            value={filterItem}
            onInput={(e) => handleFilter(e)}
            class="form-control"
            placeholder="Search"
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Başlık</th>
            <th scope="col">Kısa Başlık</th>
            <th scope="col">MEP</th>
            <th scope="col">Ödeme</th>
            <th scope="col">ISSN</th>
            <th scope="col">EISSN</th>
            <th scope="col">AHCI?</th>
            <th scope="col">SOC?</th>
            <th scope="col">SCI</th>
            <th scope="col">q1</th>
            <th scope="col">q2</th>
            <th scope="col">q3</th>
            <th scope="col">q4</th>
            <th scope="col">Yıl</th>
          </tr>
        </thead>
        <tbody>
          {items.slice(0, 30).map((d) => (
            <tr key={d.Sno}>
              <th scope="row">{d.Sno}</th>
              <td>{d.baslik}</td>
              <td>{d.kisa_baslik}</td>
              <td>{d.MEP}</td>
              <td>{d.odeme}</td>
              <td>{d.ISSN}</td>
              <td>{d.EISSN}</td>
              <td>{d.AHCI ? "True" : "False"}</td>
              <td>{d.SOC ? "True" : "False"}</td>
              <td>{d.SCI ? "True" : "False"}</td>
              <td>{d.Q1 ? "True" : "False"}</td>
              <td>{d.Q2 ? "True" : "False"}</td>
              <td>{d.Q3 ? "True" : "False"}</td>
              <td>{d.Q4 ? "True" : "False"}</td>
              <td>{d.yil}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
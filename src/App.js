import React from "react";
import ReactDOM from "react-dom";
import Table from "./Table";
import { Select, MenuItem } from "@material-ui/core";

function App() {
  const [data, setData] = React.useState([])

  const getData = async () =>
    await fetch(`https://anapioficeandfire.com/api/characters?`)
      .then((res) => res.json())
      .then((data) => setData(data))

  React.useEffect(() => {
    getData()
  }, [])

  const comonscol = [
    {
      title: "Name",
      field: "name",
      render: data => { return data.name === "" ? "Name unkown" : data.name + ", " + data.aliases },
      filtering: false
    },
    {
      title: "Born",
      field: "born",
      render: data => { return data.born === "" ? "Yes" : data.born },
      filtering: false
    },
    {
      title: "Died",
      field: "died",
      render: data => { return data.died === " " ? data.died : "Yet to find" },
      filtering: false
    },
    {
      title: "Gender",
      field: "gender",
      render: data => { return data.gender === "" ? "Unkown" : data.gender },
      //lookup: {female: "Female", male: "Male", unkown: "Unkown"},
      editComponent: ({ value, onChange, data }) => (
        <Select
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {data.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </Select>
      )
    },
    {
      title: "Culture", field: "culture",
      render: data => { return data.culture === "" ? "Culture unkown" : data.culture },
      editComponent: ({ term, onRowDataChange, data }) => (
        <Select
          term={term}
          onChange={(event) => {
            onRowDataChange({
              ...data,
              coulture: (event.target.value) ?? "",
              culture: "",
            });
          }}
        >
          {data.map((culture) => (
            <MenuItem key={culture} value={culture}>
              {culture}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      title: "Allegiances",
      field: "allegiances",

      filtering: false
    },
    {
      title: "Books",
      field: "books",
      render: data => { return data.books.length },
      filtering: false
    },


  ];

  return (
    <div className="App">

      <Table
        col={comonscol}
        data={data}
        options={{
          filtering: true,
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import React from "react";
// import fakeData from "../../fakeData";

const Inventory = () => {
  // const product = fakeData[0];
  const handleAddInventory = () => {
    alert("Uncomment Your fetch Portion");
    // console.log("Total Data", fakeData.length);
    // console.log("Data Before Post", product);
    // fetch("http://localhost:4200/Addproduct", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(fakeData) // body data type must match "Content-Type" header
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log("post Successful ", data);
    //   });
  };
  return (
    <div>
      <h1>This page will contain Inventory Information</h1>
      <button onClick={handleAddInventory}>Add Inventory</button>
    </div>
  );
};

export default Inventory;

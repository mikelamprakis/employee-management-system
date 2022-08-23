import React, { useState } from "react";

const ListItem = ({ request, onDropdownSelect }) => {
  const [selectedOption, setSelectedOption ] = useState(request.status);

  console.log(request);

  const handleChange = (e) => {
    e.persist();
    setSelectedOption(e.target.value);
    onDropdownSelect(request.id, e.target.value);
  console.log(e.target.value);
  };

  return (
    <tr key={request.id}>
      <td>{request.id}</td>
      <td>{request.user.username}</td>
      <td>{request.fromDate}</td>
      <td>{request.toDate}</td>
      <td>{request.status}</td>
      <td>
        <div className="form-group">
          <select
            className="form-control"
            id="status"
            name="status"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value={"PENDING_FOR_APPROVAL"}> PENDING FOR APPROVAL </option>
            <option value={"APPROVED"}> APPROVED </option>
            <option value={"REJECTED"}> REJECTED </option>
          </select>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;

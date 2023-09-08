import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

const UserProfile = (props) => {
  const { visible, setVisible, curInfo } = props;
  // const { setVisible, curInfo } = props;
  return (
    <Dialog
      header="Header"
      visible={visible}
      className="p-fluid"
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
    >
      <div className="formgrid grid">
      
        <div className="field col">
          <label htmlFor="lname">Name</label>
          <InputText id="lname" value={curInfo.lname} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <InputText id="email" value={curInfo.email} />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone</label>
        <InputText id="phone" value={curInfo.phone} />
      </div>
    

      <div className="formgrid grid">
       

       
      </div>

      <div className="formgrid grid">
       

     
      </div>
    </Dialog>
  );
};

export default UserProfile;
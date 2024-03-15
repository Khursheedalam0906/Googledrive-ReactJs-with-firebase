import React, { useState } from "react";
import "./css/Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import MobileScreenShareIcon from "@material-ui/icons/MobileScreenShare";
import DevicesIcon from "@material-ui/icons/Devices";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CloudQueueOutlinedIcon from "@material-ui/icons/CloudQueueOutlined";
import { Button, Modal } from "@material-ui/core";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "./FirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Sidebar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [upLoading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `files/${file.name}-${Date.now()}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(storageRef).then((URL) => {
          addDoc(collection(db, `myfiles`), {
            timestamp: serverTimestamp(),
            filename: file.name,
            fileURL: URL,
            size: snapshot.metadata.size,
            uid: user?.uid,
          });
          setUploading(false);
          setFile(null);
          setOpen(false);
        });
      });
    } else {
      alert("Select File");
    }
  };

  const SignOut = () => {
    signOut(auth).then((response) => {
      console.log("Signout Successfully");
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modal__pop">
          <form>
            <div className="modalHeading">
              <h3>Select file you want to upload</h3>
            </div>
            <div className="modalBody">
              {upLoading ? (
                <p className="uploading">Uploading...</p>
              ) : (
                <>
                  <input
                    type="file"
                    className="input__file"
                    onChange={handleChange}
                  />
                  <input
                    type="submit"
                    className="post__submit"
                    onClick={handleUpload}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <div className="sidebar">
        <div className="sidebar__btn">
          <button onClick={handleOpen}>
            <AddIcon style={{ color: "green" }} />
            <span>New</span>
          </button>
        </div>
        <div className="sidebar__options">
          <div className="sidebar__option sidebar_option-Active">
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </div>
          <div className="sidebar__option">
            <DevicesIcon />
            <span>Computer</span>
          </div>
          <div className="sidebar__option">
            <PeopleAltOutlinedIcon />
            <span>Share with me</span>
          </div>
          <div className="sidebar__option">
            <QueryBuilderOutlinedIcon />
            <span>Recent</span>
          </div>
          <div className="sidebar__option">
            <StarBorderOutlinedIcon />
            <span>Stared</span>
          </div>
          <div className="sidebar__option">
            <DeleteOutlineOutlinedIcon />
            <span>Trash</span>
          </div>
        </div>
        <hr />
        <div className="sidebar__options">
          <div className="sidebar__option">
            <CloudQueueOutlinedIcon />
            <span>Storage</span>
          </div>
          <div className="progress__bar">
            <progress size="tiny" value="50" max="100" />
            <span>6.45 GB of 15 GB used</span>
          </div>

          <Button
            style={{ marginLeft: 10, marginTop: 20 }}
            variant="text"
            onClick={SignOut}
          >
            Sign out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

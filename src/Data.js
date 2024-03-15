import React, { useEffect, useState } from "react";
import "./css/Data.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ListIcon from "@material-ui/icons/List";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { db } from "./FirebaseConfig";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const Data = ({ user }) => {
  const [files, setFiles] = useState([]);

  const getData = async () => {
    if (user) {
      const q = query(collection(db, "myfiles"), where("uid", "==", user?.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ data: doc.data(), id: doc.id });
        });
        setFiles(data);
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
      fileSizeInBytes /= 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  }

  console.log(files);

  return (
    <div className="data">
      <div className="data__header">
        <div className="data__headerLeft">
          <p>My Drive</p>
          <ArrowDropDownIcon />
        </div>
        <div className="data__headerRight">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </div>
      <div className="data__content">
        <div className="data__grid">
          {files.map((item) => (
            <div className="data__file" key={item.id}>
              <InsertDriveFileIcon />
              <p>{item.data.filename}</p>
            </div>
          ))}
        </div>
        <div className="data__list">
          <div className="detailsRow">
            <p>
              <b>
                Name <ArrowDownwardIcon />
              </b>
            </p>
            <p>
              <b>Owner</b>
            </p>
            <p>
              <b>Last Modified</b>
            </p>
            <p>
              <b>File Size</b>
            </p>
          </div>
          {files.map((file) => {
            return (
              <div className="detailsRow" key={file.id}>
                <p>
                  <a href={file.data.fileURL} target="_blank">
                    <InsertDriveFileIcon /> {file.data.filename}
                  </a>
                </p>
                <p>{user?.displayName}</p>
                <p>
                  {new Date(file.data.timestamp?.seconds * 1000).toUTCString()}
                </p>
                <p>{getReadableFileSizeString(file.data.size)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Data;

import React, { useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import "./Extras.css";
import { useDispatch, useSelector } from "react-redux";
import { SAVESTORY, DELETESTORY } from "../../../Redux/Actions/EventActions";
export default function Album(props) {
  const dispatch = useDispatch();
  const Eventdata = useSelector((state) => state.Eventdata);
  let bkpalbum = [];
  let filetype = [];
  const [story, setStory] = useState([...Eventdata.STORY]);

  const save = async () => {
    dispatch({
      type: SAVESTORY,
      payload: story,
    });
    props.SetStoryVisible(false);
  };

  const cancel = () => {
    setStory([]);
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    bkpalbum = [];
    filetype = [];

    for (let i = 0; i < acceptedFiles.length; i++) {
      if (acceptedFiles[i].size > 5259265) {
      } else {
        let type = acceptedFiles[i].type.split("/");
        type = type[1];
        await getBase64(acceptedFiles[i]).then(async (data) => {
          await bkpalbum.push({ data: data, type: type });
          await filetype.push(type);
        });
      }
    }
    await setStory(bkpalbum);
    return true;
  }, []);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
  });

  const deleteimage = (i) => {
    let albumcpy = [...story];
    albumcpy = albumcpy.filter((item, index) => i !== index);
    setStory([...albumcpy]);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <h2 className="tac">Upload Your Album</h2>
      </Grid>
      <Grid item xs={12}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img src={Gallery} className="w-100 uploadhere" />
        </div>
      </Grid>
      <Grid item xs={12} className="ofh view">
        <Grid container spacing={4}>
          {story.map((image, index) => (
            <Grid item xs={4} key={"img" + index}>
              <CancelIcon
                onClick={() => {
                  deleteimage(index);
                }}
                color="secondary"
                className="delete-img"
              />
              <img src={image.data} className="w-100" />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} className="submit jcc">
        <button
          onClick={() => {
            save();
          }}
          className="add-schedule w-100"
        >
          Save
        </button>
      </Grid>
    </Grid>
  );
}

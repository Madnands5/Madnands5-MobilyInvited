import React, { useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import { uploadString } from "../../../Utils/FileUpload_Download";
import "./Extras.css";
export default function Album(props) {
  let bkpalbum = [];
  let filetype = [];
  let finalarray = [];
  const [album, setAlbum] = useState(props.Album || []);
  let url = "";
  const submit = async () => {
    props.setStory(album);
  };
  const cancel = () => {
    props.setAlbum([]);
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    bkpalbum = [];
    filetype = [];
    let dataurl = "";
    for (let i = 0; i < acceptedFiles.length; i++) {
      if (acceptedFiles[i].size > 5259265) {
      } else {
        let type = acceptedFiles[i].type.split("/");
        type = type[1];
        await getBase64(acceptedFiles[i]).then(async (data) => {
          await bkpalbum.push(data);
          await filetype.push(type);
        });
      }
    }
    await setAlbum(bkpalbum);
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
  const convertfile = async (acceptedFiles) => {};
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <h2 className="tac">Upload Your Story</h2>
      </Grid>
      <Grid item xs={12}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img src={Gallery} className="w-100 uploadhere" />
        </div>
      </Grid>
      <Grid item xs={12} className="ofh view">
        <Grid container spacing={4}>
          {album.map((image, index) => (
            <Grid item xs={4} key={"img" + index}>
              <img src={image} className="w-100" />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} className="submit jcc">
        <button
          onClick={() => {
            submit();
          }}
          className="add-schedule w-100"
        >
          Save
        </button>
      </Grid>
    </Grid>
  );
}

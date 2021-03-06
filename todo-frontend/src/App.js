import React, { useState, useEffect } from "react";
import Folder from "./components/Folder";
import folderService from "./services/folders";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import { ListItem, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const App = () => {
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [open, setOpen] = useState(true);

  const handleCollapse = () => {
    setOpen(!open);
  };

  useEffect(() => {
    folderService.getAll().then((initialFolders) => {
      setFolders(initialFolders);
    });
  }, []);

  const addFolder = (event) => {
    event.preventDefault();
    const folderObject = {
      name: newFolder,
    };

    folderService.create(folderObject).then((returnedFolder) => {
      setFolders(folders.concat(returnedFolder));
      setNewFolder("");
    });
  };

  const handleFolderChange = (event) => {
    console.log(event.target.value);
    setNewFolder(event.target.value);
  };

  const deleteFolderFromState = (id) => {
    setFolders(folders.filter((t) => t.id !== id));
  };

  const foldersToShow = folders;
  //console.log(notes.map(n => n.id === editing))
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "fixed",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <h2>Folders</h2>
          </ListSubheader>
        }
      >
        {foldersToShow.map((folder) => (
          <Folder
            key={folder.id}
            task={folder}
            deleteFolderFromState={() => deleteFolderFromState(folder.id)}
          />
        ))}
        <ListItem>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <form onSubmit={addFolder}>
              <Stack spacing={2} direction="row">
                <TextField
                  id="outlined"
                  labal={newFolder}
                  variant="outlined"
                  value={newFolder}
                  onChange={handleFolderChange}
                />
                <Button variant="outlined" type="submit" color="inherit">
                  add folder
                </Button>
              </Stack>
            </form>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default App;

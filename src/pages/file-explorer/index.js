import { useState } from "react";
import Folder from "../../components/Folder";
import explorer from "../../config/folderData";
import useTraverseTree from "../../customHooks/useTraverseTree";
const FileExplorer = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode , deleteNode , editNode} = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    let updatedData = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(updatedData);
  };

  const handleDeleteNode = (folderId) => {
    let updatedData = deleteNode(explorerData, folderId)
    setExplorerData(updatedData)
  }

  const handleEditNode = (nodeId, newName) => {
    let updatedData = editNode(explorerData, nodeId, newName);
    setExplorerData(updatedData);
  };

  // console.log(explorerData)
  return <Folder handleEditNode={handleEditNode} handleDeleteNode={handleDeleteNode} handleInsertNode={handleInsertNode} explorerData={explorerData} />;
};

export default FileExplorer;

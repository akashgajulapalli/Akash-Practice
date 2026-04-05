import { useState } from "react";

const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleEditNode,
  explorerData,
}) => {
  const [showInnerFiles, setShowInnerFiles] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState("");

  const handleBtnClick = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({ visible: true, isFolder });
    setShowInnerFiles(true);
  };

  const addFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ visible: false, isFolder: null });
    }
  };

  const deleteFolder = (id) => {
    handleDeleteNode(id);
  };

  // ✅ FIXED EDIT
  const editFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleEditNode(explorerData.id, e.target.value);
      setIsEdit(false);
    }
  };

  if (explorerData?.isFolder) {
    return (
      <div className="folder-explorer">
        <div
          className="folder-span"
          onClick={() => setShowInnerFiles(!showInnerFiles)}
        >
          <span>
            <img src="https://www.iconpacks.net/icons/2/free-folder-icon-1485-thumb.png" />
            {isEdit ? (
              <input
                type="text"
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => {
                  setIsEdit(false); // ✅ exit edit mode
                  setEditValue(""); // reset
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (editValue.trim()) {
                      handleEditNode(explorerData.id, editValue);
                    }
                    setIsEdit(false);
                    setEditValue("");
                  }

                  if (e.key === "Escape") {
                    setIsEdit(false);
                    setEditValue("");
                  }
                }}
              />
            ) : (
              explorerData?.name
            )}
          </span>

          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(true);
                setEditValue("");
              }}
            >
              Edit
            </button>

            <button onClick={() => deleteFolder(explorerData.id)}>
              Delete
            </button>

            <button onClick={(e) => handleBtnClick(e, true)}>Folder +</button>

            <button onClick={(e) => handleBtnClick(e, false)}>File +</button>
          </div>
        </div>

        {showInnerFiles && (
          <div className="inner-folder">
            {showInput.visible && (
              <div className="inputContainer">
                <span>
                  <img
                    src={
                      showInput.isFolder
                        ? "https://www.iconpacks.net/icons/2/free-folder-icon-1485-thumb.png"
                        : "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
                    }
                  />
                </span>
                <input
                  type="text"
                  autoFocus
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                  onKeyDown={addFolder}
                />
              </div>
            )}

            {explorerData?.items?.map((exp) => (
              <Folder
                key={exp.id}
                handleDeleteNode={handleDeleteNode}
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                explorerData={exp}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else if (explorerData?.name) {
    return (
      <div className="file-explorer">
        <span>
          <img src="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png" />
          {isEdit ? (
            <input
              type="text"
              autoFocus
              defaultValue={explorerData.name} // ✅ prefill
              onBlur={() => setIsEdit(false)}
              onKeyDown={editFolder}
            />
          ) : (
            explorerData?.name
          )}
        </span>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEdit(true);
            }}
          >
            Edit
          </button>
          <button onClick={() => deleteFolder(explorerData.id)}>Delete</button>
        </div>
      </div>
    );
  }
};

export default Folder;

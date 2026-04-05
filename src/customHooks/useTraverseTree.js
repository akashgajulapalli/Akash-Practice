const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    let updatedItems = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: updatedItems };
  };

  const deleteNode = (tree, folderId) => {
    if(tree.id === folderId){
        return null;
    }
    let updatedItems = tree.items.map(obj => {
        return deleteNode(obj, folderId)
    }).filter((item) => item !== null);

    return { ...tree, items: updatedItems}
  }

  const editNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      return { ...tree, name: newName };
    }

    let updatedItems = tree.items.map((obj) =>
      editNode(obj, nodeId, newName)
    );

    return { ...tree, items: updatedItems };
  };
  return { insertNode,deleteNode,editNode };
};

export default useTraverseTree;

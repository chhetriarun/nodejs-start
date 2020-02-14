import React from 'react';
import Modali, { useModali } from 'modali';

const App = (props) => {
    console.log('props',props)
  const [completeExample, toggleCompleteModal,deleteUserWithId] = useModali({
    animated: true,
    title: 'Are you sure ?',
    message: 'Data will be permanentaly deleted',
    buttons: [
      <Modali.Button
        label="Cancel"
        isStyleCancel
        onClick={() => toggleCompleteModal()}
      />,
      <Modali.Button
        label="Delete"
        isStyleDestructive
        onClick={() => deleteUserWithId()}
      />,
    ],
  });

  return (
    <div className="app">
      <button onClick={toggleCompleteModal}>
        Click me to open the modal
      </button>
      <Modali.Modal {...completeExample} />
    </div>
  );
};

export default App;
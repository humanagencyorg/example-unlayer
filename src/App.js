import React, { useRef } from 'react';
import { render } from 'react-dom';
import EmailEditor from 'react-email-editor';
import logo from './logo.svg';
import env from "react-dotenv";
import './App.css';

function App() {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');
  };

  const options = {
    customJS: ['https://3a7f-2600-1700-ddd0-c000-f0cb-9f85-74cd-cac5.ngrok.io/confetti.js'],
    //customJS: [
    //"
      //console.log('I am custom JS!');
    //"
    //],
    mergeTags: {
      shipping_address: {
        name: "Formli 1",
        mergeTags: {
          street_1: {
            name: "Street 1",
            mergeTags: {
              street_1_1: {
                name: "Street 1_1",
                value: "{{shipping_address.address_1}}"
              },
              street_1_2: {
                name: "Street 1_2",
                value: "{{shipping_address.address_2}}"
              }
            }
          },
          street_2: {
            name: "Street 2",
            value: "{{shipping_address.address_2}}"
          },
          city: {
            name: "City",
            value: "{{shipping_address.city}}"
          },
          state: {
            name: "State",
            value: "{{shipping_address.state}}"
          },
          zip: {
            name: "Zip",
            value: "{{shipping_address.zip}}"
          }
        }
      }
    }
  }

  return (
    <div>
    <input></input>
    <div>
    <button onClick={exportHtml}>Export HTML</button>
    </div>

    <EmailEditor projectId={env.PROJECT_ID} ref={emailEditorRef} onLoad={onLoad} onReady={onReady} options={options} />
    </div>
  );
}

export default App;

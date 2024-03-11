import axios, { AxiosError } from "axios";
import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";

const App = () => {
  const [method, setMethod] = useState("get");
  const [url, setUrl] = useState("https://example.com");
  const [body, setBody] = useState({});
  const [response, setResponse] = useState();
  const [auth, setAuth] = useState("");
  const sendRequest = async () => {
    try {
      const resp = await axios({
        method,
        url,
        withCredentials: false,
      });
      setResponse(resp.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.request) {
          console.log(err.toJSON());
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-full font-sans w-full">
      <div className="h-fit">
        <div className="flex w-full pt-10 px-6">
          <div className="dropdown">
            <div tabIndex={0} className="m-1 btn">
              GET
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2">
              <li>
                <a>GET</a>
              </li>
              <li>
                <a>POST</a>
              </li>
              <li>
                <a>PUT</a>
              </li>
              <li>
                <a>DELETE</a>
              </li>
            </ul>
          </div>
          <input
            placeholder="http://example.com/"
            className="w-full input input-bordered"
            value={url}
            onChange={(z) => setUrl(z.target.value)}
          />
          <button className="ml-2 btn btn-outline" onClick={sendRequest}>
            Send
          </button>
        </div>
        <div className="p-2">
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Params"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-scroll"
            >
              Tab content 1 <br /> Tab
              <br /> content 1 <br />
              Tab content 1 <br />
              Tab content 1<br /> Tab content 1 Tab content 1 Tab content 1
            </div>
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Body"
              checked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 "
            >
              <ReactCodeMirror
                value={response}
                maxHeight="40vh"
                onChange={(e) => setBody(e)}
                extensions={[[json(), html({})]]}
              />
            </div>
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Auth"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <input
                className="input input-primary w-full"
                placeholder="Token"
                value={auth}
                onChange={(e) => setAuth(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 h-96">
        <ReactCodeMirror
          value={response}
          height="100%"
          readOnly
          extensions={[[json(), html({})]]}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};

export default App;

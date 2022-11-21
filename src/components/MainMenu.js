import { Papa } from "papaparse";
import { useState } from "react";
import { useCSVReader } from "react-papaparse";
import axios from "axios";

function MainMenu() {
  const [jsonFile, setJsonFile] = useState(null);
  const { CSVReader } = useCSVReader();

  function handleFile(ev) {
    const result = Papa.parse(ev.target);
    console.log(result);
  }

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-6">
          <div className="titulo text-center display-1">Cargar CSV</div>
          <hr />
          <div className="row">
            <CSVReader
              onUploadAccepted={(results) => {
                console.log("---------------------------");
                console.log(results.data);
                setJsonFile(results.data);
                console.log("---------------------------");
                axios
                  .post(`http://localhost/procesador.php`, {
                    json: JSON.stringify(results.data),
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              on
            >
              {({
                getRootProps,
                acceptedFile,
                ProgressBar,
                getRemoveFileProps,
              }) => (
                <>
                  <div className="row">
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-info"
                        {...getRootProps()}
                      >
                        Browse file
                      </button>
                    </div>

                    <div>{acceptedFile && acceptedFile.name}</div>
                  </div>
                  <ProgressBar />
                </>
              )}
            </CSVReader>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div
              className="inform border border-dark border-5"
              style={{ height: `98vh` }}
            >
              <p className="display-1">Resultado</p>
              <hr />
              <div className="row">
                <div className="result">{JSON.stringify(jsonFile)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;

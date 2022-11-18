import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [form, setForm] = useState([]);
  const [preview, setPreview] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const labels = [
    { id: 1, label: "Single line of text" },
    { id: 2, label: "Multitext" },
    { id: 3, label: "Number" },
    { id: 4, label: "Email" },
    { id: 5, label: "Dropdown" },
    { id: 6, label: "Date" },
    { id: 7, label: "Time" },
    { id: 8, label: "Checkbox" },
    { id: 9, label: "Multiple choice" },
    { id: 10, label: "Website" },
    { id: 11, label: "File upload" },
    { id: 12, label: "Section break" },
  ];

  const addFormElement = (e, type) => {
    e.preventDefault();
    var label = labels.find(function (o) {
      return o.id == type;
    }).label;

    const newElement = {
      type: type,
      label: label,
      required: false,
      open: false,
      description: "",
      options: [],
      radio: [],
    };
    setForm((prev) => {
      return [...prev, newElement];
    });
  };

  const handleInputChange = (name, value, index) => {
    const fields = [...form];
    form[index][name] = value;
    setForm(fields);
  };

  const handleOpen = (key) => {
    const fields = [...form];
    form[key].open = !form[key].open;
    setForm(fields);
  };

  const handleDelete = (key) => {
    const fields = [...form];
    fields.splice(key, 1);
    setForm(fields);
  };

  return (
    <section className="container m-auto">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-bold flex-grow">Create a new form</h1>
        <a
          onClick={(e) => setPreview(!preview)}
          className="rounded px-4 py-2 text-sm font-semibold text-blue-500 shadow-sm bg-blue-50 hover:bg-blue-100 cursor-pointer"
        >
          {!preview && <span>Preview</span>}
          {preview && <span>Edit</span>}
        </a>
      </div>
      <div className="w-full rounded border border-gray-200 flex shadow-sm">
        {!preview && (
          <div className="w-full bg-white p-3 space-y-3">
            {form.length < 1 && (
              <h1>Select some form elements on the right to get started!</h1>
            )}
            {form.map((item, key) => (
              <div className="shadow-sm border my-1 " key={key}>
                <div className="flex justify-between border-b py-3 px-3 ">
                  <span>
                    <strong>{item.label}</strong>
                  </span>
                  <div className="flex items-center space-x-2">
                    {item.type != 12 && (
                      <a href="#" onClick={(e) => handleOpen(key)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </a>
                    )}
                    <div>{form[key].open}</div>
                    <a href="#" onClick={(e) => handleDelete(key)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                      </svg>
                    </a>
                  </div>
                </div>
                {form[key].open && (
                  <div className="py-3 px-3 space-y-3 bg-gray-50">
                    <div className="space-x-2">
                      <label>Label:</label>
                      <input
                        type="text"
                        name="label"
                        value={form[key].label}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value, key)
                        }
                        className="py-1 px-3 border"
                      />
                    </div>
                    <div className="space-x-2">
                      <label>Description:</label>
                      <input
                        type="text"
                        name="description"
                        value={form[key].description}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value, key)
                        }
                        className="py-1 px-3 border"
                      />
                    </div>
                    <div className="space-x-2">
                      <label>Required:</label>
                      <input
                        type="checkbox"
                        name="required"
                        value={form[key].required}
                        onChange={(e) =>
                          handleInputChange(
                            e.target.name,
                            e.target.checked,
                            key
                          )
                        }
                        className="py-1 px-3 border"
                      />
                    </div>
                    {form[key].type == 5 && (
                      <div className="border-t py-3 w-full space-y-2">
                        <label className="pr-2">Options:</label>
                        <input
                          type="text"
                          name="options"
                          value={form[key].options}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.name,
                              e.target.value,
                              key
                            )
                          }
                          className="py-1 px-3 border w-full"
                        />
                        <p>
                          <strong>NOTE: </strong>Enter dropdown options
                          separated with commas (example: option1, option2,
                          option3)
                        </p>
                      </div>
                    )}
                    {form[key].type == 9 && (
                      <div className="border-t py-3 w-full space-y-2">
                        <label className="pr-2">Multiple choice options:</label>
                        <input
                          type="text"
                          name="radio"
                          value={form[key].radio}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.name,
                              e.target.value,
                              key
                            )
                          }
                          className="py-1 px-3 border w-full"
                        />
                        <p>
                          <strong>NOTE: </strong>Enter multiple choice options
                          separated with commas (example: option1, option2,
                          option3)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {preview && (
          <div className="w-full bg-white p-3 space-y-3">
            <h1 className="text-xl font-bold flex-grow">Form preview</h1>
            <div className="space-y-3">
              {form.map((item, key) => (
                <div className="flex flex-col" key={key}>
                  {item.type == 1 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <input
                        type="text"
                        className="py-1 px-3 border"
                        required={item.required}
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 2 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <textarea
                        rows="6"
                        className="py-1 px-3 border"
                        required={item.required}
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 3 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <input
                        type="number"
                        className="py-1 px-3 border"
                        required={item.required}
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 4 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <input
                        type="email"
                        className="py-1 px-3 border"
                        required={item.required}
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 5 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <select className="py-1 px-3 border">
                        {item.options.split(",").map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 6 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="py-1 px-3 border"
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 7 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <DatePicker
                        selected={startTime}
                        onChange={(time) => setStartTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="py-1 px-3 border"
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 8 && (
                    <div className="flex flex-row space-x-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <input
                        type="checkbox"
                        className="py-1 px-3 border"
                        required={item.required}
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 9 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      {item.radio.split(",").map((item, key) => (
                        <div key={key} className="space-x-2">
                          <input type="radio" value={item} />
                          <label>{item}</label>
                        </div>
                      ))}
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 10 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <input
                        type="url"
                        className="py-1 px-3 border"
                        placeholder="https://example.com"
                        pattern="https://.*"
                        required={item.required}
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 11 && (
                    <div className="flex flex-col space-y-1">
                      <label className={item.required ? "required" : ""}>
                        {item.label}
                      </label>
                      <input
                        type="file"
                        className="py-1 px-3 border"
                        required={item.required}
                      />
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )}
                  {item.type == 12 && (
                    <div className="flex flex-col space-y-1">
                      <hr />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col w-1/3 px-3 py-3 border-l">
          <h3 className="font-bold mb-3">Form elements</h3>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 1)}
          >
            Single line text
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 2)}
          >
            Paragraph text
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 3)}
          >
            Number
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 4)}
          >
            E-mail
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 5)}
          >
            Dropdown
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 6)}
          >
            Date
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 7)}
          >
            Time
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 8)}
          >
            Checkbox
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 9)}
          >
            Multiple choice
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 10)}
          >
            Website
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 11)}
          >
            File upload
          </a>
          <a
            href="#"
            className="shadow-sm py-3 px-3 border my-1 bg-gray-50 font-semibold"
            onClick={(e) => addFormElement(e, 12)}
          >
            Section break
          </a>
        </div>
      </div>
    </section>
  );
};

export default App;

import { useState } from "react";

interface IOption {
  title: string;
}

const initialOptions: IOption[] = [{ title: "" }];

function New() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(initialOptions);
  const handleChangeOption: ({
    target,
  }: {
    target: HTMLInputElement;
  }) => void = ({ target }) => {
    const newArray = options;
    newArray[Number(target.id)].title = target.value;
    setOptions([...newArray]);
  };

  return (
    <div>
      <h1>New Question</h1>
      <h2>Question</h2>
      <input
        placeholder="Type your question..."
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <h2>Options</h2>
      {options.map((option, index) => {
        return (
          <div key={index}>
            <input
              placeholder="Type your option..."
              value={option.title}
              id={String(index)}
              onChange={handleChangeOption}
            />
          </div>
        );
      })}
      <button onClick={() => setOptions([...options, { title: "" }])}>
        New Option
      </button>
      <button>Save</button>
    </div>
  );
}

export default New;

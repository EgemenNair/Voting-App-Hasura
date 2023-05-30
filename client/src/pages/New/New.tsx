import { useMutation } from "@apollo/client";
import { useState } from "react";
import { NEW_QUESTION_MUTATION } from "./queries";

interface IOption {
  title: string;
}

const initialOptions: IOption[] = [{ title: "" }];

function New() {
  const [addQuestion, { loading }] = useMutation(NEW_QUESTION_MUTATION);
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

  const handleSave = () => {
    const filledOptions = options.filter((option) => option.title !== "");

    if (title === "" || filledOptions.length < 2) return false;
    addQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          },
        },
      },
    });
  };

  return (
    <div>
      <h1>New Question</h1>
      <h2>Question</h2>
      <input
        placeholder="Type your question..."
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        disabled={loading}
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
              disabled={loading}
            />
          </div>
        );
      })}
      <button
        disabled={loading}
        onClick={() => setOptions([...options, { title: "" }])}
      >
        New Option
      </button>
      <button disabled={loading} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default New;

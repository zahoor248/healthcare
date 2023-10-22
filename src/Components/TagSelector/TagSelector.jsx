import { useState } from "react";
import "./TagSelector.css";

const TagSelector = () => {
  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="w-full ">
      <div className="w-full !max-w-[320px] flex-wrap flex">
        {tags.map((tag, index) => (
          <div
            className="bg-blue-300 px-3  flex-wrap flex-row mx-1 mb-2 rounded-full text-white flex justify-between w-fit"
            key={index}
          >
            <span className="text">{tag}</span>
            <span
              className="close pl-2 cursor-pointer"
              onClick={() => removeTag(index)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
      {/* <p className="text-base/none pb-2 font-normal text-neutral-600">
          Email
        </p> */}
      <div className=" w-full">
        <input
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter Tags"
          className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
        />
      </div>
    </div>
  );
};

export default TagSelector;

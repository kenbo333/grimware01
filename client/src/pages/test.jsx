import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

function TextSender() {
  const [data, setData] = useState(["", "", ""]); // 3つのテキスト入力を持つサンプルデータ
  const refs = data.map(() => useRef(null)); // 各テキスト入力に対応するuseRefの配列

  const handleSendText = async (index) => {
    const input = refs[index].current;
    if (!input) return;

    const text = input.value;

    try {
      const response = await axios.post(
        "https://your-server-endpoint.com/send-text",
        { text }
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };

  return (
    <div>
      {data.map((_, index) => (
        <div key={index}>
          <input
            type="text"
            ref={refs[index]}
            placeholder={`Enter text for input ${index + 1}...`}
          />
          <button onClick={() => handleSendText(index)}>Send Text</button>
        </div>
      ))}
    </div>
  );
}

export default TextSender;

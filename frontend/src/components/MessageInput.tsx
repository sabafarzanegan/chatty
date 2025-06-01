import { ColorsSquare, Image, Send } from "iconsax-reactjs";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState<string | null | ArrayBuffer>(
    null
  );
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handelChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    if (!file[0].type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file[0]);
  };
  const removeImage = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (!text.trim() && !imgPreview) return;
      e.preventDefault();
      const messageData = { image: imgPreview as string, text: text };
      await sendMessage(messageData);
      setText("");
      setImgPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: any) {
      toast(error.response.data.message);
    }
  };
  return (
    <div className="w-full p-4">
      {imgPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={(imgPreview as string) || ""}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button">
              <ColorsSquare className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmitMessage}
        action=""
        className="flex items-center justify-between gap-x-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input w-full"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handelChangeImg}
        />
        <button onClick={() => fileInputRef.current?.click()}>
          <Image size={22} />
        </button>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imgPreview}>
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;

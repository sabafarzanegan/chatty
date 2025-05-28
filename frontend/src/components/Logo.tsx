import { MessageText1 } from "iconsax-reactjs";

function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <button className="btn btn-lg  p-1">
        <MessageText1 size="32" className="text-primary font-bold " />
      </button>
      <h1 className="font-bold text-2xl">Chatty</h1>
    </div>
  );
}

export default Logo;

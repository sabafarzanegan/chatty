import { MessageText1 } from "iconsax-reactjs";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center gap-x-2">
        <button className="btn btn-lg  p-1">
          <MessageText1 size="32" className="text-primary font-bold " />
        </button>
        <h1 className="font-bold text-2xl">Chatty</h1>
      </div>
    </Link>
  );
}

export default Logo;

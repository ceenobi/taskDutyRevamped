import { Link } from "react-router";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="space-y-5">
          <h1 className="font-medium text-[50px] text-textBlack lh-1">
            Manage your Tasks on <br />{" "}
            <span className="text-textPurple">TaskDuty</span>
          </h1>
          <p className="text-[1.5rem] text-textGray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <Link to="/my-tasks">
            <button className="w-full sm:w-[210px] h-[50px] bg-textPurple text-white rounded-md cursor-pointer">
              Go to My Tasks
            </button>
          </Link>
        </div>
        <div>
          <img
            src="./hero.png"
            alt="hero"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="w-100">
      <img
        className="absolute"
        src="./pattern-bg-desktop.png"
        alt="background img"
      />
      <h1 className="relative py-5 font-semibold text-[2rem] tracking-wider text-white flex justify-center">
        IP Address Tracker
      </h1>
    </div>
  );
}

import RetroGrid from "./onlybg";

const DashboardBackground = () => {

    return (
      <div className="absolute inset-0 -z-10 overflow-hidden bg-white dark:bg-black">
  
        {/* Purple glow */}
        <div
          className="
            absolute
            inset-0
            bg-purple-950/5
            dark:bg-purple-950/10
          "
        />
  
        {/* Radial glow at top */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(120,119,198,0.20),transparent)]
            dark:bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(120,119,198,0.30),transparent)]
          "
        />
  
        {/* Perspective grid */}
        <RetroGrid />
  
      </div>
    );
};


export default DashboardBackground;
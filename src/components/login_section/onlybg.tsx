const RetroGrid = ({
    angle = 65,
    cellSize = 60,
    opacity = 0.4,
  }: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
  }) => {
    const gridStyles = {
      "--grid-angle": `${angle}deg`,
      "--cell-size": `${cellSize}px`,
      "--opacity": opacity,
    } as React.CSSProperties;
  
    return (
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
          [perspective:200px]
          opacity-[var(--opacity)]
        "
        style={gridStyles}
      >
        <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
          <div
            className="
              absolute
              left-1/2
              top-0
              h-[300vh]
              w-[600vw]
              -translate-x-1/2
  
              [background-image:linear-gradient(to_right,rgba(120,120,120,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(120,120,120,0.25)_1px,transparent_0)]
  
              [background-repeat:repeat]
  
              [background-size:var(--cell-size)_var(--cell-size)]
  
              [transform-origin:100%_0_0]
            "
          />
        </div>
  
        {/* Fade the grid toward the top */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-white
            via-white/40
            to-transparent
            dark:from-black
            dark:via-black/40
          "
        />
      </div>
    );
  };


  export default RetroGrid;
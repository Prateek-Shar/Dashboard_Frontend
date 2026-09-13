// HeroSection.tsx

import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;

  subtitle?: {
    regular: string;
    gradient: string;
  };

  description?: string;

  ctaText?: string;
  ctaHref?: string;

  bottomImage?: {
    light: string;
    dark: string;
  };

  gridOptions?: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
    lightLineColor?: string;
    darkLineColor?: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                                Retro Grid                                  */
/* -------------------------------------------------------------------------- */

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.4,
  lightLineColor = "rgba(120, 120, 120, 0.25)",
  darkLineColor = "rgba(255, 255, 255, 0.15)",
}: {
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightLineColor?: string;
  darkLineColor?: string;
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
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
      {/* Grid plane */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className="
            animate-grid
            absolute
            left-1/2
            top-0
            h-[300vh]
            w-[600vw]
            -translate-x-1/2
            [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)]
            [background-repeat:repeat]
            [background-size:var(--cell-size)_var(--cell-size)]
            [transform-origin:100%_0_0]
            dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]
          "
        />
      </div>

      {/* Fade only the grid, not the hero content */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-white
          via-white/30
          to-transparent
          dark:from-black
          dark:via-black/30
        "
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Hero Section                                  */
/* -------------------------------------------------------------------------- */

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,

      title = "Build products for everyone",

      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },

      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",

      ctaText = "Browse courses",

      ctaHref = "/login",

      bottomImage = {
        light: "https://farmui.vercel.app/dashboard-light.png",
        dark: "https://cdn.21st.dev/assets/mirror/46/46904d9ee222c3e5bedbf3f2f56d7bcc97f3a9b2ecd8331ad43b3518e72ad799.png",
      },

      gridOptions,

      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative min-h-screen w-full overflow-hidden",
          "bg-white dark:bg-black",
          className
        )}
        {...props}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Background                                                        */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            bg-purple-950/5
            dark:bg-purple-950/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(120,119,198,0.18),transparent)]
            dark:bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(120,119,198,0.25),transparent)]
          "
        />

        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ---------------------------------------------------------------- */}

        <section className="relative z-[1] w-full">
          {/* Retro grid */}
          <RetroGrid {...gridOptions} />

          {/* Actual content */}
          <div
            className="
              relative
              z-10
              mx-auto
              max-w-screen-xl
              px-4
              py-24
              md:px-8
              md:py-28
            "
          >
            {/* ------------------------------------------------------------ */}
            {/* Hero Text                                                      */}
            {/* ------------------------------------------------------------ */}

            <div className="mx-auto max-w-3xl space-y-6 text-center">
              {/* Small label */}
              <h1
                className="
                  group
                  mx-auto
                  flex
                  w-fit
                  items-center
                  rounded-3xl
                  border
                  border-black/5
                  bg-gradient-to-tr
                  from-zinc-300/30
                  via-gray-400/20
                  to-transparent
                  px-5
                  py-2
                  text-sm
                  text-gray-600
                  dark:border-white/10
                  dark:from-zinc-300/10
                  dark:via-gray-400/10
                  dark:text-gray-300
                "
              >
                {title}

                <ChevronRight
                  className="
                    ml-2
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </h1>

              {/* Main heading */}
              <h2
                className="
                  mx-auto
                  bg-gradient-to-b
                  from-black
                  to-black/60
                  bg-clip-text
                  text-4xl
                  font-medium
                  tracking-tight
                  text-transparent
                  md:text-6xl
                  dark:from-white
                  dark:to-white/60
                "
              >
                {subtitle.regular}

                <span
                  className="
                    bg-gradient-to-r
                    from-purple-600
                    to-pink-500
                    bg-clip-text
                    text-transparent
                    dark:from-purple-300
                    dark:to-orange-200
                  "
                >
                  {subtitle.gradient}
                </span>
              </h2>

              {/* Description */}
              <p
                className="
                  mx-auto
                  max-w-2xl
                  text-base
                  leading-7
                  text-gray-600
                  dark:text-gray-300
                "
              >
                {description}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-center">
                <span
                  className="
                    relative
                    inline-block
                    overflow-hidden
                    rounded-full
                    p-[1.5px]
                  "
                >
                  {/* Animated border */}
                  <span
                    className="
                      absolute
                      inset-[-1000%]
                      animate-[spin_2s_linear_infinite]
                      bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]
                    "
                  />

                  {/* Button background */}
                  <div
                    className="
                      relative
                      inline-flex
                      rounded-full
                      bg-white
                      text-xs
                      font-medium
                      text-gray-900
                      backdrop-blur-3xl
                      dark:bg-gray-950
                      dark:text-white
                    "
                  >
                    <Link
                      to={ctaHref}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/10
                        bg-gradient-to-tr
                        from-zinc-300/20
                        via-purple-400/30
                        to-transparent
                        px-10
                        py-4
                        text-center
                        transition-all
                        hover:from-zinc-300/30
                        hover:via-purple-400/40
                        dark:border-white/10
                        dark:from-zinc-300/5
                        dark:via-purple-400/20
                        dark:hover:from-zinc-300/10
                        dark:hover:via-purple-400/30
                      "
                    >
                      {ctaText}
                    </Link>
                  </div>
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Dashboard Image                                               */}
            {/* ------------------------------------------------------------ */}

            {bottomImage && (
              <div
                className="
                  relative
                  z-10
                  mx-auto
                  mt-20
                  w-full
                  max-w-6xl
                  px-2
                  md:mt-28
                "
              >
                {/* Light mode image */}
                <img
                  src={bottomImage.light}
                  alt="Dashboard preview"
                  className="
                    block
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    shadow-2xl
                    dark:hidden
                  "
                />

                {/* Dark mode image */}
                <img
                  src={bottomImage.dark}
                  alt="Dashboard preview"
                  className="
                    hidden
                    w-full
                    rounded-xl
                    border
                    border-gray-800
                    shadow-2xl
                    dark:block
                  "
                />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };